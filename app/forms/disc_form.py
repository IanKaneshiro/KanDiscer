from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError, NumberRange
from flask_wtf.file import FileField, FileAllowed
from app.api.aws import ALLOWED_EXTENSIONS
import re


class DiscForm(FlaskForm):
    manufacturer = StringField('manufacturer', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    type = StringField('type', validators=[DataRequired()])
    purchase_link = StringField('purchase_link')
    plastics = StringField('plastics', validators=[DataRequired()])
    speed = IntegerField('speed', validators=[NumberRange(1, 15)])
    glide = IntegerField('glide', validators=[NumberRange(1, 7)])
    turn = FloatField('turn', validators=[NumberRange(-5, 2)])
    fade = FloatField('fade', validators=[NumberRange(0, 6)])
    diameter = FloatField('diameter')
    height = FloatField('height')
    rim_depth = FloatField('rim_depth')
    rim_width = FloatField('rim_width')
    image_url = FileField("Image File", validators=[
                          FileAllowed(list(ALLOWED_EXTENSIONS))])
    approved = BooleanField('approved')
