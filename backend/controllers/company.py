from flask import jsonify, make_response, request
from config import units, fs
from bson import ObjectId


def get_property_info(request):
    data = request.get_json()
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
                "netM2": data.get('unitId'),
                "warmingType": data.get('warminType'),
                "buildingAge": data.get('buildingAge'),
                "floorLocation": data.get('floorlocation'),
                "availableForLoan": data.get('availableForLoan'),
                "furnished": data.get('furnished'),
                "parking": data.get('parking'),
                "parkingID": data.get('parkingID'),
                "locker": data.get('locker'),
                "rentalIncome": data.get('rentalIncome'),
                "province": data.get('province'),
                "city": data.get('city'),
                "neighborhood": data.get('neighborhood'),
                "file": '',

            }
        }
        units.update_one({'unit_id': unit_id}, update, upsert=False)

def get_unit_info(unitId):

    unit = units.find_one({'unit_id': unitId})
    print(unit)
    if unit:

        occupant_email = unit.get('occupant', {}).get('email', '')
       
        owner_email = ''
        if 'unit_owner' in unit and unit['unit_owner']:
            owner_email = unit['unit_owner'].get('email', '')
      

        return jsonify({
            'occupant': occupant_email,
            'owner': owner_email
        }), 200
    
    else:
        return jsonify({'error': 'Unit not found'}), 404
        