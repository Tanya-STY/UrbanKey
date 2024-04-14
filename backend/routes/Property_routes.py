from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
from middleware.TokenAuth import token_required
from config import units, users, regkey, fs
from bson import ObjectId

property_routes = Blueprint('property_routes', __name__)


@property_routes.route("/propertyinfo", methods=['POST'])
@token_required
def property_route():
    data = request.get_json()
    print(data)
    unit_id = data.get('unitId')

    unit = units.find_one({'unit_id': unit_id})

    if unit:
        update= {
            '$set':{
                "category": data.get('category'),
                "title": data.get('title'),
                "description": data.get('description'),
                "price": data.get('price'),
                "numberOfRoom": data.get('numberOfRoom'),
                "grossM2": data.get('grossM2'),
                "netM2": data.get('netM2'),
                "warmingType": data.get('warmingType'),
                "buildingAge": data.get('buildingAge'),
                "floorLocation": data.get('floorLocation'),
                "availableForLoan": data.get('availableForLoan'),
                "furnished": data.get('furnished'),
                "parking": data.get('parking'),
                "parkingID": data.get('parkingID'),
                "locker": data.get('locker'),
                "rentalIncome": data.get('rentalIncome'),
                "province": data.get('province'),
                "city": data.get('city'),
                "neighborhood": data.get('neighborhood'),
                "interiorFeatures": data.get('interiorFeatures'),
                "exteriorFeatures": data.get('exteriorFeatures')
            }
        }
        units.update_one({'unit_id': unit_id}, update, upsert=False)

        return jsonify({'message': 'Unit updated successfully', 'unit_id': unit_id}), 200
    else:
        return jsonify({'error': 'Unit not found for the given registration key'}), 404

@property_routes.route("/unitInfo/<unitId>", methods=['GET'])
@token_required
def unitproperty_route(unitId):
    unit = units.find_one({'unit_id': unitId})
    print(unit)
    if unit:
        occupant_email = ''
        if 'occupant' in unit and unit['occupant']:
            occupant_email = unit.get('occupant', {}).get('email', '')
        owner_email = ''
        if 'unit_owner' in unit and unit['unit_owner']:
            owner_email = unit['unit_owner'].get('email', '')

        registration_key_renter_id = unit.get('registration_key_renter', '')
        if registration_key_renter_id:
            registration_key_renter = regkey.find_one({'_id': ObjectId(registration_key_renter_id)})
            if registration_key_renter:
                registration_key_renter_key = registration_key_renter.get('key_value', '')


        registration_key_owner_id = unit.get('registration_key_owner', '')
        if registration_key_owner_id:
            registration_key_owner = regkey.find_one({'_id': ObjectId(registration_key_owner_id)})
            if registration_key_owner:
                registration_key_owner_key = registration_key_owner.get('key_value', '')




        category = unit.get('category', '')  
        title = unit.get('title', '')  
        description = unit.get('description', '')  
        price = unit.get('price', '')  
        numberOfRoom = unit.get('numberOfRoom', '') 
        grossM2 = unit.get('grossM2', '')  
        netM2 = unit.get('netM2', '')  
        warmingType = unit.get('warmingType', '')  
        buildingAge = unit.get('buildingAge', '')  
        floorLocation = unit.get('floorLocation', '')  
        availableForLoan = unit.get('availableForLoan', '')  
        furnished = unit.get('furnished', '')  
        parking = unit.get('parking', '')  
        parkingID = unit.get('parkingID', '') 
        locker = unit.get('locker', '')  
        rentalIncome = unit.get('rentalIncome', '')  
        province = unit.get('province', '')  
        city = unit.get('city', '')  
        neighborhood = unit.get('neighborhood', '')
        interior = unit.get('interiorFeatures', []) 
        exterior = unit.get('exteriorFeatures', []) 

        print(interior)

        return jsonify({
            'occupant': occupant_email,
            'owner': owner_email,
            'category': category,
            'title': title,
            'description': description,
            'price': price,
            'numberOfRoom': numberOfRoom,
            'grossM2': grossM2,
            'netM2': netM2,
            'warmingType': warmingType,
            'buildingAge': buildingAge,
            'floorLocation': floorLocation,
            'availableForLoan': availableForLoan,
            'furnished': furnished,
            'parking': parking,
            'parkingID': parkingID,
            'locker': locker,
            'rentalIncome': rentalIncome,
            'province': province,
            'city': city,
            'neighborhood': neighborhood,
            'interior': interior,
            'exterior': exterior,
            'registration_key_renter': registration_key_renter_key,
            'registration_key_owner': registration_key_owner_key
        }), 200
    else:
        return jsonify({
            'error': 'Unit not found'
        }), 404
    
@property_routes.route('/upload', methods=['POST'])
def upload_file():
    unit_id = request.form['unitId']
    file = request.files['file']
    if file:
        filename = secure_filename(file.filename)
        file_id = fs.put(file.stream, filename=filename, unit_id=unit_id)
        return {'success': True, 'file_id': str(file_id)}
    else:
        return {'success': False, 'message': 'No file provided'}, 400
    
@property_routes.route('/send-registration-key', methods=['POST'])
def send_registration_key():
    data = request.json
    email = data.get('email')
    registration_key = data.get('key')

    # Check if the email and registration_key are provided
    if not email or not registration_key:
        return jsonify({'error': 'Email and registration_key are required'}), 400

    user = users.find_one({'email': email})

    if user:
        users.update_one({'email': email}, {'$set': {'new_registration_key': registration_key}})

    else:
        return jsonify({'error': 'No email found in the database'}), 404

    return jsonify({'message': 'Registration key sent successfully'}), 200

@property_routes.route('/check-new-registration-key', methods=['GET'])
@token_required
def check_registration_keys():
    email = request.email
    role = request.role

    user = users.find_one({'email': email})

     # Check if the user has a new registration key
    new_registration_key = user.get('new_registration_key')

    if new_registration_key:
        return jsonify({'has_new_registration_key': True, 'new_registration_key': new_registration_key}), 200
    else:
        return jsonify({'has_new_registration_key': False}), 200