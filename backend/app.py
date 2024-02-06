from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from flask_bcrypt import Bcrypt

app = Flask(__name__, template_folder='public')
CORS(app, origins='http://localhost:3000')
bcrypt = Bcrypt(app)

app.secret_key = "testing"

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

        return jsonify({'message': 'Signup successful', 'user_id': str(user_id)}), 201

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

        # return jsonify({'message': 'testing', 'email': email, 'password': password})

        if user:
            if bcrypt.check_password_hash(user.get('password'), password):
                return jsonify({'message': 'Login successful'}), 200
            else:
                return jsonify({"error": "Invalid email or password"}), 401
        else:
            return jsonify({'error': 'user not found'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)



# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
