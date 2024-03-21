from flask import Flask, jsonify, make_response, request
import flask
import json
import jwt
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError
from backend.config import users  # Import the MongoDB collection and bcrypt instance
from backend.services.token_service import generate_access_token, generate_refresh_token, verify_refresh_token, verify_token
from flask_bcrypt import Bcrypt
from unittest.mock import MagicMock, patch
import pytest
import sys
sys.path.append('C:\\Users\\Shamma\\Desktop\\UrbanKey-2\\backend')
from app import app
from backend.model.handleRefresh import handle_refresh_token
from backend.model.user import getProfile, update_user_profile
from backend.routes import user_routes 
from backend.routes.user_routes import token_required
from unittest.mock import MagicMock, patch

# commands to run tests


# @pytest.fixture(scope="function")
# def client():
#     # Create a Flask test client instance
#     with app.test_client() as client:
#         client.application.db = MongoClient()
#         yield client

# Create a mock MongoDB collection
mongo_client_mock = MagicMock()

bcrypt_mock = MagicMock(return_value='test_password')

# Create a mock bcrypt instance
bcrypt = Bcrypt()

# Mock the Flask application and configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
app.config['REFRESH_TOKEN_SECRET'] = '062444442d0d554442f33f63091804444901'

# Apply the configuration to the app
app.testing = True

# Apply patches for MongoDB and bcrypt
@pytest.fixture(autouse=True)
def mock_dependencies():
    with patch('model.auth.users', new=mongo_client_mock), \
         patch('model.auth.bcrypt', new=bcrypt_mock):
        yield

def test_get_profile_exception():
    # Mock the request object with email and role attributes
    mock_request = MagicMock()

    # Raise an exception when accessing the email attribute
    mock_request.email.side_effect = AttributeError("Attribute 'email' not found")

    # Patch the users collection to simulate a successful user retrieval
    with app.test_request_context(), \
         patch('backend.config.users.find_one') as find_one_mock:
        
        # Configure the behavior of the mock users collection
        mock_user = {
            'full_name': 'Test User',
            'email': 'test@example.com',
            'province': 'Ontario',
            'city': 'Toronto',
            'num': '123456789',
            'num2': '987654321',
            'key': 'test_key',
            'address': '123 Test St',
            'selectedFile': 'test_file.jpg'
        }
        find_one_mock.return_value = mock_user

        # Call the getProfile function with the mock request
        response, status_code = getProfile(mock_request)

    # Assert the response and status code
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}

def test_update_user_profile():
    # Mock request data
    request_data = {
        "name": "Test User",
        "province": "Ontario",
        "city": "Toronto",
        "num": "123456789",
        "num2": "987654321",
        "key": "RegistrationKey",
        "address": "123 Test St"
    }

    # Mock the request object with get_json and email attributes
    mock_request = MagicMock()
    mock_request.get_json.return_value = request_data
    mock_request.email = "test@example.com"

    # Patch the users collection
    with app.test_request_context(json=request_data):
        # Call the update_user_profile function with the mock request
        response, status_code = update_user_profile(mock_request)

    # Assert the response and status code
    assert status_code == 200
    assert response.json == {'message': 'User updated successfully'}

# Run the test case
test_update_user_profile()

def test_update_user_profile_exception():
    # Mock request data
    request_data = {
        "name": "Test User",
        "province": "Ontario",
        "city": "Toronto",
        "num": "123456789",
        "num2": "987654321",
        "key": "RegistrationKey",
        "address": "123 Test St"
    }

    # Mock the request object with get_json and email attributes
    mock_request = MagicMock()
    mock_request.get_json.return_value = request_data
    mock_request.email = "test@example.com"

    # Patch the users collection to simulate an exception
    with app.test_request_context(json=request_data):
        # Patch the users collection to simulate an exception
        with patch('backend.model.user.users.update_one') as update_one_mock:
            update_one_mock.side_effect = Exception("Database error")

            # Call the update_user_profile function within the app context
            response, status_code = update_user_profile(flask.request)

    # Assert the response and status code
    assert status_code == 500
    assert response.json == {'error': 'Internal server error'}

def test_handle_refresh_token():

    # Mock the request cookies
    request_cookies = {'jwt': 'valid_refresh_token'}

    # Mock the user document in the database
    found_user = {'refreshToken': 'valid_refresh_token'}

    with app.test_request_context():
        # Patch dependencies and request context
        with patch('backend.model.handleRefresh.users') as users_mock, \
            patch('backend.model.handleRefresh.jwt') as jwt_mock:
            
            # set cookies attribute directly on the request object
            flask.request.cookies = request_cookies
            # Configure mock objects
            users_mock.find_one.return_value = found_user
            jwt_mock.decode.return_value = {'username': 'test@example.com'}
            jwt_mock.encode.return_value = 'encoded_token'

            response, status_code = handle_refresh_token(app)

    # Assert the response status code
    assert status_code == 200

    # Assert the response content
    assert response.json == {'token': 'encoded_token'}

