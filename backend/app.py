from flask import Flask, jsonify
from flask_cors import CORS

from propelauth_flask import init_auth, current_user

app = Flask(__name__)
auth = init_auth("https://9803472.propelauthtest.com", "f56db217313de9bc9452e84f431237cde4ccb11afe56010e3c1facd68ae98258edf613e4b65fab45949c586fb6eda3e2")
CORS(app, origins='http://localhost:3000', methods=['GET', 'POST', 'OPTIONS'])

if __name__ == "__main__":
    app.run(debug=True)

@app.route('/Profile')
@auth.require_user
def profile():
     return {"email": current_user.email}
    # try:
        # authorized_data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        # email = authorized_data.get('email')
        # token = request.headers.get('Authorization')
        # try:
        #     decoded_token = decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        #     email = decoded_token.get('email')
        #     print(email)
        # except InvalidTokenError:
        #     return jsonify({'error': 'Invalid token'}), 401

        # print("authorization email:", email)
        # user = users.find_one({"email": email})
        #
        # print(user)

        # return "Email from Authorization" + userEmail

    #     if current_user:
    #         return jsonify({
    #             'name': current_user['full_name'],
    #             'email': current_user['email'],
    #             'province': current_user.get('province', ''),
    #             'city': current_user.get('city', ''),
    #             'num': current_user.get('num', ''),
    #             'num2': current_user.get('num2', ''),
    #             'key': current_user.get('key', ''),
    #             'address': current_user.get('address', ''),
    #             'selectedFile': current_user.get('selectedFile', '')
    #         }), 200
    #     else:
    #         return jsonify({'error': 'User not found'}), 404

    # except Exception as e:
    #     print(e)
    #     return jsonify({'error': 'Internal server error'}), 500