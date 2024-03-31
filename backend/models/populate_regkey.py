import sys
sys.path.insert(0, '/Users/Shamma/Desktop/UrbanKey-2/backend')
from config import regkey
import random

# Function to generate registration keys
def generate_registration_key(prefix):
    return prefix + ''.join(str(random.randint(0, 9)) for _ in range(7))

# Insert registration keys into the collection
def insert_registration_keys(num_keys):
    registration_keys = []
    for _ in range(num_keys):
        prefix = "R" if random.randint(0, 1) == 0 else "O"
        key_value = generate_registration_key(prefix)
        registration_keys.append({'key_value': key_value})
    regkey.insert_many(registration_keys)

if __name__ == "__main__":
    num_keys_to_insert = 25  # Number of registration keys to insert
    insert_registration_keys(num_keys_to_insert)
