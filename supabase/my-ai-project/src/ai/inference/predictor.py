class Predictor:
    def __init__(self, model):
        self.model = model

    def predict(self, input_data):
        """
        Make a prediction using the trained model.

        Parameters:
        input_data: The data to make predictions on.

        Returns:
        The model's predictions.
        """
        return self.model(input_data)

    def batch_predict(self, batch_data):
        """
        Make predictions on a batch of input data.

        Parameters:
        batch_data: A list of input data to make predictions on.

        Returns:
        A list of predictions for each input in the batch.
        """
        predictions = []
        for data in batch_data:
            predictions.append(self.predict(data))
        return predictions