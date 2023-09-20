from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Disc(db.Model):
    __tablename__ = 'discs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    manufacturer = db.Column(db.String(40), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    type = db.Column(db.String(50), nullable=False)
    purchase_link = db.Column(db.String)
    plastics = db.Column(db.Text)
    speed = db.Column(db.Integer, nullable=False)
    glide = db.Column(db.Integer, nullable=False)
    turn = db.Column(db.Float, nullable=False)
    fade = db.Column(db.Float, nullable=False)
    diameter = db.Column(db.Float)
    height = db.Column(db.Float)
    rim_depth = db.Column(db.Float)
    rim_width = db.Column(db.Float)
    image_url = db.Column(db.String)
    approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    bagged_disc = db.relationship(
        'BaggedDisc', back_populates='disc', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'manufacturer': self.manufacturer,
            'name': self.name,
            'description': self.description,
            'type': self.type,
            'purchaseLink': self.purchase_link,
            'plastics': self.plastics,
            'speed': self.speed,
            'glide': self.glide,
            'turn': self.turn,
            'fade': self.fade,
            'diameter': self.diameter,
            'height': self.height,
            'rimDepth': self.rim_depth,
            'rimWidth': self.rim_width,
            "imageUrl": self.image_url,
            'approved': self.approved,
        }
