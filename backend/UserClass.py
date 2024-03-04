#imports from libraries
from pymongo import MongoClient
from flask_bcrypt import Bcrypt


class UserC:
    def __init__(self, users, bcrypt):
        self.users = users
        self.bcrypt = bcrypt


    def validateUser(self, email, password):
        try:
            user = self.users.find_one({'email' : email})

            if user:
                self.bcrypt.compare(password, user.password, function(err, result))

        except Exception as e:
            return False







        pass


