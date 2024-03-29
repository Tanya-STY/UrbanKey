import mongoengine

class Employee(mongoengine.Document):
    username = mongoengine.StringField(required=True)
    contact_email = mongoengine.EmailField()
    phone_number = mongoengine.StringField()
    role = mongoengine.StringField(choices=['manager', 'operations', 'finance']) #single string field, only one role

# Connect to MongoDB
mongoengine.connect('UrbanKey')