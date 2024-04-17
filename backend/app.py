# app.py

from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from config import client
from routes.auth_routes import auth_routes  # Import route blueprints
from routes.user_routes import user_routes
from routes.Company_routes import company_routes
from routes.Financial_routes import financial_routes
from routes.Property_routes import property_routes
from routes.Reservation_routes import reservation_routes
from routes.Unit_routes import unit_routes
from routes.Upload_routes import upload_routes
# from middleware.credentials import credentials_middleware

import os

# UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')

def create_app():
    app = Flask(__name__)



    # app.config.from_pyfile('config.py')  # Load configuration from config.py
    app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
    app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'

    #configuring pymongo to work with flask application
    # mongo = PyMongo(app)

    # cors_options = {
    #     "origins": ["http://example.com", "http://localhost:3000", "http://localhost:5000"],
    #     "supports_credentials": True
    # }

    # app.before_request(credentials_middleware(app))

    # cors_options = {
    #     "origins": "http://localhost:3000",
    #     "supports_credentials": True,
    #     "methods": ["GET", "POST"],
    #     "allow_headers": ["Content-Type", "Authorization"],
    #     "options_success_status": 200
    # }
    # CORS(app, **cors_options)
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "supports_credentials": True}})
    # CORS(app)


    # Register route blueprints, Blueprint object allows defining a collection of routes (URLs) 
    app.register_blueprint(auth_routes)
    app.register_blueprint(user_routes)
    app.register_blueprint(company_routes)
    app.register_blueprint(financial_routes)
    app.register_blueprint(property_routes)
    app.register_blueprint(reservation_routes)
    app.register_blueprint(unit_routes)
    # Register the upload routes blueprint
    # app.register_blueprint(upload_routes, url_prefix='/uploads')
    app.register_blueprint(upload_routes)

    return app


try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)

