from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Course, Teepad, db
from .route_utils import admin_required
from app.forms import TeepadForm
from .auth_routes import validation_errors_to_error_messages

teepad_routes = Blueprint('teepads', __name__)


@teepad_routes.route('/<int:id>')
def teepad_by_id(id):
    """
    Get teepad by id
    """
    teepad = Teepad.query.get(id)
    if not teepad:
        return {"message": "Teepad couldn't be found"}, 404
    return teepad.to_dict()


@teepad_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_teepad(id):
    """
    Update a teepad by id
    """

    form = TeepadForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    teepad = TeepadForm.query.get(id)

    if not teepad:
        return {"message": "Teepad couldn't be found"}, 404

    course = Course.query.get(int(teepad.course_id))

    if course.owner_id != current_user.id and not current_user.admin:
        return {'message': "You don't have authorization to update this teepad"}, 403

    if form.validate_on_submit():
        teepad.hole_number = form.data['hole_number']
        teepad.lat = form.data['lat']
        teepad.lng = form.data['lng']
        db.session.commit()
        return teepad.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@teepad_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_teepad(id):
    """
    Delete teepad by id
    """

    teepad = Teepad.query.get(id)
    course = Course.query.get(int(teepad.course_id))
    if not teepad:
        return {'message': "Teepad couldn't be found"}, 404

    if course.owner_id != current_user.id and not current_user.admin:
        return {'message': "You don't have authorization to delete this teepad"}, 403

    db.session.delete(teepad)
    db.session.commit()
    return {'message': 'Successfully deleted'}
