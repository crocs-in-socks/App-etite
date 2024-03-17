import torch

def get_multiclass_classification_accuracy(predictions, labels):
    predicted_classes = torch.argmax(predictions, dim=1)
    correct_predictions = (predicted_classes == labels).sum().item()
    
    total_samples = labels.shape[0]
    accuracy = correct_predictions / total_samples
    
    return accuracy