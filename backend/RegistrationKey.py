from pymongo import MongoClient

class RegKey:
    def __init__(self, registrationKeyCollection):
        self.registrationKeyCollection = registrationKeyCollection


    def checkRegistrationKey(self, regKey, email):
        try: 
            doc = self.registrationKeyCollection.find_one({'registration' : regKey})

            if doc:
                if doc.get('email') == email:
                    return doc
                else:
                    return "Error 1: wrong credentials"

        except Exception as e:
            print(e)
            return "Error 2: internal error in  checkRegistrationKey(self, regKey, email)"