from flask import Flask, request, jsonify
from flask_cors import CORS
from ml.model_factory import ModelFactory

hostname = 'localhost'
port = 5000

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint for making predictions.
    Expects JSON input like: {"input_data": [1.0, 2.5, 3.3]}
    """

    data = request.json
    input_data = data.get('input_data')
    model = ModelFactory.create_model(data.get('model_type'), data.get('model_name'))

    if input_data is None:
        return jsonify({"error": "No input data provided"}), 400

    try:
        prediction = model.predict(input_data)
        result = {"prediction": prediction.tolist()}
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Run the Flask server
    app.run(debug=False, host=hostname, port=port)
