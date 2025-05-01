from flask import Flask, request, json, jsonify
from flask_cors import CORS
from ModelFactory import ModelFactory
import socket
import traceback
import os
import sys

def find_free_port():
    """
    Find a free port on the localhost.
    """
    s = socket.socket()
    s.bind(('', 0))
    port = s.getsockname()[1]
    s.close()
    return port

hostname = 'localhost'
port = find_free_port()

with open(os.path.join(os.path.dirname(sys.executable), 'static', 'flask_port.json'), 'w') as f:
        json.dump({'port': port}, f)

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint for making predictions.
    """

    try:
        data = request.json
        
        input_data = data.get('input_data')
        if input_data is None:
            return jsonify({"error": "No input data provided"}), 400
        else:
            print(f"Input data = {input_data}")

        model = ModelFactory.create_model(data.get('model_type'), data.get('model_name'))
        prediction = model.predict(input_data)
        print(f"Prediction = {prediction}\n")
        
        response = app.response_class(
            response=json.dumps(prediction),
            status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        traceback.print_exc()
        print(f"Error occurred - {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Run the Flask server
    app.run(debug=False, host=hostname, port=port)
