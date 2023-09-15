from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, ValidationError


class CourseImageForm(FlaskForm):
    url = StringField('url', validators=[DataRequired()])
    preview = BooleanField('boolean')
