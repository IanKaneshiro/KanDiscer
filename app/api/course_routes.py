from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Course, db, Basket, CourseImage
from .route_utils import admin_required
from app.forms import CourseForm, BasketForm, CourseImageForm
from .auth_routes import validation_errors_to_error_messages

course_routes = Blueprint('courses', __name__)


@course_routes.route('/')
def all_courses():
    """
    Returns all courses
    """
    courses = Course.query.all()
    return {"Courses": [course.to_dict() for course in courses]}


@course_routes.route('/<int:id>')
def course_by_id(id):
    """
    Get bag by id
    """
    course = Course.query.get(id)
    if not course:
        return {"message": "Course couldn't be found"}, 404
    return course.to_dict()

# Create


@course_routes.route('/new', methods=['POST'])
@login_required
def create_course():
    """
    Create a new course
    if user is admin, course get approved upon creation
    """
    form = CourseForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        course = Course(
            owner_id=current_user.id,
            name=form.data['name'],
            location_name=form.data['location_name'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            headline=form.data['headline'],
            description=form.data['description'],
            course_contact=form.data['course_contact'],
            course_website=form.data['course_website'],
            year_established=form.data['year_established'],
            hole_count=form.data['hole_count'],
            tee_types=form.data['tee_types'],
            target_types=form.data['target_types'],
            services=form.data['services'],
            cost=form.data['cost'],
        )
        if current_user.admin:
            course.approved = True
        db.session.add(course)
        db.session.commit()
        return course.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


@course_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_course(id):
    """
    updates a course
    if user is admin, course get approved upon updating
    """
    form = CourseForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    course = Course.query.get(id)

    if not course:
        return {"message": "Course couldn't be found"}, 404

    if course.owner_id == current_user.id or current_user.admin:
        if form.validate_on_submit():
            name = form.data['name']
            location_name = form.data['location_name']
            lat = form.data['lat']
            lng = form.data['lng']
            headline = form.data['headline']
            description = form.data['description']
            course_contact = form.data['course_contact']
            course_website = form.data['course_website']
            year_established = form.data['year_established']
            hole_count = form.data['hole_count']
            tee_types = form.data['tee_types']
            target_types = form.data['target_types']
            services = form.data['services']
            cost = form.data['cost']
            if current_user.admin:
                course.approved = True
            db.session.commit()
            return course.to_dict(), 201
        return validation_errors_to_error_messages(form.errors), 400
    return {'message': "You are not authorized to edit this course"}, 403


@course_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_course(id):
    """
    Delete course by id
    """

    course = Course.query.get(id)

    if not course:
        return {'message': "Course couldn't be found"}, 404

    if course.owner_id == current_user.id or current_user.admin:
        db.session.delete(course)
        db.session.commit()
        return {'message': 'Successfully deleted'}

    return {'message': "You don't have permisson to delete this course"}, 403

# ------------------- Baskets ------------------------


@course_routes.route('/<int:course_id>/baskets/new', methods=["POST"])
def create_basket(course_id):
    """
    create a new basket for course by id
    """

    form = BasketForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    course = Course.query.get(course_id)

    if not course:
        return {"message": "Course doesn't exist"}, 404

    if course.owner_id != current_user.id:
        return {'message': "You don't have authorization to create a basket for this course"}, 403

    if form.validate_on_submit():
        basket = Basket(
            course_id=course.id,
            hole_number=form.data['hole_number'],
            lat=form.data['lat'],
            lng=form.data['lng'],
            distance=form.data['distance'],
            notes=form.data['notes'],
            par=form.data['par'],
        )
        db.session.add(basket)
        db.session.commit()
        return basket.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@course_routes.route('/<int:course_id>/baskets')
def get_courses_baskets(course_id):
    """
    Get all baskets by course id
    """
    course = Course.query.get(course_id)

    if not course:
        return {"message": "Course couldn't be found"}, 404
    if not course.baskets:
        return {"message": "Course has no baskets yet"}, 404
    return {"Baskets": [basket.to_dict() for basket in course.baskets]}

# ------------------- Course Images ---------------------------


@course_routes.route('/<int:course_id>/images')
def get_course_images(course_id):
    """
    Get all images for course by course id
    """
    course = Course.query.get(course_id)

    if not course:
        return {"message": "Course couldn't be found"}, 404

    if not course.images:
        return {'message': 'Course has no images yet'}, 404

    return {"Images": [image.to_dict() for image in course.images]}


@course_routes.route('/<int:course_id>/images/new')
@login_required
def create_course_images(course_id):
    """
    Adds a new image to a course by id
    """
    course = Course.query.get(course_id)
    if not course:
        return {"message": "Course couldn't be found"}, 404

    form = CourseImageForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        img = CourseImage(
            course_id=course_id,
            owner_id=current_user.id,
            url=form.data['url'],
            preview=form.data['preview']
        )
        db.session.add(img)
        db.session.commit()
        return img.to_dict()
    return validation_errors_to_error_messages(form.errors), 400
