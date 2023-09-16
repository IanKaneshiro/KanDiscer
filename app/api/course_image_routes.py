from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Course, CourseImage
from .route_utils import admin_required
from app.forms import CourseImageForm
from .auth_routes import validation_errors_to_error_messages

course_image_routes = Blueprint('course_images', __name__)


@course_image_routes.route('/<int:id>')
def get_image_by_id(id):
    """
    Get all images for course by course id
    """
    img = CourseImage.query.get(id)

    if not img:
        return {"message": "Image couldn't be found"}, 404

    return img.to_dict()


@course_image_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_image_by_id(id):
    """
    Update a couse image by id
    """
    form = CourseImageForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    img = CourseImage.query.get(id)

    if not img:
        return {"message": "Image couldn't be found"}, 404

    if img.owner_id != current_user.id:
        return {'message': "You are not authorized to edit this image"}, 403

    if form.validate_on_submit():
        img.url = form.data['url']
        img.preview = form.data['preview']

        db.session.commit()
        return img.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@course_image_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_course_image(id):
    """
    Delete image by id
    """

    img = CourseImage.query.get(id)
    if not img:
        return {'message': "Course image couldn't be found"}, 404

    if img.owner_id != current_user.id:
        return {'message': "You don't have authorization to delete this image"}, 403

    db.session.delete(img)
    db.session.commit()
    return {'message': 'Successfully deleted'}
