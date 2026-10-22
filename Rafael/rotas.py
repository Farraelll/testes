from main import app
from flask import render_template

@app.route('/corno')
def corno():
	return render_template("corno.html")