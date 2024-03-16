from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['your_database_name']

# Define user schema
user_schema = {
    'username': {'type': str, 'required': True},
    'roles': {
        'User': {'type': int, 'default': 2001},
        'Editor': int,
        'Admin': int
    },
    'password': {'type': str, 'required': True},
    'refreshToken': str
}

# Create collection and insert schema
user_collection = db['users']
user_collection.insert_one(user_schema)

# Define User class
class User:
    def __init__(self, username, roles, password, refreshToken=None):
        self.username = username
        self.roles = roles
        self.password = password
        self.refreshToken = refreshToken

    def save(self):
        user_collection.insert_one(self.__dict__)

# Usage
if __name__ == "__main__":
    user_data = {
        'username': 'test_user',
        'roles': {
            'User': 2001,
            'Editor': 3001,
            'Admin': 4001
        },
        'password': 'password123',
        'refreshToken': 'abc123'
    }
    user = User(**user_data)
    user.save()
