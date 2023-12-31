from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Teepad(db.Model):
    __tablename__ = 'teepads'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('courses.id')), nullable=False)
    hole_number = db.Column(db.Integer, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    baskets = db.relationship(
        'Basket', back_populates='teepad',  cascade='all, delete-orphan')
    course = db.relationship('Course', back_populates='teepads')

    def to_dict(self):
        return {
            'id': self.id,
            'holeNumber': self.hole_number,
            'lat': self.lat,
            'lng': self.lng,
            'baskets': [basket.to_dict() for basket in self.baskets],
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
