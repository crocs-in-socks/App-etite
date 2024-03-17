import torch
from torchvision import transforms
from torch.utils.data import Dataset

from PIL import Image


class Food101_Dataset(Dataset):
    def __init__(self, image_paths, label_mapping, transform=None):
        self.image_paths = image_paths
        self.label_mapping = label_mapping
        self.transform = transform

    def __len__(self, ):
        return len(self.image_paths)

    def __getitem__(self, index):
        image = Image.open(self.image_paths[index]).convert('RGB')
        label = self.label_mapping[self.image_paths[index].split('/')[-2]]

        if self.transform:
            image = self.transform(image)
        return image, label


def get_food101_datatset(transform):
    FOOD101_DATA_ROOT_FOLDER = '/kaggle/input/food41/images/'
    FOOD101_META_ROOT_FOLDER = '/kaggle/input/food41/meta/meta/'

    with open(FOOD101_META_ROOT_FOLDER+'train.txt', 'r') as train_file:
        train_paths = train_file.readlines()

    food_to_id = {}
    id_to_food = {}
    current_id = 0

    for path in train_paths:
        name = path.split('/')[0]
        if name not in food_to_id:
            food_to_id[name] = current_id
            id_to_food[current_id] = name
            current_id += 1

    train_paths = [FOOD101_DATA_ROOT_FOLDER +
                   path.strip()+'.jpg' for path in train_paths]

    with open(FOOD101_META_ROOT_FOLDER+'test.txt', 'r') as test_file:
        test_paths = test_file.readlines()
    test_paths = [FOOD101_DATA_ROOT_FOLDER +
                  path.strip()+'.jpg' for path in test_paths]

    trainset = Food101_Dataset(train_paths, food_to_id, transform)
    testset = Food101_Dataset(test_paths, food_to_id, transform)

    return trainset, testset, food_to_id, id_to_food
