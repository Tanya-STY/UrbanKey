import mongoengine

class Property(mongoengine.Document):
    property_name = mongoengine.StringField(required=True)
    unit_count = mongoengine.IntField()
    parking_count = mongoengine.IntField()
    locker_count = mongoengine.IntField()
    address = mongoengine.StringField()
    management_company = mongoengine.ReferenceField('ManagementCompany')
    files = mongoengine.ListField(mongoengine.StringField())

mongoengine.connect('UrbanKey')