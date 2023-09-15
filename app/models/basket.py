from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Basket(db.Model):
    __tablename__ = 'baskets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('courses.id')), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    distance = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.String)
    par = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'lat': self.lat,
            'lng': self.lng,
            'distance': self.distance,
            'notes': self.notes,
            'par': self.par,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
