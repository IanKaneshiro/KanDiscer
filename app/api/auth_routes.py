from flask import Blueprint, request

from app.models import User, db

from app.forms import LoginForm
from app.forms import SignUpForm

from flask_login import current_user, login_user, logout_user

from sqlalchemy import or_
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)


auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = {}
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages[field] = error
    return {"errors": errorMessages}


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(or_(
            User.email == form.data['credential'], User.username == form.data['credential'])).first()
        login_user(user)
        return user.to_dict()
    return validation_errors_to_error_messages(form.errors), 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if form.data['image_url']:
            image = form.data['image_url']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            if "url" not in upload:
                return {'errors': validation_errors_to_error_messages(upload)}, 400
            url = upload["url"]
        else:
            url = None
        # React input defaults to zero if there is no user input.
        if form.data['pdga_number'] != 0:
            p_num = form.data['pdga_number']
        else:
            p_num = None
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            email=form.data['email'],
            username=form.data['username'],
            image_url=url,
            pdga_number=p_num,
            skill_level=form.data['skill_level'],
            throwing_preference=form.data['throwing_preference'],
            password=form.data['password'],
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict(), 201
    return validation_errors_to_error_messages(form.errors), 400


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
