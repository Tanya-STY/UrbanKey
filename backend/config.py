from pymongo import MongoClient
from pymongo.server_api import ServerApi
from gridfs import GridFS

uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.get_database('UrbanKey')

fs = GridFS(db)

users = db.get_collection('Users')

regkey = db.get_collection('RegistrationKey')

units = db.get_collection('Units')

reservations = db.get_collection('Reservations')

mongo_img_bucket = "unitphotos" #GridFS bucket where images will be stored.

print(db.list_collection_names())