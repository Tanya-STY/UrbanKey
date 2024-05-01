from flask import jsonify, make_response, send_file, Response
from werkzeug.utils import secure_filename
from config import users, regkey, units, fs, requests # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token
import io
import re
from bson import ObjectId
import base64
import traceback
import random




def getProfile(request):

    try: 
        email = request.email
        role = request.role
        #even though we do not use this line above, we have to add it or it will create an error (for me anyways)

        user = users.find_one({"email": email})
        
        request_dict = {}  # Initialize an empty dictionary
        
        cursors = requests.find({'email': email}, {'_id':0})
        for i, cursor in enumerate(cursors):
            request_dict[f'request_{i}'] = dict(cursor)
            # print(request_dict)
            # print('\n')
        

        if 'photo_id' in user:
                photo_id = user['photo_id']
                photo_file = fs.get(ObjectId(photo_id))
                #gets the binary data of the object from the database.
                if photo_file:
                   
                   profilePhotoDecoded = base64.b64encode(photo_file.read()).decode('utf-8')
                   #transform the binary data into encoded base64 because thats what we read in the frontend
                   profilePhotoDecodedWithSpecialCharacters = profilePhotoDecoded[:4] + ':' + profilePhotoDecoded[4:14] + ';' + profilePhotoDecoded[14:20] + ',' + profilePhotoDecoded[20:]
                    # we have to add the characters ; : and , because base64 does not have those characters, so it erases it.
                    #we have to manually add them back or else it wont be understood correctly
                    #hopefully all photos share the same structure at the begining, but if they do not, and if
                    #you get an error 431 or something else, it might be because  of this manual injection. 
                    #to debug, print the variables and check manually with the one you're sending (original encoded64)
                else:
                     profilePhotoDecodedWithSpecialCharacters = None
        else: 
             profilePhotoDecodedWithSpecialCharacters = None

        # print(f'Final ProfilePhoto : {profilePhoto}')
        
        user_data = {
            'name': user['full_name'],
            'email': user['email'],
            'province': user.get('province', ''),
            'city': user.get('city', ''),
            'num': user.get('num', ''),
            'num2': user.get('num2', ''),
            'key': user.get('registration_key', ''),
            'address': user.get('address', ''),
            'profilePicture': profilePhotoDecodedWithSpecialCharacters,
            'req': request_dict
        }

        regKey = user.get('registration_key')
        reg_key = regkey.find_one({"key_value": regKey})

        if reg_key:
            unit = units.find_one({"$or": [{"registration_key_renter": reg_key['_id']},
                                        {"registration_key_owner": reg_key['_id']}]})
            
            
            if unit:
                unit_data = {
                    'unit_id': unit.get('unit_id',''),
                    'renter': unit.get('occupant', {}),
                    'category': unit.get('category', ''),  
                    'title': unit.get('title', ''),
                    'province_unit': unit.get('province', ''),  
                    'city_unit': unit.get('city', ''), 
                    'description': unit.get('description', ''),  
                    'price': unit.get('price', ''),  
                    'numberOfRoom': unit.get('numberOfRoom', ''), 
                    'grossM2': unit.get('grossM2', ''),  
                    'netM2': unit.get('netM2', ''),  
                    'warmingType': unit.get('warmingType', ''),  
                    'buildingAge': unit.get('buildingAge', ''),  
                    'floorLocation': unit.get('floorLocation', ''),  
                    'availableForLoan': unit.get('availableForLoan', ''),  
                    'furnished': unit.get('furnished', ''),  
                    'parking': unit.get('parking', ''),  
                    'parkingID': unit.get('parkingID', ''), 
                    'locker': unit.get('locker', ''),  
                    'rentalIncome': unit.get('rentalIncome', ''),
                    'interior': unit.get('interiorFeatures', []), 
                    'exterior': unit.get('exteriorFeatures', [])  
                }
            else:
                # If unit is not found, set unit data to empty
                unit_data = {}
        else:
            # If regkey is not found, set unit data to empty
            unit_data = {}

        
        response_data = {**user_data, **unit_data} # Merging dictionaries using ** to unpack

        return jsonify(response_data), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def getRegisteredProfile(request):
    pass


