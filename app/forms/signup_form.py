from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


def pdga_number_exists(form, field):
    # Checking if the pdga number is already in use
    pdga_number = field.data
    user = User.query.filter(User.pdga_number == pdga_number).first()
    if user:
        raise ValidationError('PDGA number is already in use.')


class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    email = StringField('email', validators=[
                        DataRequired(), Email(), user_exists])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    image_url = FileField("Image File", validators=[
                          FileAllowed(list(ALLOWED_EXTENSIONS))])
    pdga_number = StringField('pdga_number', validators=[pdga_number_exists])
    skill_level = StringField('skill_level')
    throwing_preference = StringField('throwing_preference')
    password = StringField('password', validators=[DataRequired()])
