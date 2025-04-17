import os
import joblib
import json
import pandas as pd
from BaseModel import BaseModel

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
        df_temp = pd.DataFrame([input_data])
        df = pd.DataFrame()
        
        df['sex'] = df_temp['sex']
        df['ps_phase'] = float((df_temp['psL'] + df_temp['psR']) / 2)
        df['se_phase'] = float((df_temp['frL'] + df_temp['frR']) / 2)
        df['as_phase'] = float((df_temp['aaL'] + df_temp['aaR']) / 2)
        
        return df

    def predict(self, input_data):
        preprocessed_data = self.preprocess(input_data)
        return self.model.predict(preprocessed_data).tolist()