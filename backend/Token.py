import jwt
from datetime import datetime, timedelta



secretKey= '0622d0d552f33f6309180901'
#this is highly unsafe but will change the key value later
#and will refactor the code to make it safe but for now its more of a test key

class Token:
    def __init__(self):
        pass

    def create_token(self, email, password, name):

        # probably should add info of the user to see permission
        # permission info like type of user etc
        
        token = jwt.encode({
            'user':name,
            'expiration': str(datetime.utcnow() + timedelta(minutes=30))
        },
        secretKey)

        print('token from inside create_token: ' + token)
        return token

        pass

    def verif_token(self):
        pass