from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Bag, db, BaggedDisc
from .route_utils import admin_required
from app.forms import BaggedDiscForm
from .auth_routes import validation_errors_to_error_messages

bagged_disc_routes = Blueprint('bagged_discs', __name__)


@bagged_disc_routes.route('/<int:id>')
@login_required
def bagged_disc_by_id(id):
    """
    Get bagged disc by id
    """
    bagged_disc = BaggedDisc.query.get(id)
    if not bagged_disc:
        return {"message": "Bagged disc couldn't be found"}, 404
    return bagged_disc.to_dict()


@bagged_disc_routes.route('/new', methods=['POST'])
@login_required
def create_bagged_disc():
    """
    Create a new bagged disc
    """
    form = BaggedDisc()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        bagged_disc = BaggedDisc(
            weight=form.data['weight'],
            color=form.data['color'],
            plastic=form.data['plastic'],
            image_url=form.data['image_url'],
        )

        db.session.add(bagged_disc)
        db.session.commit()
        return bagged_disc.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


@bagged_disc_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_bagged_disc(id):
    """
    Update a bagged disc by id
    """
    form = BaggedDisc()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    bagged_disc = BaggedDisc.query.get(id)

    if not bagged_disc:
        return {"message": "Bagged disc doesn't exist"}, 404

    if form.validate_on_submit():
        bagged_disc.weight = form.data['weight']
        bagged_disc.color = form.data['color']
        bagged_disc.plastic = form.data['plastic']
        bagged_disc.image_url = form.data['image_url']
        db.session.commit()
        return bagged_disc.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@bagged_disc_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_bag(id):
    """
    Delete bag by id
    """

    bag = Bag.query.get(id)

    if bag.owner_id != current_user.id:
        return {'message': "You don't have permisson to delete this bag"}, 403

    if not bag:
        return {'message': "Bag couldn't be found"}, 404
    db.session.delete(bag)
    db.session.commit()
    return {'message': 'Successfully deleted'}
