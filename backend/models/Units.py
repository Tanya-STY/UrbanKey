import mongoengine

class Units(mongoengine.Document):
    unit_id = mongoengine.StringField(required=True, unique=True)
    unit_owner = mongoengine.ReferenceField('Users')
    occupant = mongoengine.ReferenceField('Users')
    size = mongoengine.StringField()
    condo_fee = mongoengine.DecimalField()
    registration_key = mongoengine.StringField(required=True)
    property = mongoengine.ReferenceField('Property')
    occupant_info = mongoengine.StringField()
    # occupant_type = mongoengine.StringField(choices=['owner', 'rental user'])

# Connect to MongoDB
mongoengine.connect('UrbanKey')

#mongosh 
# use UrbanKey
