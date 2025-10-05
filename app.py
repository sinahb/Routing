# app.py
from flask import Flask, render_template, send_from_directory

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    # مسیر گواهی‌های Let's Encrypt
    cert = '/etc/letsencrypt/live/map.nitroband.ir/fullchain.pem'
    key = '/etc/letsencrypt/live/map.nitroband.ir/privkey.pem'
    
    app.run(
        host='0.0.0.0',
        port=443,  # پورت HTTPS
        ssl_context=(cert, key),
        debug=False
    )
