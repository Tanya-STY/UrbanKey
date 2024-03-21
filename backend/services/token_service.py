import jwt 
from datetime import datetime, timedelta, timezone
from flask import current_app, jsonify
# from config import users  # Import your User model

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
        return {'message':'Token has expired'}, 403
    except jwt.InvalidTokenError:
        return {'message':'Invalid token'}, 403

def verify_refresh_token(refreshToken):
    try:
        payload = jwt.decode(refreshToken, current_app.config['REFRESH_TOKEN_SECRET'], options={"verify_signature": False})
        return payload
    except jwt.ExpiredSignatureError:
        return {'message': 'Token has expired'}, 403
    except jwt.InvalidTokenError:
        return {'message': 'Invalid token'}, 403