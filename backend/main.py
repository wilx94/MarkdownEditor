from flask import Flask, request, jsonify
from flask_cors import CORS

import glob
import os

app = Flask(__name__)
cors = CORS(app)


path = "../html_files"


@app.route("/save", methods=['POST'])
def save():
    try:
        filename = request.json['filename']
        file = request.json['file']

        f = open('{}/{}.html'.format(path, filename), 'w+')
        f.write(file)
        f.close()

        return jsonify({'message': 'ok'})
    except Exception as ex:
        return jsonify({'message': 'error'})


@app.route("/load", methods=['GET'])
def load_files():
    try:
        html_files = {}

        for filename in glob.glob('{}/*.html'.format(path)):
            html_files[filename.split(
                '/')[-1]] = open('{}'.format(filename), 'r+').read()

        return jsonify(html_files)
    except Exception as ex:
        return jsonify({'message': 'error'})


@app.route("/delete", methods=['POST'])
def delete_file():
    try:
        filename = request.json['filename']
        os.remove('{}/{}'.format(path, filename))

        return jsonify({'message': 'ok'})
    except Exception as ex:
        return jsonify({'message': 'error'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
