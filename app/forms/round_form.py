from flask_wtf import FlaskForm
from wtforms import IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError


class RoundForm(FlaskForm):
    course_id = IntegerField('course_id', validators=[DataRequired()])
    end_time = DateTimeField('end_time', validators=[DataRequired()])
