from flask import Blueprint, request
from controllers.Finance import get_financial_status, update_financial_status, update_financial_cost
from middleware.TokenAuth import token_required

financial_routes = Blueprint('financial_routes', __name__)

@financial_routes.route("/financial_status", methods=['GET'])
@token_required
def get_financial_status_route():
    return get_financial_status(request)

@financial_routes.route("/update_financial_status", methods=['POST'])
@token_required
def update_financial_status_route():
    return update_financial_status(request)

@financial_routes.route("/update_financial_cost", methods=['POST'])
@token_required
def update_financial_status_cost_route():
    return update_financial_cost(request)
