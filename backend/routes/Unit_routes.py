from flask import Blueprint, request

unit_routes = Blueprint('unit_routes', __name__)

@unit_routes.route("/", methods=[])
def method_name():
    pass