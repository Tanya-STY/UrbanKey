import mongoengine

class ManagementCompany(mongoengine.Document):
    company_name = mongoengine.StringField(required=True)
    employees = mongoengine.ListField(mongoengine.ReferenceField('Employee'))
    properties = mongoengine.ListField(mongoengine.ReferenceField('Property'))
    roles = mongoengine.ListField(mongoengine.StringField(choices=['manager', 'operations', 'finance'])) #different roles available at the company,

# Connect to MongoDB
mongoengine.connect('UrbanKey')