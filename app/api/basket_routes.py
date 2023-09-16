from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Course, Basket, db
from .route_utils import admin_required
from app.forms import BasketForm
from .auth_routes import validation_errors_to_error_messages

basket_routes = Blueprint('baskets', __name__)


@basket_routes.route('/<int:id>')
def basket_by_id(id):
    """
    Get basket by id
    """
    basket = Basket.query.get(id)
    if not basket:
        return {"message": "Basket couldn't be found"}, 404
    return basket.to_dict()


@basket_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_basket(id):
    """
    Update a basket by id
    """

    form = BasketForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    basket = Basket.query.get(id)

    if not basket:
        return {"message": "Basket doesn't exist"}, 404

    course = Course.query.get(int(basket.course_id))

    if course.owner_id != current_user.id and not current_user.admin:
        return {'message': "You don't have authorization to update this basket"}, 403

    if form.validate_on_submit():
        basket.lat = form.data['lat']
        basket.lng = form.data['lng']
        basket.distance = form.data['distance']
        basket.notes = form.data['notes']
        basket.par = form.data['par']
        db.session.commit()
        return basket.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@basket_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_basket(id):
    """
    Delete basket by id
    """

    basket = Basket.query.get(id)
    course = Course.query.get(int(basket.course_id))
    if not basket:
        return {'message': "Basket couldn't be found"}, 404

    if course.owner_id != current_user.id and not current_user.admin:
        return {'message': "You don't have authorization to delete this basket"}, 403

    db.session.delete(basket)
    db.session.commit()
    return {'message': 'Successfully deleted'}
