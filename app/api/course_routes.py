from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Course, db, Teepad, CourseImage
from app.forms import CourseForm, TeepadForm, CourseImageForm
from .auth_routes import validation_errors_to_error_messages

course_routes = Blueprint('courses', __name__)


@course_routes.route('/')
def all_courses():
    """
    Returns all courses
    """
    courses = Course.query.filter_by(
        approved=True).order_by(Course.created_at.desc()).all()
    return {"Courses": [course.to_dict() for course in courses]}


@course_routes.route('/awaiting_approval')
def courses_awaiting_approval():
    """
    Returns all courses with the admin status of false
    """
    courses = Course.query.filter_by(approved=False).all()
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
            course.name = form.data['name']
            course.location_name = form.data['location_name']
            course.lat = form.data['lat']
            course.lng = form.data['lng']
            course.headline = form.data['headline']
            course.description = form.data['description']
            course.course_contact = form.data['course_contact']
            course.course_website = form.data['course_website']
            course.year_established = form.data['year_established']
            course.hole_count = form.data['hole_count']
            course.tee_types = form.data['tee_types']
            course.target_types = form.data['target_types']
            course.cost = form.data['cost']
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

# ------------------- Teepads ------------------------


@course_routes.route('/<int:course_id>/teepad/new', methods=["POST"])
def create_teepad(course_id):
    """
    create a new teepad for course by id
    """

    form = TeepadForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    course = Course.query.get(course_id)

    if not course:
        return {"message": "Course doesn't exist"}, 404

    if course.owner_id != current_user.id:
        return {'message': "You don't have authorization to create a teepad for this course"}, 403

    if form.validate_on_submit():
        teepad = Teepad(
            course_id=course.id,
            hole_number=form.data['hole_number'],
            lat=form.data['lat'],
            lng=form.data['lng'],
        )
        db.session.add(teepad)
        db.session.commit()
        return teepad.to_dict()
    return validation_errors_to_error_messages(form.errors), 400


@course_routes.route('/<int:course_id>/teepads')
def get_courses_teepads(course_id):
    """
    Get all teepads by course id
    """
    course = Course.query.get(course_id)

    if not course:
        return {"message": "Course couldn't be found"}, 404
    if not course.teepads:
        return {"message": "Course has no teepads yet"}, 404
    return {"Teepads": [teepad.to_dict() for teepad in course.teepads]}

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
