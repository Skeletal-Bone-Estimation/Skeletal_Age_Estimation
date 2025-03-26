class BaseModel:
    """
    Base class that defines the required commands for a model.
    """

    def preprocess(self, input_data):
        raise NotImplementedError("Subclasses must implement this method.")


    def predict(self, input_data):
        raise NotImplementedError("Subclasses must implement this method.")