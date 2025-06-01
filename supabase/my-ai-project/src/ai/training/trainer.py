class Trainer:
    def __init__(self, model, data_loader, optimizer, loss_fn):
        self.model = model
        self.data_loader = data_loader
        self.optimizer = optimizer
        self.loss_fn = loss_fn

    def fit(self, epochs):
        for epoch in range(epochs):
            total_loss = 0
            for inputs, targets in self.data_loader:
                self.optimizer.zero_grad()
                outputs = self.model(inputs)
                loss = self.loss_fn(outputs, targets)
                loss.backward()
                self.optimizer.step()
                total_loss += loss.item()
            print(f'Epoch {epoch + 1}/{epochs}, Loss: {total_loss / len(self.data_loader)}')

    def evaluate(self, validation_loader):
        total_loss = 0
        with torch.no_grad():
            for inputs, targets in validation_loader:
                outputs = self.model(inputs)
                loss = self.loss_fn(outputs, targets)
                total_loss += loss.item()
        print(f'Validation Loss: {total_loss / len(validation_loader)}')