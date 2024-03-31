import mongoengine 

class RegistrationKey(mongoengine.Document):
    key_value = mongoengine.StringField(required=True)
    unit = mongoengine.ReferenceField('Units')
    user = mongoengine.ReferenceField('Users')

mongoengine.connect('UrbanKey')

