import jwt 
from datetime import datetime, timedelta, timezone
from functools import wraps
from flask import current_app, jsonify, request
# from config import users  # Import your User model

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        # print(token)

        if not token or not token.startswith('Bearer '):
            return jsonify(message='Unauthorized token'), 401

        token = token.split(' ')[1]

        decoded_token = verify_token(token)
        if not decoded_token:
            return jsonify(message='Invalid or expired token'), 403

        # Attach token payload to request object for easy access in route functions
        request.email = decoded_token.get('email')
        request.role = decoded_token.get('role')

        return f(*args, **kwargs)

    return decorated

def generate_access_token(email, role):
    """Generate an access token for the given user."""
    expiration_time = datetime.now(timezone.utc) + timedelta(minutes=30)  # Adjust expiration time as needed
    payload = {
        'email': email,
        'role': role,
        'exp': expiration_time,
    }
    return jwt.encode(payload, current_app.config['SECRET_KEY'])

def generate_refresh_token(email,role):
    """Generate a refresh token for the given user."""
    expiration_time = datetime.now(timezone.utc) + timedelta(days=1)  # Adjust expiration time as needed
    payload = {
        'email': email,
        'role': role,
        'exp': expiration_time,
    }
    return jwt.encode(payload, current_app.config['REFRESH_TOKEN_SECRET'])

def verify_token(token):
    """Verify and decode the given token."""
    try:
        payload = jwt.decode(token, current_app.config['SECRET_KEY'], options={"verify_signature": False})
        return payload
    except jwt.ExpiredSignatureError:
        return jsonify(message='Token has expired'), 403
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid token'), 403

def verify_refresh_token(refreshToken):
    try:
        payload = jwt.decode(refreshToken, current_app.config['REFRESH_TOKEN_SECRET'], options={"verify_signature": False})
        return payload
    except jwt.ExpiredSignatureError:
        return jsonify(message='Refresh Token has expired'), 403
    except jwt.InvalidTokenError:
        return jsonify(message='Invalid refresh token'), 403