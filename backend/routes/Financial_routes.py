from flask import Blueprint

financial_routes = Blueprint('financial_routes', __name__)


@financial_routes.route("/", methods=[])
def methodname():
    pass