from main import app
from flask import render_template

@app.route("/")
def index():
	return render_template("index.html")

@app.route('/corno')
def corno():
	return render_template("corno.html")