# app.py

from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from config import client
from routes.Auth_routes import auth_routes  # Import route blueprints
from routes.User_routes import user_routes
from routes.Company_routes import company_routes
from routes.Financial_routes import financial_routes
from routes.Property_routes import property_routes
from routes.Reservation_routes import reservation_routes
from routes.Unit_routes import unit_routes


app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'

cors_options = {
    "origins": "http://localhost:3000",
    "supports_credentials": True,
    "options_success_status": 200
}
CORS(app, **cors_options)


# Register route blueprints, Blueprint object allows defining a collection of routes (URLs) 
app.register_blueprint(auth_routes)
app.register_blueprint(user_routes)
app.register_blueprint(company_routes)
app.register_blueprint(financial_routes)
app.register_blueprint(property_routes)
app.register_blueprint(reservation_routes)
app.register_blueprint(unit_routes)

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

if __name__ == "__main__":
    app.run(debug=True)

