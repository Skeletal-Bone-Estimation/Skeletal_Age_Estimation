from flask import Flask, request, json, jsonify
from flask_cors import CORS
from ModelFactory import ModelFactory
import socket

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

with open('./flask_port.json', 'w') as f:
        json.dump({'port': port}, f)

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    """
    API endpoint for making predictions.
    """

    try:
        print("Step 1: Received request\n")
        data = request.json
        print(f"Step 2: Data received = {data}\n")
        
        input_data = data.get('input_data')
        if input_data is None:
            print("Step 3.a: No input data provided")
            return jsonify({"error": "No input data provided"}), 400
        else:
            print(f"Step 3.b: Input data = {input_data}\n")

        print("Step 4: Creating model\n")
        model = ModelFactory.create_model(data.get('model_type'), data.get('model_name'))
        
        print("Step 5: Running prediction\n")
        prediction = model.predict(input_data)
        print(f"Step 6: Prediction = {prediction}\n")
        
        response = app.response_class(
            response=json.dumps(prediction),
            status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Step X: Error occurred - {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # Run the Flask server
    app.run(debug=False, host=hostname, port=port)
