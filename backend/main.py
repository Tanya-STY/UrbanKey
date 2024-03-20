from flask import Flask
from flask_restx import Api
from models import Recipe, User  # Import your models (documents)
from pymongo import MongoClient  # Import MongoClient to connect to MongoDB
from flask_jwt_extended import JWTManager
from recipes import recipe_ns
from auth import auth_ns
from flask_cors import CORS

def create_app(config):
    app = Flask(__name__, static_url_path="/", static_folder="../urbankey/build")
    app.config.from_object(config)

    CORS(app)

    # uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"


    client = MongoClient(app.config['mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority'])  # Use the MONGO_URI from the config

    db = client.get_database('UrbanKey')

    users = db.get_collection('Users')

    jwt = JWTManager(app)