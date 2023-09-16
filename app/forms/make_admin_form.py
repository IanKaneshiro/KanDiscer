from flask_wtf import FlaskForm
from wtforms import BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from ..models import User
from flask_login import current_user


class MakeAdminForm(FlaskForm):
    admin = BooleanField('admin')
