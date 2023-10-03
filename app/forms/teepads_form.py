from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


class TeepadForm(FlaskForm):
    hole_number = IntegerField('hole_number', validators=[DataRequired()])
    lat = FloatField('lat', validators=[DataRequired()])
    lng = FloatField('lng', validators=[DataRequired()])
