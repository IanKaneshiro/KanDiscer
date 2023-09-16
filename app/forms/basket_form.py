from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


class BasketForm(FlaskForm):
    hole_number = IntegerField('hole_number', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
    distance = IntegerField('distance', validators=[DataRequired()])
    notes = TextAreaField('notes')
    par = IntegerField('par', validators=[DataRequired()])
