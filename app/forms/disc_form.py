from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError


class DiscForm(FlaskForm):
    manufacture = StringField('manufacture', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description')
    type = StringField('type', validators=[DataRequired()])
    purchase_link = StringField('purchase_link')
    plastics = StringField('plastics', validators=[DataRequired()])
    speed = IntegerField('speed', validators=[DataRequired()])
    glide = IntegerField('glide', validators=[DataRequired()])
    turn = FloatField('turn')
    fade = FloatField('fade', validators=[DataRequired()])
    diameter = FloatField('diameter')
    height = FloatField('height')
    rim_depth = FloatField('rim_depth')
    rim_width = FloatField('rim_width')
    image_url = StringField('image_url')
    approved = BooleanField('approved')
