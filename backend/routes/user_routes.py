from flask import Blueprint, request

from controllers.User import getProfile, getRegisteredProfile, update_user_profile, download_file, new_request
from middleware.TokenAuth import token_required

user_routes = Blueprint('user_routes', __name__)



@user_routes.route("/Profile", methods=['GET'])
@token_required
def profile_route():
    
    return getProfile(request) 

@user_routes.route("/profile-registered-user", methods=['GET'])
@token_required
def profileregistered_route():
    
    return getRegisteredProfile(request)
     

@user_routes.route("/user/profile/update", methods=['POST'])
@token_required
def updateProfile_route():
    
    return update_user_profile(request)


@user_routes.route('/download-file/<unit_id>', methods=['GET'])
@token_required
def download_file_route(unit_id):

    return download_file(unit_id)

@user_routes.route('/user/dashboard/newRequest', methods=['POST'])
@token_required
def new_request_route():
    
    return new_request(request)