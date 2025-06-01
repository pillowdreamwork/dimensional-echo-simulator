import torch
import torch.nn as nn
import torch.nn.functional as F

class DimensionalEchoNet(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.input_dim = config.get('input_dim', 64)
        self.hidden_dims = config.get('hidden_dims', [128, 64, 32])
        self.output_dim = config.get('output_dim', 16)
        self.dropout_rate = config.get('dropout_rate', 0.2)

        # Build dynamic layer architecture
        self.layers = nn.ModuleList()
        dims = [self.input_dim] + self.hidden_dims
        
        for i in range(len(dims)-1):
            self.layers.append(nn.Linear(dims[i], dims[i+1]))
            self.layers.append(nn.ReLU())
            self.layers.append(nn.Dropout(self.dropout_rate))
            self.layers.append(nn.BatchNorm1d(dims[i+1]))
        
        # Output layer
        self.output_layer = nn.Linear(self.hidden_dims[-1], self.output_dim)
        
        # Initialize weights
        self.apply(self._init_weights)
    
    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.xavier_uniform_(module.weight)
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)
    
    def forward(self, x):
        for layer in self.layers:
            x = layer(x)
        return self.output_layer(x)

class EnhancedEchoNet(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.input_dim = config.get('input_dim', 64)
        self.hidden_dims = config.get('hidden_dims', [256, 128, 64, 32])
        self.output_dim = config.get('output_dim', 16)
        self.dropout_rate = config.get('dropout_rate', 0.3)
        self.use_residual = config.get('use_residual', True)

        # Build dynamic layer architecture with residual connections
        self.layers = nn.ModuleList()
        dims = [self.input_dim] + self.hidden_dims

        for i in range(len(dims)-1):
            self.layers.append(nn.Linear(dims[i], dims[i+1]))
            self.layers.append(nn.GELU())
            self.layers.append(nn.Dropout(self.dropout_rate))
            self.layers.append(nn.BatchNorm1d(dims[i+1]))

        self.output_layer = nn.Linear(self.hidden_dims[-1], self.output_dim)
        self.apply(self._init_weights)

    def _init_weights(self, module):
        if isinstance(module, nn.Linear):
            torch.nn.init.kaiming_uniform_(module.weight, nonlinearity='relu')
            if module.bias is not None:
                torch.nn.init.zeros_(module.bias)

    def forward(self, x):
        residual = x
        for idx, layer in enumerate(self.layers):
            x = layer(x)
            # Add residual connection after each block (every 4 layers)
            if self.use_residual and idx % 4 == 3 and residual.shape == x.shape:
                x = x + residual
                residual = x
        return self.output_layer(x)