def test_handle_refresh_token_not_found():
    request_cookies = {}

    with app.test_request_context():
        flask.request.cookies = request_cookies

        response, status_code = handle_refresh_token(app)
    
    assert status_code == 401

    assert response.json == {'error': 'Refresh token not found in cookies'}

def test_handle_refresh_token_notfound():
    request_cookies = {'jwt': 'invalid_refresh_token'}

    with app.test_request_context():
        flask.request.cookies = request_cookies

        with patch('backend.model.handleRefresh.users') as users_mock:

            users_mock.find_one.return_value = None


            response, status_code = handle_refresh_token(app)
    
    assert status_code == 403

    assert response.json == {'error': 'User not found or invalid refresh token'}


def test_handle_refresh_token_expired():
    request_cookies = {'jwt': 'expired_refresh_token'}

    with app.test_request_context():
        flask.request.cookies = request_cookies

        with patch('backend.model.handleRefresh.users') as users_mock, \
            patch('backend.model.handleRefresh.jwt') as jwt_mock:

            users_mock.find_one.return_value = {'refreshToken': 'expired_refresh_token'}
            jwt_mock.decode.side_effect = ExpiredSignatureError

            response, status_code = handle_refresh_token(app)

    
    assert status_code == 403

    assert response.json == {'error': 'Refresh token has expired'}


def test_handle_refresh_token_invalid():
    request_cookies = {'jwt': 'invalid_refresh_token'}

    with app.test_request_context():
        flask.request.cookies = request_cookies

        with patch('backend.model.handleRefresh.users') as users_mock, \
            patch('backend.model.handleRefresh.jwt') as jwt_mock:

            users_mock.find_one.return_value = {'refreshToken': 'invalid_refresh_token'}
            jwt_mock.decode.side_effect = InvalidTokenError

            response, status_code = handle_refresh_token(app)

    
    assert status_code == 403

    assert response.json == {'error': 'Invalid refresh token'}

def test_token_required_decorator():
    # Define the mock token to be used in the authorization header
    mock_token = 'mock_token'

    # Mock the jwt.decode function used in verify_token
    with patch('jwt.decode') as decode_mock:
        # Define the mock token payload for the mock token
        mock_token_payload = {'email': 'test@example.com', 'role': 'user'}

        # Configure the decode_mock to return the mock token payload for the mock token
        decode_mock.return_value = mock_token_payload

        # Create a mock request object for testing
        class MockRequest:
            headers = {'Authorization': f'Bearer {mock_token}'}

        # Call the decorated function with a mock request for the mock token
        @app.route('/dummy_route')
        @token_required
        def dummy_route():
            # Access the decoded token payload attached to the request
            email = request.email
            role = request.role
            return jsonify({'email': email, 'role': role}), 200

        with app.test_request_context('/dummy_route', headers=MockRequest.headers):
            response_tuple = dummy_route()
            # print(response)

        # Extract the Flask response object from the response tuple
        flask_response = response_tuple[0]

        # Assert that the decoded token matches the mock token payload
        assert mock_token_payload['email'] in flask_response.get_data(as_text=True)
        assert mock_token_payload['role'] in flask_response.get_data(as_text=True)

        # Assert that the response is successful (status code 200)
        # assert response.status_code == 200

def test_token_required_unauthorized():
    
    # Call the decorated function with no token provided
    @app.route('/dummy_route2')
    @token_required
    def dummy_route2():
        return jsonify({'message': 'Unauthorized'}), 401

    with app.test_request_context('/dummy_route2'):
        response = dummy_route2()
        
    # Extract the Flask response object from the response tuple
    flask_response, status_code = response

    # Assert that the response message is 'Unauthorized' and status code is 401
    assert status_code == 401
    assert flask_response.json['message'] == 'Unauthorized'


# def test_token_required_invalid_or_expired_token():
#     mock_token = 'mock_token'
#     # Mock the verify_token function to return None, simulating an invalid or expired token
#     with patch('backend.services.token_service.verify_token') as verify_token_mock:
#         invalid_token_error_message = 'Invalid or expired token'
#         invalid_token_status_code = 403
#         verify_token_mock.return_value = (invalid_token_error_message, invalid_token_status_code)

#         # Call the decorated function with an invalid or expired token
#         @app.route('/dummy_route3')
#         @token_required
#         def dummy_route3():
#             return jsonify({'message': 'Invalid or expired token'}), 403

#         with app.test_request_context('/dummy_route3', headers={'Authorization': f'Bearer {mock_token}'}):
#             response_tuple = dummy_route3()
#             print(response_tuple)

#         # Extract the Flask response object from the response tuple
#         flask_response, status_code = response_tuple

#         # Assert that the response message is 'Invalid or expired token' and status code is 403
#         assert flask_response.json['message'] == invalid_token_error_message
#         assert status_code == invalid_token_status_code