from flask import Blueprint, request, jsonify, render_template_string
from controllers.Auth import signup, signin, refreshToken, handle_logout #controllers handle incoming requests and they return reponses

auth_routes = Blueprint('auth_routes', __name__) #create blueprint definition

index_html = '''
        <html>

        <head>
            <title>Backend Server</title>
        </head>

        <body>
        <div style="padding:20px;">
                <h2>Welcome to the backend</h2>
        </div>

        </body>

        </html>
    '''

@auth_routes.route("/")
def index_route():

    return render_template_string(index_html)

@auth_routes.route("/SignUp", methods=['POST']) #auth_routes decorator defines the signup route with the HTTP request
def signup_route():
    
    return signup(request) #function in controllers
     

@auth_routes.route("/Login", methods=['POST'])
def signin_route():

    return signin(request)

@auth_routes.route('/Refresh', methods=['GET'])
def refresh_route():

    return refreshToken(request)

@auth_routes.route('/Logout')
def logout_route():

    return handle_logout(request)