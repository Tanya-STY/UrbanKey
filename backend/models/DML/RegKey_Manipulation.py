import mongoengine
import random
from RegKey import RegistrationKey

mongoengine.connect('UrbanKey')

def generate_registration_key(prefix):
    key = prefix + ''.join(str(random.randint(0, 9)) for _ in range(7))
    return key

for i in range(25):
    prefix = "R" if i % 2 == 0 else "O"
    registration_key = RegistrationKey(keyvalue=generate_registration_key(prefix))
    registration_key.save()

#to execute script, run it in the command line from the DML directory: python RegKey_Manipulation.py