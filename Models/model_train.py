import torch
import torch.nn as nn
import torch.optim as optim
import torch.nn.functional as F
from torchvision import transforms
from torch.utils.data import Dataset, DataLoader
from torchvision.models import efficientnet_v2_s

import glob
import json
from tqdm.notebook import tqdm
from PIL import Image
import matplotlib.pyplot as plt

import custom_losses_and_accuracies as losses_and_accuracies
import custom_dataset_classes_and_dataloaders as datasets_and_loaders

# constants
IMAGE_SIZE = 256
BATCH_SIZE = 32
NUM_EPOCHS = 100
PATIENCE = 20
NUM_WORKERS = 4
OFFSET = 0
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
])

trainset, testset, food_to_id, id_to_food = datasets_and_loaders.get_food101_datatset(
    transform)

with open('/kaggle/working/'+'food_to_id_mapping.json', 'w') as file:
    json.dump(food_to_id, file)
with open('/kaggle/working/'+'id_to_food_mapping.json', 'w') as file:
    json.dump(id_to_food, file)


def filter_collate(batch):
    filtered_batch = [item for item in batch if item[0].shape == (
        3, IMAGE_SIZE, IMAGE_SIZE)]
    if not filtered_batch:
        return None
    return torch.utils.data.dataloader.default_collate(filtered_batch)


trainloader = DataLoader(trainset, batch_size=BATCH_SIZE, shuffle=True, num_workers=NUM_WORKERS,
                         generator=torch.Generator(device='cpu'), collate_fn=filter_collate)
testloader = DataLoader(testset, batch_size=BATCH_SIZE, shuffle=False, num_workers=NUM_WORKERS,
                        generator=torch.Generator(device='cpu'), collate_fn=filter_collate)

# model initialization

model = efficientnet_v2_s(weights=True)
num_encoder_features = model.classifier[1].in_features
num_classes = len(food_to_id)

model.classifier = nn.Sequential(
    nn.Dropout(p=0.2, inplace=True),
    nn.Linear(in_features=num_encoder_features,
              out_features=num_classes, bias=True),
    nn.Softmax(dim=1)
)

model = model.to(DEVICE)

optimizer = optim.Adam(model.parameters(), lr=0.000001, eps=0.0001)
scheduler = optim.lr_scheduler.ReduceLROnPlateau(
    optimizer, mode='max', factor=0.5, patience=5, verbose=True)

criterion = nn.CrossEntropyLoss().to(DEVICE)

# Training loop

best_accuracy = None
train_loss = []
train_accuracy = []

model.train()
for epoch in range(OFFSET+1, NUM_EPOCHS+1):

    print()
    print(f'Epoch #{epoch}')

    epoch_loss = 0
    epoch_accuracy = 0

    for data, label in tqdm(trainloader):
        image = data.to(DEVICE).float()
        label = label.to(DEVICE)
        onehot_label = F.one_hot(label, num_classes).float()

        prediction = model(image)

        optimizer.zero_grad()
        loss = criterion(prediction, onehot_label)
        epoch_loss += loss.item()
        epoch_accuracy += losses_and_accuracies.get_multiclass_classification_accuracy(
            prediction, label)
        loss.backward()
        optimizer.step()

    train_loss.append(epoch_loss / len(trainloader))
    train_accuracy.append(epoch_accuracy / len(trainloader))

    print(f'Training loss at epoch#{epoch}: {train_loss[-1]}')
    print(f'Training accuracy at epoch#{epoch}: {train_accuracy[-1]}')

    if best_accuracy is None:
        best_accuracy = train_accuracy[-1]
    elif train_accuracy[-1] > best_accuracy:
        best_accuracy = train_accuracy[-1]
        print()
        print('Model accuracy checkpointed.')
        print()
        torch.save(
            model, f'Food_Classifier_EfficientNet_epoch{epoch}_best_accuracy.pth')
    elif epoch % 5 == 0:
        torch.save(model, f'Food_Classifier_EfficientNet_epoch{epoch}.pth')

    scheduler.step(train_accuracy[-1])

# Testing loop

test_loss = []
test_accuracy = []

model.eval()

epoch_loss = 0
epoch_accuracy = 0

for data, label in tqdm(testloader):
    with torch.no_grad():
        image = data.to(DEVICE).float()
        label = label.to(DEVICE)
        onehot_label = F.one_hot(label, num_classes).float().to(DEVICE)

        prediction = model(image)

        loss = criterion(prediction, onehot_label)
        epoch_loss += loss.item()
        epoch_accuracy += losses_and_accuracies.get_multiclass_classification_accuracy(
            prediction, label)

test_loss.append(epoch_loss / len(testloader))
test_accuracy.append(epoch_accuracy / len(testloader))

print(f'Test loss: {test_loss[-1]}')
print(f'Test accuracy: {test_accuracy[-1]}')

# Running inference
model.eval()
sample, label = testset[699]
with torch.no_grad():
    sample = sample.to(DEVICE).float()
    sample = sample.unsqueeze(0)
    prediction = model(sample)

prediction_id = torch.argmax(prediction)
prediction_name = id_to_food[prediction_id.item()]
label_name = id_to_food[label]

print(f'Predicted class: {prediction_name}, True class: {label_name}')
sample = sample.permute(0, 2, 3, 1)
plt.imshow(sample[0])
