from flask import jsonify, make_response
from config import users, fs # Import the MongoDB collection and bcrypt instance
from middleware.TokenAuth import generate_access_token, generate_refresh_token
from bson import ObjectId
import base64
import traceback




def getProfile(request):
    
    try: 

        email = request.email
        role = request.role
        #even though we do not use this line above, we have to add it or it will create an error (for me anyways)

        user = users.find_one({"email": email})

        if 'photo_id' in user:
                photo_id = user['photo_id']
                print(f'getProfile photo_id : {photo_id}')
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
                    'profilePicture': profilePhotoDecodedWithSpecialCharacters
                }), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

def update_user_profile(request):
    try:
        role = request.role
        data = request.get_json()
        name = data['name']
        email = data['email']
        province = data['province']
        city = data['city']
        num = data['num']
        num2 = data['num2']
        registration_key = data['key']
        address = data['address']
        profile_picture = data['profilePicture']

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
     

        if profile_picture:
            filename = f'photo_of_{name}'
            profile_picture_binary = base64.b64decode(profile_picture)
            #store the object as object as binary instead of base64 because gridFS stores in binary
            photo_id = fs.put(profile_picture_binary, filename=filename)
            users.update_one({"email": email}, {"$set": {"photo_id": str(photo_id)}})

        else:
             print(f'Did not upload picture because profile_photo: {profile_picture}')


        return jsonify({'message': 'User updated successfully'}), 200

    except Exception as e:
        print(e)
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500