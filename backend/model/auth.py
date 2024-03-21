from flask import jsonify, make_response, request
from config import users  # Import the MongoDB collection and bcrypt instance
from services.token_service import generate_access_token, generate_refresh_token, verify_refresh_token
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()
# from services.bcrypt_services import hash_password, check_password

def signup(request):
    try:
        data = request.get_json()
       
        full_name = data["fullName"]
        email = data['email']
        password = data['password']
        
        # Hash the password using bcrypt
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        if users.find_one({'email': email}):
            return jsonify({'error': 'Email already exists'}), 409 
        
        # Insert new user data into the database
        new_user = {
            'full_name': full_name,
            'email': email,
            'role': 2001,
            'password': hashed_password,
            'refreshToken': ''
        }

        users.insert_one(new_user).inserted_id

        refreshToken = generate_refresh_token(email, 2001)

        users.update_one({'email': new_user['email']}, {'$set': {'refreshToken': refreshToken}})

        token = generate_access_token(email, 2001)

        resp = make_response(jsonify({'role': 2001, 'token': token}))
        resp.set_cookie('jwt', refreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)
        return resp, 200
    
    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    
def signin(request):
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

    elif request.method == 'POST':
        try:
            data = request.get_json()
            email = data['email']
            password = data['password']

            user = users.find_one({'email': email})

            if user:

                if bcrypt.check_password_hash(user.get('password'), password):
                    role = user.get('role')

                    token = generate_access_token(email,role)


                    refreshToken = generate_refresh_token(email,role)

                    user['refreshToken'] = refreshToken

                    users.update_one({'email': email}, {'$set': {'refreshToken': refreshToken}})

                    resp = make_response(jsonify({'role': role, 'token': token}))
                    resp.set_cookie('jwt', refreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)

                    return resp, 200
            
                else:
                    return jsonify({"error": "Invalid email or password"}), 401
            else:
                return jsonify({'error': 'user not found'}), 404

        except Exception as e:
            print(e)
            return jsonify({'error': 'Internal server error'}), 500

def refreshToken(request):
    # Call the handle_refresh_token function
    cookies = request.cookies
    refreshToken = cookies.get('jwt')
    if not refreshToken:
        return jsonify({'error': 'Refresh token not found in cookies'}), 401

    # Find the user with the given refresh token in the collection
    found_user = users.find_one({'refreshToken': refreshToken})
    if not found_user:
        return jsonify({'error': 'User not found or invalid refresh token'}), 403

   
    decoded_refresh_token = verify_refresh_token(refreshToken)
    if 'email' not in decoded_refresh_token or found_user['email'] != decoded_refresh_token['email']:
        return jsonify({'error': 'Invalid refresh tokennnn'}), 403

    role = found_user.get('role')

    new_token = generate_access_token(found_user['email'],role)
        

    return jsonify({'role': role, 'token': new_token}), 200

def handle_logout(request):
    # try:
    cookies = request.cookies
    if 'jwt' not in cookies:
        return '', 205  # No content

    refreshToken = cookies['jwt']

    # Is refreshToken in the database?
    found_user = users.find_one({'refreshToken': refreshToken})
    if not found_user:
         # Clear the JWT cookie
        response = jsonify()
        response.set_cookie('jwt', '', httponly=True, samesite='None', secure=True, max_age=0)
        return response, 204

        # Delete refreshToken in the database
    users.update_one({'_id': found_user['_id']}, {'$set': {'refreshToken': ''}})

        # Clear the JWT cookie
    response = jsonify()
    response.set_cookie('jwt', '', httponly=True, samesite='None', secure=True, max_age=0)
    return response, 206
    
    # except Exception as e:
    #     return jsonify({'error': 'Internal server error'}), 500
