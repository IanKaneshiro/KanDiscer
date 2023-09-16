from flask_wtf import FlaskForm
from wtforms import FloatField, StringField
from wtforms.validators import DataRequired, ValidationError


class BaggedDiscForm(FlaskForm):
    weight = FloatField('weight')
    color = StringField('color')
    plastic = StringField('plastic')
    image_url = StringField('image_url')
