import os
from flask import Flask
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

supabase: Client = create_client(
    os.environ["SUPABASE_URL"],
    os.environ["SUPABASE_KEY"]
)

@app.route('/')
def index():
    pass

if __name__ == '__main__':
    app.run(debug=True)