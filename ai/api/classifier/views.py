from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import os
import json
import torch
from PIL import Image
from torchvision.models import efficientnet_v2_s
from torchvision import transforms as transforms

# constants
DEVICE = 'cpu'
IMAGE_SIZE = 256

script_directory = os.path.dirname(__file__)
model_path = os.path.join(
    script_directory, './models/Food_Classifier_EfficientNet_model_and_weights.pth')
id_map_file_path = os.path.join(
    script_directory, './models/id_map.json')
food_map_file_path = os.path.join(
    script_directory, './models/food_map.json')


model = torch.load(model_path,
                   map_location=torch.device('cpu'))
model = model.to(DEVICE)
model.eval()

transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
])

with open(id_map_file_path, 'r') as file:
    id_map = json.load(file)
with open(food_map_file_path, 'r') as file:
    food_map = json.load(file)


@csrf_exempt
def infer_classifier(request):
    image = request.FILES['image']
    image = Image.open(image).convert('RGB')
    image = transform(image).unsqueeze(0)

    with torch.no_grad():
        image = image.to(DEVICE).float()
        prediction = model(image)
        prediction_id = torch.argmax(prediction).item()
        prediction = id_map[str(prediction_id)]
        return JsonResponse({'prediction': prediction})
