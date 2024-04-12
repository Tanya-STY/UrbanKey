from flask import jsonify, make_response, send_file, Response
from werkzeug.utils import secure_filename
from config import users, regkey, units, fs # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token
import io
import re

def getProfile(request):
    try: 
        email = request.email
        role = request.role

        user = users.find_one({"email": email})

        user_data = {
            'name': user['full_name'],
            'email': user['email'],
            'province': user.get('province', ''),
            'city': user.get('city', ''),
            'num': user.get('num', ''),
            'num2': user.get('num2', ''),
            'key': user.get('registration_key', ''),
            'address': user.get('address', ''),
            'selectedFile': user.get('selectedFile', ''),
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
        data = request.get_json()
        name = data.get('name')
        email = request.email
        province = data.get('province')
        city = data.get('city')
        num = data.get('num')
        num2 = data.get('num2', '')
        registration_key = data.get("key")
        address = data.get('address')

        user_info = {
            'name': name,
            'email': email,
            'num': num
        }

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
            else:
                return jsonify({'error': 'Unit not found for the given registration key'}), 404
        else:
            return jsonify({'error': 'Invalid registration key'}), 400

    except Exception as e:
        print(e)
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

