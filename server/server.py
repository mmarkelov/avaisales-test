from flask import Flask, render_template, send_file
from flask_cors import CORS

app = Flask(__name__, static_folder="../client/build/static", template_folder="../client/build")
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api")
def api():
    return send_file('./data.json')


if __name__ == "__main__":
    app.run()
