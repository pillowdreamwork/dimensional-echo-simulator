import torch
import numpy as np
from typing import Tuple, Union, List

class EchoDataProcessor:
    def __init__(self, config):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.input_dim = config.get('input_dim', 64)
        self.batch_size = config.get('batch_size', 32)
        self.scaler = None
    
    def preprocess(self, data: Union[np.ndarray, List]) -> torch.Tensor:
        """Preprocess echo data for model input"""
        if isinstance(data, list):
            data = np.array(data)
        
        # Ensure correct dimensionality
        if data.ndim == 1:
            data = data.reshape(1, -1)
        
        # Normalize data
        if self.scaler is None:
            from sklearn.preprocessing import StandardScaler
            self.scaler = StandardScaler()
            data = self.scaler.fit_transform(data)
        else:
            data = self.scaler.transform(data)
        
        return torch.FloatTensor(data).to(self.device)
    
    def create_batches(self, data: torch.Tensor) -> List[torch.Tensor]:
        """Create batches for training"""
        return torch.split(data, self.batch_size)
    
    def postprocess(self, predictions: torch.Tensor) -> np.ndarray:
        """Convert model predictions to numpy array"""
        return predictions.cpu().detach().numpy()