def update_user_profile(request):
    try:
        role = request.role
        data = request.get_json()
        name = data.get('name', '')
        email = request.email
        province = data.get('province', '')
        city = data.get('city', '')
        num = data.get('num', '')
        num2 = data.get('num2', '')
        registration_key = data.get("key", '')
        address = data.get('address', '')
        profile_picture = data.get('profilePicture', '')

        user_info = {
            'name': name,
            'email': email,
            'num': num
        }

        if profile_picture:
            filename = f'photo_of_{name}'
            profile_picture_binary = base64.b64decode(profile_picture)
            #store the object as object as binary instead of base64 because gridFS stores in binary
            photo_id = fs.put(profile_picture_binary, filename=filename)
            users.update_one({"email": email}, {"$set": {"photo_id": str(photo_id)}})

        else:
             print(f'Did not upload picture because profile_photo: {profile_picture}')

        reg_key = regkey.find_one({"key_value": registration_key})

        if reg_key:
            unit = units.find_one({"$or": [{"registration_key_renter": reg_key['_id']},
                                        {"registration_key_owner": reg_key['_id']}]})
            
            if unit:
                unit_id = unit.get('unit_id')
                if unit.get("registration_key_renter") == reg_key['_id']:
                    role = 1984
                    units.update_one({"_id": unit["_id"]}, {"$set": {"occupant": user_info}})
                elif unit.get("registration_key_owner") == reg_key['_id']:
                    role = 3333
                    units.update_one({"_id": unit["_id"]}, {"$set": {"unit_owner": user_info}})

                update = {
                    '$set': {
                            'role': role,  # Update existing field
                            'province': province,  # Add new field or update existing one
                            'city': city,  # Add new field or update existing one
                            'num': num,  # Add new field or update existing one
                            'num2': num2,  # Add new field or update existing one
                            'registration_key': registration_key,  # Add new field or update existing one
                            'address': address  # Add new field or update existing one
                    }
                }
                users.update_one({"email": email}, update, upsert=False)

                return jsonify({'message': 'User updated successfully', 'unit_id': unit_id, 'role': role}), 200
        #     else:
        #         return jsonify({'error': 'Unit not found for the given registration key'}), 404
        # else:
        #     return jsonify({'error': 'Invalid registration key'}), 400

    except Exception as e:
        print(e)
        # traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500
    

   
def download_file(unit_id):
    # Query the fs.files collection to find the document with the given unit_id
    file_document = fs.find_one({'unit_id': unit_id, 'filename': {'$regex': '^print-'}})

    if file_document:
        file_data = file_document.read()
     
        # Set the MIME type for the response
        mimetype = 'application/pdf'
        
        # Create a response with the file data
        return Response(file_data, mimetype=mimetype)

    else:
        return 'File not found', 404

def new_request(request):
    
    try:
        role = request.role
        email = request.email
        data = request.get_json()
        title = data.get('title', '')
        description = data.get('description', '')
        print(f'Title: {title} || Description: {description}')
        
        random_number = -1
        while(True):
            random_number = random.randint(0, 9999)
            
            check_request_number_exists = requests.find_one({'number':random_number})
            
            
            if check_request_number_exists:
                continue
            else:
                break 
        
        new_request_data = {
            'title':title,
            'description': description,
            'number':random_number,
            'email':email,
            'status':'pending'
        }
        
        request_id = requests.insert_one(new_request_data)
        
        if request_id:
            print(request_id)
            print(new_request_data)
            return jsonify({'message':'request added'})
        else:
            print('did not enter request')
            return jsonify({'message':'Could not enter request, try again.'})
    
    except Exception as e:
        return jsonify({'error':e})

def get_employee_info(request):
    try:
        print('inside the get_employee_info route')

        role = request.role
        email = request.email

        all_employee = users.find({"role": 2020}, {'name': 1})
        for employee in all_employee:
            print(employee)



    except Exception as e:
        print(f'error: {e}')
        return jsonify({'error':e})

