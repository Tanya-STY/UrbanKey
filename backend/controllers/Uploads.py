from flask import jsonify, make_response, request
from config import units, fs
from bson import ObjectId

def send_renterpic(request):
    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = make_response()
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'GET'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type', 'Origin'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    elif request.method == 'GET':
        # response.headers['Access-Control-Allow-Origin'] = '*'
        email = request.email
        unit = units.find_one({'occupant.email': email})
        print(unit)

        if unit:
            file_metadata = fs.files.find_one({'_id': ObjectId(file_id)})
            if file_metadata:
                unit_id = unit.get('unit_id')
                unit_pictures = list(fs.find({'unit_id': unit_id}))
                image_urls = []
                for image_doc in unit_pictures:
                    # Find corresponding binary data in fs.chunks collection
                    chunks_doc = fs.find_one({"files_id": ObjectId(str(image_doc._id))})
                    if chunks_doc:
                        # Construct image URL (assuming base64 encoded binary data)
                        image_data_base64 = chunks_doc["data"].decode("utf-8")
                        image_url = f"data:image/jpeg;base64,{image_data_base64}"
                        image_urls.append(image_url)

            # Create a response object
            response = jsonify(image_urls)
            response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
            response.headers['Access-Control-Allow-Credentials'] = 'true'
            return response
        
        # If no unit found, return an empty response with CORS headers
        response = jsonify([])
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response