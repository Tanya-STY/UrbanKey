import mongoengine

class Reservations(mongoengine.Document):
    facility = mongoengine.ReferenceField('Facility')
    user = mongoengine.ReferenceField('Users')
    reservation_date = mongoengine.DateTimeField()
    start_time = mongoengine.DateTimeField()
    end_time = mongoengine.DateTimeField()
    status = mongoengine.StringField(choices=['booked', 'available'])

mongoengine.connect('UrbanKey')