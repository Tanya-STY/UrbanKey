from flask import jsonify, make_response
from config import users, fs # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token
from bson import ObjectId


def getProfile(request):
    
    try: 

        email = request.email
        role = request.role

        user = users.find_one({"email": email})

        if 'photo_id' in user:
                photo_id = user['photo_id']
                photo_file = fs.get(ObjectId(photo_id))
                if photo_file:
                    # Add photo data to profile_data
                    selectedFile = photo_file.read().decode('utf-8')
                else:
                     selectedFile = None
        else: 
             selectedFile = None


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
                    'selectedFile': selectedFile
                }), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def update_user_profile(request):
    try:
        photo_file = request.files['selectedFile'] if 'selectedFile' in request.files else None
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

        if photo_file:
            photo_id = fs.put(photo_file, filename=photo_file.filename, content_type=photo_file.content_type)
            
            users.update_one({"email": email}, {"$set": {"photo_id": str(photo_id)}})


        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500