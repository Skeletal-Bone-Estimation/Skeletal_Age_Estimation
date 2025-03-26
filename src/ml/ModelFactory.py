import os
from src.ml.LinearRegression import LinearRegression
from src.ml.Classification import Classification

class ModelFactory:
    """
    Factory class to create and manage different types of ML models.
    """

    @staticmethod
    def create_model(model_type, model_name):
        """
        Creates a model object with the required commands.

        Args:
            model_type (str): The type of model to create (e.g., 'linear_regression', 'classification').
            model_path (str): The path to load an existing model, if applicable.

        Returns:
            A model object with methods for predict, save, and load.
        """
        path = f'models/{model_name}.joblib'
        if os.path.exists(path):
            if model_type == 'linreg':
                return LinearRegression(path)
            elif model_type == 'class':
                return Classification(path)
            else:
                raise ValueError(f"Unknown model type: {model_type}")
        else:
            raise FileNotFoundError(f"Model file not found: {path}")