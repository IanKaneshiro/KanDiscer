from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Bag, db, BaggedDisc
from .route_utils import admin_required
from app.forms import BaggedDiscForm
from .auth_routes import validation_errors_to_error_messages
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)

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


@bagged_disc_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_bagged_disc(id):
    """
    Update a bagged disc by id
    """
    form = BaggedDiscForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    bagged_disc = BaggedDisc.query.get(id)

    if not bagged_disc:
        return {"message": "Bagged disc couldn't be found"}, 404

    if form.validate_on_submit():
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
        else:
            url = bagged_disc.image_url
        bagged_disc.weight = form.data['weight']
        bagged_disc.color = form.data['color']
        bagged_disc.plastic = form.data['plastic']
        bagged_disc.image_url = url
        db.session.commit()
        return bagged_disc.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@bagged_disc_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_bagged_disc(id):
    """
    Delete bagged by id
    """

    bagged_disc = BaggedDisc.query.get(id)
    bag = Bag.query.get(int(bagged_disc.bag_id))

    if bag.owner_id != current_user.id:
        return {'message': "You don't have permisson to delete this disc"}, 403

    if not bag:
        return {'message': "Bagged disc couldn't be found"}, 404
    db.session.delete(bagged_disc)
    db.session.commit()
    return {'message': 'Successfully deleted'}
