from pymongo import MongoClient
from pymongo.server_api import ServerApi
import certifi  


uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"


client = MongoClient(uri, tlsCAFile=certifi.where(), server_api=ServerApi('1'))


db = client.get_database('UrbanKey')

users = db.get_collection('Users')
regkey = db.get_collection('RegistrationKey')
units = db.get_collection('Units')
reservations = db.get_collection('Reservations')


print(db.list_collection_names())
