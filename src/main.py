from ai.models.echo_net import DimensionalEchoNet
from ai.utils.data_processor import EchoDataProcessor
from ai.training.trainer import EchoTrainer
from ai.inference.predictor import EchoPredictor
from ai.config import DEFAULT_CONFIG

# Initialize components
processor = EchoDataProcessor(DEFAULT_CONFIG)
trainer = EchoTrainer(DEFAULT_CONFIG)
predictor = EchoPredictor(trainer.model, processor)

# Train model
trainer.train_epoch(training_data, targets)

# Make predictions
predictions = predictor.predict(echo_data)