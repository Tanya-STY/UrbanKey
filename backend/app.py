import jwt
from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_bcrypt import Bcrypt

import datetime
from bson.objectid import ObjectId
# from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, jwt_required

# app = Flask(__name__, template_folder='public')
app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
CORS(app, origins='http://localhost:3000', methods=['GET', 'POST', 'OPTIONS'])
bcrypt = Bcrypt(app)
#to encrypt certain informations (

uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.get_database('UrbanKey')

users = db.get_collection('Users')

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

        new_user = {
            'full_name': full_name,
            'email': email,
            'password': hashed_password
        }

        user_id = users.insert_one(new_user).inserted_id
        token = jwt.encode({
            'email': email,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
        }, app.config['SECRET_KEY'])

        return jsonify({'message': 'Signup successful', 'user_id': str(user_id), 'token': token}), 201

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
                token = jwt.encode({
                    'email': email,
                    'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
                }, app.config['SECRET_KEY'])
                return jsonify({'token': token}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({'error': 'user not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/Profile', methods=['GET'])
def profile():
    try:
        token = request.headers.get('Authorization')
        print(token)
        try:
            decoded_token = decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            email = decoded_token.get('email')
            print(email)
        except InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # print("authorization email:", email)
        user = users.find_one({"email": email})

        print(user)

        # return "Email from Authorization" + userEmail

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
def update_user_profile():
    try:
        data = request.get_json()
        email = data.get("email")

        # Update user profile based on email
        users.update_one({"email": email}, {"$set": data})

        return jsonify({'message': 'Profile updated successfully'}), 200

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

if __name__ == "__main__":
    app.run(debug=True)



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
