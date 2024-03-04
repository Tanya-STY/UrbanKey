#imports from libraries
from pymongo import MongoClient
from flask_bcrypt import Bcrypt


class UserC:
    def __init__(self, users, b):
        self.users = users
        self.bcrypt = b


    def validateUser(self, email, password):
        try:
            user_document = self.users.find_one({'email' : email})
            hashed_password = user_document.get('password')

            

            if self.bcrypt.check_password_hash(hashed_password, password):
                print('matched')
                return 1
            else:
                print('not found with given credentials')
                return 2
            
        except Exception as e:
            print(e)
            print('method failed')
            return 3
        
    def userExistence(self, email):
        try: 
            user_document = self.users.find_one({'email' : email})

            if user_document:
                return 2
            else:
                print(user_document)
                return 1
            
        except Exception as e:
            return 2
        
    def addUser(self, name, email, password):
        try: 

            print('test1')
            hashed_password = self.bcrypt.generate_password_hash(password)

            print('test2')
            new_user = {
                "full_name": name,
                "email": email,
                "password": hashed_password
            }
            print(new_user)
            self.users.insert_one(new_user)
            return 1
        
        except Exception as e:
            print(e)
            print('fail to add user')
            return 2


        


