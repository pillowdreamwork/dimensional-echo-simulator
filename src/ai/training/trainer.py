import torch
from typing import Dict, Any
from ..models.echo_net import DimensionalEchoNet
from ..utils.data_processor import EchoDataProcessor

class EchoTrainer:
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        self.model = DimensionalEchoNet(config).to(self.device)
        self.processor = EchoDataProcessor(config)
        self.optimizer = torch.optim.Adam(
            self.model.parameters(), 
            lr=config.get('learning_rate', 0.001)
        )
        self.criterion = torch.nn.MSELoss()
        self.scheduler = torch.optim.lr_scheduler.ReduceLROnPlateau(
            self.optimizer, 
            mode='min', 
            factor=0.5, 
            patience=5
        )
    
    def train_epoch(self, data, targets):
        self.model.train()
        total_loss = 0
        batches = self.processor.create_batches(data)
        target_batches = self.processor.create_batches(targets)
        
        for batch, target_batch in zip(batches, target_batches):
            self.optimizer.zero_grad()
            outputs = self.model(batch)
            loss = self.criterion(outputs, target_batch)
            loss.backward()
            self.optimizer.step()
            total_loss += loss.item()
            
        return total_loss / len(batches)
    
    def save_checkpoint(self, epoch: int, loss: float):
        torch.save({
            'epoch': epoch,
            'model_state_dict': self.model.state_dict(),
            'optimizer_state_dict': self.optimizer.state_dict(),
            'loss': loss,
        }, f'checkpoints/echo_model_epoch_{epoch}.pt')