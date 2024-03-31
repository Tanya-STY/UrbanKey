from flask import Blueprint, request

from controllers.User import getProfile, update_user_profile
from middleware.TokenAuth import token_required

user_routes = Blueprint('user_routes', __name__)




@user_routes.route("/Profile", methods=['GET'])
@token_required
def profile_route():
    
    return getProfile(request)
     

@user_routes.route("/user/profile/update", methods=['POST'])
@token_required
def updateProfile_route():
    
    return update_user_profile(request)