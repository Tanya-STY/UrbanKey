from flask import Flask, render_template, request, url_for, redirect, session, jsonify
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from werkzeug.security import generate_password_hash, check_password_hash
import bcrypt

app = Flask(__name__, template_folder='public')

app.secret_key = "testing"

uri = "mongodb+srv://admin:urbankey1234@urbankey.nfdot4b.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

db = client.get_database('UrbanKey')

users = db.get_collection('Users')

# @app.route("/", methods = ['post', 'get'])
# def index():
#     return app.send_static_file('index.html')

@app.route("/SignUp", methods = ['post'])
def signup():
    full_name = request.form.get('fullName')
    email = request.form.get('email')
    password = request.form.get('password')

    hashed_password = generate_password_hash(password, method ='sha256')

    if users.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400

    new_user = {
        'full_name': full_name,
        'email': email,
        'password': hashed_password
    }

    user_id = users.insert_one(new_user).inserted_id

    return jsonify({'message': 'Signup successful', 'user_id': str(user_id)}), 201



if __name__ == "__main__":
    app.run(debug=True)





# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
