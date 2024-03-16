from flask import Blueprint, request, jsonify
from model.auth import signup, signin, refreshToken, handle_logout

auth_routes = Blueprint('auth_routes', __name__)

@auth_routes.route("/SignUp", methods=['POST'])
def signup_route():
    
    return signup(request)
     

@auth_routes.route("/Login", methods=['POST'])
def signin_route():

    return signin(request)

@auth_routes.route('/Refresh', methods=['GET'])
def refresh_route():

    return refreshToken(request)

@auth_routes.route('/Logout')
def logout_route():

    return handle_logout(request)