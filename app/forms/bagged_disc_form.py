from flask_wtf import FlaskForm
from wtforms import FloatField, StringField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.api.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, ValidationError


class BaggedDiscForm(FlaskForm):
    weight = FloatField('weight')
    color = StringField('color')
    plastic = StringField('plastic')
    image_url = FileField("Image File", validators=[
        FileAllowed(list(ALLOWED_EXTENSIONS))])
