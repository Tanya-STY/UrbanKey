from flask import request, jsonify
from config import users
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from datetime import datetime, timedelta, timezone



def handle_refresh_token(app):
    # Get the refresh token from cookies
    cookies = request.cookies
    if 'jwt' not in cookies:
        return jsonify({'error': 'Refresh token not found in cookies'}), 401

    refresh_token = cookies['jwt']

    # Find the user with the given refresh token in the collection
    found_user = users.find_one({'refreshToken': refresh_token})
    if not found_user:
        return jsonify({'error': 'User not found or invalid refresh token'}), 403

    try:
        # Verify the refresh token and extract username
        decoded = jwt.decode(refresh_token, app.config['REFRESH_TOKEN_SECRET'])
        email = decoded['username']
    except ExpiredSignatureError:
        return jsonify({'error': 'Refresh token has expired'}), 403
    except InvalidTokenError:
        return jsonify({'error': 'Invalid refresh token'}), 403

    # Create new access token
    token = jwt.encode({
        'email': email,
        'exp': datetime.now(timezone.utc) + timedelta(minutes=10)  # Adjust the expiration time as needed
    }, app.config['SECRET_KEY'])

    return jsonify({'token': token}), 200
