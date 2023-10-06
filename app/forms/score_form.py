from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError


class ScoreForm(FlaskForm):
    hole_number = IntegerField('hole_number', validators=[DataRequired()])
    score = IntegerField('score', validators=[DataRequired()])
