from flask import Flask, request, jsonify
from flask_cors import CORS

import glob

app = Flask(__name__)
cors = CORS(app)


path = "../html_files"


@app.route("/save", methods=['POST'])
def save():
    input('here')
    print(request.data)
    input('out')
    filename = request.json['filename']
    file = request.json['file']
    input(file)

    f = open('{}/{}.html'.format(path, filename), 'w+')
    f.write(file)
    f.close()

    print('complete')

    return jsonify({'complete': 'OK'})


@app.route("/load", methods=['GET'])
def load_files():
    html_files = {}

    for filename in glob.glob('{}/*.html'.format(path)):
        html_files[filename.split(
            '/')[-1]] = open('{}'.format(filename), 'r+').read()

    return jsonify(html_files)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
