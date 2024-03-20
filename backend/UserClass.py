from pymongo import MongoClient


class UserC:
    def __init__(self, users):
        self.users = users


    def findUser(self, email):
        return self.users.find_one({'email':email})