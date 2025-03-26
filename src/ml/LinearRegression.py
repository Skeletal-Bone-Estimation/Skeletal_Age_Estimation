import os
import joblib
from src.ml.BaseModel import BaseModel

class LinearRegression(BaseModel):
    """
    Linear Regression model class that implements the required commands.
    """

    def __init__(self, model_path=None):
        if model_path and os.path.exists(model_path):
            self.model = joblib.load(model_path)
        else:
            raise FileNotFoundError(f"Model file not found: {model_path}")


    def preprocess(self, input_data):
        return input_data


    def predict(self, input_data):
        preprocessed_data = self.preprocess(input_data)
        return self.model.predict([preprocessed_data])