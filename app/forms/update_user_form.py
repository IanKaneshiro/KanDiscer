from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from ..models import User
from flask_login import current_user


def username_taken(form, field):
    # Checking if user exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and current_user.id != user.id:
        raise ValidationError('Username already in use')


def email_taken(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user and current_user.id != user.id:
        raise ValidationError('Email already in use')


def pdga_number_taken(form, field):
    # Checking if user exists
    pdga_number = field.data
    user = User.query.filter(User.pdga_number == pdga_number).first()
    if user and current_user.id != user.id:
        raise ValidationError('PDGA number already taken')


class UpdateUserForm(FlaskForm):
    first_name = StringField('first_name')
    last_name = StringField('last_name')
    email = StringField('email', validators=[Email(), email_taken])
    username = StringField('username', validators=[username_taken])
    image_url = StringField('image_url')
    pdga_number = IntegerField('pdga_number', validators=[
                               pdga_number_taken])
    skill_level = StringField('skill_level')
    throwing_preference = StringField('throwing_preference')
    admin = BooleanField('admin')
