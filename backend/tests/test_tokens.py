# # from flask import Flask, jsonify, make_response, request
# # import flask
# # import jwt
# # from backend.config import users
# # from backend.services.token_service import generate_access_token, generate_refresh_token, verify_refresh_token, verify_token
# # from flask_bcrypt import Bcrypt
# # from unittest.mock import MagicMock, patch
# # import pytest
# # import sys
# # sys.path.append('C:\\Users\\Shamma\\Desktop\\UrbanKey-2\\backend')
# # from app import app
# # from unittest.mock import MagicMock, patch


# # # Create a mock MongoDB collection


# # app = Flask(__name__)
# # app.config['SECRET_KEY'] = '0622d0d552f33f6309180901'
# # app.config['SERVER_NAME'] = 'localhost:5000'

# # # Apply the configuration to the app
# # app.testing = True

# # # Apply patches for jwt.decode to avoid actual signature verification
# # @pytest.fixture(autouse=True)
# # def setup():
# #     with patch('jwt.decode', side_effect=jwt_decode_mock):
# #         yield

# # # Mock function for jwt.decode
# # def jwt_decode_mock(token, secret_key, options=None):
# #     if token == 'valid_token':
# #         return {'user_id': 123}
# #     elif token == 'expired_token':
# #         raise jwt.ExpiredSignatureError
# #     else:
# #         raise jwt.InvalidTokenError

# # # test case for successul token verification
# # def test_verify_token_success():
# #     with app.app_context():
# #         payload = verify_token('valid_token')

# #     assert payload == {'user_id': 123}
# import unittest
# from unittest.mock import patch, MagicMock
# from app import app

# class ProfileRouteTestCase(unittest.TestCase):
#     def setUp(self):
#         self.app = app.test_client()

#     @patch('backend.services.token_service.verify_token')
#     def test_profile_route_with_valid_token(self, verify_token_mock):
#         # Set the return value of the mock to simulate a valid token payload
#         valid_token_payload = {'email': 'test@example.com', 'role': 'user'}
#         verify_token_mock.return_value = valid_token_payload

#         # Make a request to the profile route with a valid token
#         headers = {'Authorization': 'Bearer valid_token'}
#         response = self.app.get('/Profile', headers=headers)

#         # Assert that the response status code is 200
#         self.assertEqual(response.status_code, 200)

#         # Assert any other relevant assertions about the response data
#         # For example, you can check if the returned JSON data matches the expected data

#     @patch('routes.user_routes.verify_token')
#     def test_profile_route_with_invalid_token(self, verify_token_mock):
#         # Set the return value of the mock to simulate an invalid token
#         verify_token_mock.return_value = None

#         # Make a request to the profile route with an invalid token
#         headers = {'Authorization': 'Bearer invalid_token'}
#         response = self.app.get('/Profile', headers=headers)

#         # Assert that the response status code is 403 (Forbidden)
#         self.assertEqual(response.status_code, 403)

#         # Assert any other relevant assertions about the response data
#         # For example, you can check if the returned JSON data contains an error message indicating invalid token

# if __name__ == '__main__':
#     unittest.main()