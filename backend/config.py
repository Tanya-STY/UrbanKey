from pymongo import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.get_database('UrbanKey')

users = db.get_collection('Users')

