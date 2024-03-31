from flask import Blueprint

property_routes = Blueprint('property_routes', __name__)


@property_routes.route("/", methods=[])
def methodname():
    pass