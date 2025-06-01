import torch
from typing import Dict, Any, List
import numpy as np

class EchoPredictor:
    def __init__(self, model, processor):
        self.model = model
        self.processor = processor
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    def predict(self, echo_data: np.ndarray) -> np.ndarray:
        """Make predictions on echo data"""
        self.model.eval()
        with torch.no_grad():
            processed_data = self.processor.preprocess(echo_data)
            predictions = self.model(processed_data)
            return self.processor.postprocess(predictions)
    
    @torch.no_grad()
    def predict_batch(self, echo_data_batch: List[np.ndarray]) -> List[np.ndarray]:
        """Make predictions on a batch of echo data"""
        self.model.eval()
        processed_batch = [self.processor.preprocess(data) for data in echo_data_batch]
        predictions = [self.model(data) for data in processed_batch]
        return [self.processor.postprocess(pred) for pred in predictions]