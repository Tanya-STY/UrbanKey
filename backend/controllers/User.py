from flask import jsonify, make_response
from config import users, regkey, units # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token

def getProfile(request):
    try: 

        email = request.email
        role = request.role

        user = users.find_one({"email": email})

        if user:
                return jsonify({
                    'name': user['full_name'],
                    'email': user['email'],
                    'province': user.get('province', ''),
                    'city': user.get('city', ''),
                    'num': user.get('num', ''),
                    'num2': user.get('num2', ''),
                    'key': user.get('key', ''),
                    'address': user.get('address', ''),
                    'selectedFile': user.get('selectedFile', '')
                }), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def update_user_profile(request):
    try:
        data = request.get_json()
        name = data.get('name')
        email = request.email
        province = data.get('province')
        city = data.get('city')
        num = data.get('num')
        num2 = data.get('num2')
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

        # if registration_key.startswith('R'):
        #     role = 1984
        # elif registration_key.startswith('O'):
        #     role = 3333

                return jsonify({'message': 'User updated successfully', 'unit_id': unit_id}), 200
            else:
                return jsonify({'error': 'Unit not found for the given registration key'}), 404
        else:
            return jsonify({'error': 'Invalid registration key'}), 400

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500


