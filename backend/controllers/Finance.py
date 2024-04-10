# from flask import jsonify, make_response, Blueprint, request
# from config import users
# from middleware.TokenAuth import token_required

# financial_routes = Blueprint('financial_routes', __name__)

# @financial_routes.route("/financial_status", methods=['GET'])
# @token_required
# def get_financial_status(current_user):
#     try:
#         user_email = current_user['email']
#         fee_per_square_foot = float(request.args.get('fee_per_square_foot'))
#         fee_per_parking_spot = float(request.args.get('fee_per_parking_spot'))
#         operation_name = request.args.get('operation_name')
#         cost = float(request.args.get('cost'))

#         # Assuming 'users' is a collection in your database
#         user_info = users.find_one({"email": user_email})

#         if user_info:
#             # Use user_info to calculate financial status
#             financial_status = fee_per_square_foot * fee_per_parking_spot * cost

#             return jsonify({
#                 'user_id': user_info['_id'],
#                 'email': user_info['email'],
#                 'financial_status': financial_status
#             }), 200
#         else:
#             return jsonify({'error': 'User not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal server error'}), 500

# @financial_routes.route("/update_financial_status", methods=['POST'])
# @token_required
# def update_financial_status(current_user):
#     try:
#         data = request.get_json()
#         user_email = current_user['email']
#         fee_per_square_foot = float(data.get('fee_per_square_foot'))
#         fee_per_parking_spot = float(data.get('fee_per_parking_spot'))
#         operation_name = data.get('operation_name')
#         cost = float(data.get('cost'))

#         # Assuming 'users' is a collection in your database
#         user_info = users.find_one({"email": user_email})

#         if user_info:
#             # Use user_info to update financial status
#             updated_financial_status = fee_per_square_foot * fee_per_parking_spot * cost

#             return jsonify({
#                 'user_id': user_info['_id'],
#                 'email': user_info['email'],
#                 'updated_financial_status': updated_financial_status
#             }), 200
#         else:
#             return jsonify({'error': 'User not found'}), 404
#     except Exception as e:
#         print(e)
#         return jsonify({'error': 'Internal server error'}), 500
