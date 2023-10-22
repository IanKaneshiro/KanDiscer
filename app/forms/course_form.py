from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, FloatField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError


class CourseForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    location_name = StringField('location_name', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    headline = StringField('headline')
    description = TextAreaField('description')
    course_contact = StringField('course_contact')
    course_website = StringField('course_website')
    year_established = IntegerField('year_established')
    hole_count = IntegerField('hole_count', validators=[DataRequired()])
    tee_types = StringField('tee_types')
    target_types = StringField('target_types')
    cost = FloatField('cost')
    approved = BooleanField('approved')
