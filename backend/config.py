from decouple import config
import os
from datetime import timedelta

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

class Config:
    SECRET_KEY=os.getenv("SECRET_KEY", "secret")

class DevConfig(Config):
    DEBUG = True
    # MongoDB configurations
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/dev_db")

class ProdConfig(Config):
    DEBUG = False
    # MongoDB configurations
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/prod_db")

class TestConfig(Config):
    DEBUG = True
    # MongoDB configurations
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/test_db")