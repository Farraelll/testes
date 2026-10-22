from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

from rotas import *

if __name__ == '__main__':
	app.run(debug=True)