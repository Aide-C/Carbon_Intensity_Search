from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests

app = Flask(__name__)
CORS(app)
load_dotenv()

app.config['API_KEY'] = os.getenv('API_KEY')

@app.route('/get_carbon_intensity', methods=['POST'])
def get_carbon_intensity():
    data = request.json
    latitude = data['latitude']
    longitude = data['longitude']
    api_token = app.config['API_KEY']

    url = f'https://api.electricitymap.org/v3/carbon-intensity/latest?lat={latitude}&lon={longitude}'

    headers = {'auth-token': api_token}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return 'Failed to fetch data. Status code: {}'.format(response.status_code), 500
    

@app.route('/get_power_breakdown', methods=['POST'])
def get_power_breakdown():
    data = request.json
    latitude = data['latitude']
    longitude = data['longitude']
    api_token = app.config['API_KEY']

    url = f'https://api.electricitymap.org/v3/power-breakdown/latest?lat={latitude}&lon={longitude}'

    headers = {'auth-token': api_token}

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return jsonify(response.json()), 200
    else:
        return 'Failed to fetch data. Status code: {}'.format(response.status_code), 500

if __name__ == '__main__':
    app.run(debug=True)
