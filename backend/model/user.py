from flask import jsonify, make_response
from config import users # Import the MongoDB collection and bcrypt instance
from services.token_service import generate_access_token, generate_refresh_token

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

        if registration_key.startswith('R'):
            role = 1984
        elif registration_key.startswith('O'):
            role = 3333

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

        # Update user profile based on email
        users.update_one({"email": email}, update, upsert=False)

        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500