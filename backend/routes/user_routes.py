from flask import Blueprint, request, jsonify
from functools import wraps
from model.user import getProfile, update_user_profile
from services.token_service import verify_token

user_routes = Blueprint('user_routes', __name__)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

        if not token or not token.startswith('Bearer '):
            return jsonify(message='Unauthorized'), 401

        token = token.split(' ')[1]

        decoded_token = verify_token(token)
        if not decoded_token:
            return jsonify(message='Invalid or expired token'), 403

        # Attach token payload to request object for easy access in route functions
        request.email = decoded_token.get('email')
        request.role = decoded_token.get('role')

        return f(*args, **kwargs)

    return decorated


@user_routes.route("/Profile", methods=['GET'])
@token_required
def profile_route():
    
    return getProfile(request)
     

@user_routes.route("/user/profile/update", methods=['POST'])
@token_required
def updateProfile_route():
    
    return update_user_profile(request)