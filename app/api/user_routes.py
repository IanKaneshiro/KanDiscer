from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import User, db
from .route_utils import admin_required
from app.forms import UpdateUserForm, MakeAdminForm
from .auth_routes import validation_errors_to_error_messages

user_routes = Blueprint('users', __name__)


@user_routes.route('/all')
@login_required
def all_users():
    """
    Returns all users in database in desc order.
    """
    users = User.query.order_by(User.created_at.desc()).all()
    return {"Users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>/admin', methods=["PUT"])
@login_required
@admin_required
def make_user_admin(id):
    """
    Updates a user to be a admin
    """
    form = MakeAdminForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    user = User.query.get(id)
    if not user:
        return {"message": "User doesn't exist"}, 404

    if form.validate_on_submit():
        user.admin = form.data['admin']
        db.session.commit()
        return user.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    """
    Update a user by id
    """
    form = UpdateUserForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    user = User.query.get(id)
    if not user:
        return {"message": "User doesn't exist"}, 404
    if user.id != current_user.id:
        return {"message": "Can only edit your profile"}, 403

    if form.validate_on_submit():
        user.first_name = form.data['first_name']
        user.last_name = form.data['last_name']
        user.email = form.data['email']
        user.username = form.data['username']
        user.image_url = form.data['image_url']
        user.pdga_number = form.data['pdga_number']
        user.skill_level = form.data['skill_level']
        user.throwing_preference = form.data['throwing_preference']
        db.session.commit()
        return user.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@user_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_user(id):
    """
    Deletes a user by id
    """
    user = User.query.get(id)
    if not user:
        return {"message": "User doesn't exist"}, 404

    if user.id == current_user.id or current_user.admin and user.admin == False:
        db.session.delete(user)
        db.session.commit()
        return {'message': 'Successfully deleted'}
    else:
        return {'message': "You don't have permission to delete this user"}, 403
