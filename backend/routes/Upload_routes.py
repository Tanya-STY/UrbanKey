# routes/upload_routes.py
from flask import Blueprint, request, flash, redirect, render_template_string, jsonify, make_response
from config import fs
from flask_cors import cross_origin
from werkzeug.utils import secure_filename
from middleware.TokenAuth import token_required
from config import units, fs, db
# from controllers.Uploads import send_renterpic
from bson import ObjectId
import base64


upload_routes = Blueprint('upload_routes', __name__)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

form_html = '''
        <html>

        <head>
            <title>Python Flask Upload multiple images and display multiple images uploaded</title>
        </head>

        <body>
            <div style="padding:20px;">
                <h2>Python Flask Upload multiple images and display multiple images uploaded</h2>
                <p>
                    {% with messages = get_flashed_messages() %}
                    {% if messages %}
                <ul class=flashes>
                    {% for message in messages %}
                    <li>{{ message }}</li>
                    {% endfor %}
                </ul>
                {% endif %}
                {% endwith %}
                </p>
                <form method="post" action="/unitspic" enctype="multipart/form-data">
                    <dl>
                        <p>
                            <input type="file" name="files[]" multiple="true" autocomplete="off" required>
                        </p>
                    </dl>
                    <p>
                        <input type="submit" value="Submit">
                    </p>
                </form>

                {% if filenames %}
                {% for filename in filenames %}
                <div style="padding:20px;float:left;">
                    <img width="500" src="{{ url_for('display_image', filename=filename) }}">
                </div>
                {% endfor %}
                {% endif %}

                {% if image_urls %}
                {% for url in image_urls %}
                <div style="padding:20px;float:left;">
                    <img src="{{ url }}" width="500">
                </div>
                {% endfor %}
                {% endif %}
            </div>
        </body>

        </html>
    '''

@upload_routes.route('/unitspic')
def index():
    # uploaded_images = fs.list()
    # filenames = [image.filename for image in uploaded_images]
    # print(filenames)
    return render_template_string(form_html)

@upload_routes.route('/unitspic', methods=['POST'])
def upload_image():
    if 'files[]' not in request.files:
        flash('No file part')
        return redirect(request.url)
    files = request.files.getlist('files[]')
    file_ids = []
    for file in files:
        if file and allowed_file(file.filename):
                # Save image to MongoDB using GridFS
            unit_id = 'U002'
            file_id = fs.put(file.stream, filename=secure_filename(file.filename), unit_id=unit_id)
            file_ids.append(str(file_id))
        else:
            flash('Allowed image types are -> png, jpg, jpeg, gif')
            return redirect(request.url)

    return render_template_string(form_html, file_ids=file_ids)


@upload_routes.route('/images/<file_id>')
def file(file_id):
    file_object = fs.get(ObjectId(file_id))
    response = make_response(file_object.read())
    response.headers['Content-Type'] = 'image/jpeg'  # Adjust content type based on file type
    return response

@upload_routes.route('/api/images/', methods=['OPTIONS'])
def handle_options():
    response = jsonify({'message': 'CORS preflight request successful'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response, 200

@upload_routes.route('/api/images/<unit_id>', methods=['GET'])
def get_unit_images(unit_id):
    try:
        print(unit_id)
        # Find images associated with the specified unit_id
        unit_images = fs.find({'unit_id': unit_id})
        # Extract image URLs from the images
        image_urls = [f'http://localhost:5000/images/{str(image._id)}' for image in unit_images]
        print(image_urls)
        return jsonify(image_urls)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
