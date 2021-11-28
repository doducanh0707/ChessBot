from flask import (Flask, render_template, request)

app = Flask(__name__, template_folder='view', static_url_path='/static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/getmove', methods = ["POST"])
def getmove():
    data = request.get_json()
    print(data['from'], data['to'], data['color'])
    return {"from": , "to":}