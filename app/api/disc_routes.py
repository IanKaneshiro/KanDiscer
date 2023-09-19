from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Disc, db
from .route_utils import admin_required
from app.forms import DiscForm
from .auth_routes import validation_errors_to_error_messages

disc_routes = Blueprint('discs', __name__)


@disc_routes.route('/')
def all_disc():
    """
    Returns all discs
    """
    discs = Disc.query.filter_by(
        approved=True).all()
    return {"Discs": [disc.to_dict() for disc in discs]}


@disc_routes.route('/awaiting_approval')
def discs_awaiting_approval():
    """
    Returns all discs with the admin status of false
    """
    discs = Disc.query.filter_by(approved=False).all()
    return {"Discs": [disc.to_dict() for disc in discs]}


@disc_routes.route('/<int:id>')
def disc_by_id(id):
    """
    Get disc by id
    """
    disc = Disc.query.get(id)
    if not disc:
        return {"message": "Disc couldn't be found"}, 404
    return disc.to_dict()


@disc_routes.route('/new', methods=['POST'])
@login_required
def create_disc():
    """
    Create a new disc
    if user is admin, disc get approved upon creation
    """
    form = DiscForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        disc = Disc(
            manufacture=form.data['manufacture'],
            name=form.data['name'],
            description=form.data['description'],
            type=form.data['type'],
            purchase_link=form.data['purchase_link'],
            plastics=form.data['plastics'],
            speed=form.data['speed'],
            glide=form.data['glide'],
            turn=form.data['turn'],
            fade=form.data['fade'],
            diameter=form.data['diameter'],
            height=form.data['height'],
            rim_depth=form.data['rim_depth'],
            rim_width=form.data['rim_width'],
            image_url=form.data['image_url']
        )
        if current_user.admin:
            disc.approved = True
        db.session.add(disc)
        db.session.commit()
        return disc.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


@disc_routes.route('/<int:id>', methods=['PUT'])
@login_required
@admin_required
def update_disc(id):
    """
    Update a disc by id
    """
    form = DiscForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    disc = Disc.query.get(id)
    if not disc:
        return {"message": "Disc doesn't exist"}, 404

    if form.validate_on_submit():
        disc.manufacture = form.data['manufacture']
        disc.name = form.data['name']
        disc.description = form.data['description']
        disc.type = form.data['type']
        disc.purchase_link = form.data['purchase_link']
        disc.plastics = form.data['plastics']
        disc.speed = form.data['speed']
        disc.glide = form.data['glide']
        disc.turn = form.data['turn']
        disc.fade = form.data['fade']
        disc.diameter = form.data['diameter']
        disc.height = form.data['height']
        disc.rim_depth = form.data['rim_depth']
        disc.rim_width = form.data['rim_width']
        disc.image_url = form.data['image_url']
        if current_user.admin:
            disc.approved = True
        db.session.commit()
        return disc.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@disc_routes.route('/<int:id>', methods=['DELETE'])
@login_required
@admin_required
def delete_discs(id):
    """
    Delete disc by id
    """
    disc = Disc.query.get(id)

    if not disc:
        return {'message': "Disc couldn't be found"}, 404
    db.session.delete(disc)
    db.session.commit()
    return {'message': 'Successfully deleted'}
