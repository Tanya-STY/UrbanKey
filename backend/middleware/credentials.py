from flask import request

# List of allowed origins
allowed_origins = ['http://example.com', 'http://localhost:3000']

def credentials_middleware(app):
    def middleware_function():
        origin = request.headers.get('Origin')
        if origin in allowed_origins:
            # Set Access-Control-Allow-Credentials header
            response = app.make_response('')
            response.headers['Access-Control-Allow-Origin'] = origin
            response.headers['Access-Control-Allow-Headers'] =  'Content-Type'
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response
    return middleware_function