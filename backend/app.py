# app.py

from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import users, client
from routes.auth_routes import auth_routes  # Import route blueprints
from routes.user_routes import user_routes

app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'
# CORS(app, origins='http://localhost:3000', supports_credentials=True)

cors_options = {
    "origins": "http://localhost:3000",
    "supports_credentials": True,
    "options_success_status": 200
}
CORS(app, **cors_options)


# Register route blueprints
app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)

if __name__ == "__main__":
    app.run(debug=True)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)