from flask import Flask, render_template, request, url_for, redirect, session, jsonify, make_response
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_bcrypt import Bcrypt
import jwt
# from jwt import decode, InvalidTokenError
from datetime import datetime, timezone, timedelta
from functools import wraps
from bson.objectid import ObjectId
from config import users, client
from model.handleRefresh import handle_refresh_token

# from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

# app = Flask(__name__, template_folder='public')
app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'
CORS(app, origins='http://localhost:3000', methods=['GET', 'POST', 'OPTIONS'], supports_credentials=True)
bcrypt = Bcrypt(app)
#to encrypt certain informations (

# uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))

# db = client.get_database('UrbanKey')

# users = db.get_collection('Users')


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        # jwt is passed in the request header
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify(message='Unauthorized'), 401
        
        token = auth_header.split(' ')[1]

        try:  
            decoded = jwt.decode(token, app.config['SECRET_KEY'], options={"verify_signature": False})
            request.email = decoded['email']
            request.role = decoded['role']
            return f(*args, **kwargs)
        except jwt.exceptions.ExpiredSignatureError:
            return jsonify(message='Token has expired'), 403
        except jwt.exceptions.InvalidTokenError:
            return jsonify(message='Invalid token'), 403

    return decorated


@app.route("/", methods = ['post', 'get'])
def index():
    return "hello, this is the home page!"

@app.route("/SignUp", methods =['POST'])
def signup():
    try:
        data = request.get_json()
        full_name = data.get("fullName")
        email = data.get("email")
        password = data.get("password")

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        if users.find_one({'email': email}):
            return jsonify({'error': 'Email already exists'}), 400

        refreshToken = jwt.encode({
                    'email': email,
                    'role': 2001,
                    'exp': datetime.now(timezone.utc) + timedelta(days=1)
                }, app.config['REFRESH_TOKEN_SECRET'])

        new_user = {
            'full_name': full_name,
            'email': email,
            'role': 2001,
            'password': hashed_password,
            'refreshToken': refreshToken
        }

        user_id = users.insert_one(new_user).inserted_id
        token = jwt.encode({
            'email': email,
            'role': new_user['role'],
            'exp': datetime.now(timezone.utc) + timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        resp = make_response(jsonify({'role': 2001, 'token': token}))
        resp.set_cookie('jwt', refreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)
        return resp, 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500


@app.route("/Login", methods =['POST'])
def signin():
    try:
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        user = users.find_one({"email": email})

        if user:
            if bcrypt.check_password_hash(user.get('password'), password):
                role = user.get('role')

                token = jwt.encode({
                    'email': email,
                    'role': role,
                    'exp': datetime.now(timezone.utc) + timedelta(minutes=30)
                }, app.config['SECRET_KEY'])

                refreshToken = jwt.encode({
                    'email': email,
                    'role': role,
                    'exp': datetime.now(timezone.utc) + timedelta(days=1)
                }, app.config['REFRESH_TOKEN_SECRET'])

                user['refreshToken'] = refreshToken

                users.update_one({'_id': user['_id']}, {'$set': {'refreshToken': refreshToken}})

                resp = make_response(jsonify({'role': role, 'token': token}))
                resp.set_cookie('jwt', refreshToken, httponly=True, secure=True, samesite='None', max_age=24 * 60 * 60)

                return resp, 200
                # return jsonify({'token': token, 'role': user.get('role')}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({'error': 'user not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/Profile', methods=['GET'])
@token_required
def profile():
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
   

@app.route("/user/profile/update", methods=['POST'])
@token_required
def update_user_profile():
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

@app.route("/user/verification", methods=['POST'])
def verification():
    try:
        data = request.get_json()
        email = data.get("email")

        user = users.find_one({"email": email})
        if user:
            return jsonify({'verification': 'true'}), 901
        else:
            return jsonify({'verification': 'false'}), 902

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500
    
@app.route('/Refresh', methods=['GET'])
async def refreshToken():
    # Call the handle_refresh_token function
    cookies = request.cookies
    refreshToken = cookies.get('jwt')
    if not refreshToken:
        return jsonify({'error': 'Refresh token not found in cookies'}), 401

    # refreshToken = cookies['jwt']
    # print(refreshToken)

    # Find the user with the given refresh token in the collection
    found_user = users.find_one({'refreshToken': refreshToken})
    if not found_user:
        return jsonify({'error': 'User not found or invalid refresh token'}), 403

    try:
        # Verify the refresh token and extract username
        decoded = jwt.decode(refreshToken, app.config['REFRESH_TOKEN_SECRET'], options={"verify_signature": False})
        if 'email' not in decoded or found_user['email'] != decoded['email']:
            return jsonify({'error': 'Invalid refresh tokennnn'}), 403
        
        role = found_user.get('role')
    # Create new access token
        token = jwt.encode({
            'email': decoded['email'],
            'role': role,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=30)  # Adjust the expiration time as needed
        }, app.config['SECRET_KEY'])
        # email = decoded['email']
        # print(decoded)
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Refresh token has expired'}), 403
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid refresh token'}), 403

    return jsonify({'role': role, 'token': token}), 200

@app.route('/Logout')
async def handle_logout():
    # On the client, also delete the accessToken

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


if __name__ == "__main__":
    app.run(debug=True)



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
