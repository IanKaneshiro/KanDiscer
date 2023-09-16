from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Bag, db, BaggedDisc
from .route_utils import admin_required
from app.forms import BagForm, BaggedDiscForm
from .auth_routes import validation_errors_to_error_messages

bag_routes = Blueprint('bags', __name__)


@bag_routes.route('/')
@login_required
def users_bags():
    """
    Returns bags that belong to current user
    """
    bags = Bag.query.filter(Bag.owner_id == current_user.id).all()
    if not bags:
        return {"message": "You have no bags yet"}, 404
    return {"Bags": [bag.to_dict() for bag in bags]}


@bag_routes.route('/<int:id>')
@login_required
def bag_by_id(id):
    """
    Get bag by id
    """
    bag = Bag.query.get(id)
    if not bag:
        return {"message": "Bag couldn't be found"}, 404
    return bag.to_dict()

# Create


@bag_routes.route('/new', methods=['POST'])
@login_required
def create_bag():
    """
    Create a new bag
    """
    form = BagForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        bag = Bag(
            owner_id=current_user.id,
            name=form.data['name'],
            description=form.data['description'],
            notes=form.data['notes'],
        )

        db.session.add(bag)
        db.session.commit()
        return bag.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


@bag_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_bag(id):
    """
    Update a bag by id
    """
    form = BagForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    bag = Bag.query.get(id)

    if bag.owner_id != current_user.id:
        return {'message': "You don't have permisson to update this bag"}, 403

    if not bag:
        return {"message": "Bag doesn't exist"}, 404

    if form.validate_on_submit():
        bag.name = form.data['name']
        bag.description = form.data['description']
        bag.notes = form.data['notes']
        db.session.commit()
        return bag.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@bag_routes.route('/<int:id>', methods=['DELETE'])
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

# -------------------------- Bagged Discs ----------------------------


@bag_routes.route('/<int:id>/bagged_discs')
@login_required
def users_bagged_discs(id):
    """
    Returns discs in current users bag
    """
    bagged_discs = BaggedDisc.query.filter(
        BaggedDisc.bag_id == id).all()
    if not bagged_discs:
        return {"message": "You have no discs in your bag yet"}, 404
    return {"BaggedDiscs": [disc.to_dict() for disc in bagged_discs]}


@bag_routes.route('/<int:bag_id>/discs/<int:disc_id>/bagged_discs/new', methods=['POST'])
@login_required
def create_bagged_disc(bag_id, disc_id):
    """
    Create a new bagged disc
    """
    form = BaggedDiscForm()
    bag = Bag.query.get(bag_id)
    if bag.owner_id != current_user.id:
        return {'message': "You don't have authorization to add to this bag"}, 403
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        bagged_disc = BaggedDisc(
            bag_id=bag_id,
            disc_id=disc_id,
            weight=form.data['weight'],
            color=form.data['color'],
            plastic=form.data['plastic'],
            image_url=form.data['image_url'],
        )

        db.session.add(bagged_disc)
        db.session.commit()
        return bagged_disc.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400
