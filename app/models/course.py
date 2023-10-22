from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Course(db.Model):
    __tablename__ = 'courses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String, nullable=False)
    location_name = db.Column(db.String)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)
    headline = db.Column(db.String)
    description = db.Column(db.Text)
    course_contact = db.Column(db.String)
    course_website = db.Column(db.String)
    year_established = db.Column(db.Integer)
    hole_count = db.Column(db.Integer, nullable=False)
    tee_types = db.Column(db.String)
    target_types = db.Column(db.String)
    cost = db.Column(db.Float)
    approved = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    teepads = db.relationship(
        'Teepad', back_populates='course', order_by="Teepad.hole_number", cascade='all, delete-orphan')
    images = db.relationship(
        'CourseImage', back_populates='course', cascade='all, delete-orphan')
    rounds = db.relationship(
        'Round', back_populates="course",  cascade='all, delete-orphan')
    owner = db.relationship('User', back_populates='courses')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'locationName': self.location_name,
            'lat': self.lat,
            'lng': self.lng,
            'headline': self.headline,
            'description': self.description,
            'courseContact': self.course_contact,
            'courseWebsite': self.course_website,
            'yearEstablished': self.year_established,
            'holeCount': self.hole_count,
            'teeTypes': self.tee_types,
            'targetTypes': self.target_types,
            'cost': self.cost,
            'approved': self.approved,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
            'teepads': [teepad.to_dict() for teepad in self.teepads],
            'owner': self.owner.to_dict(),
            'images': [image.to_dict() for image in self.images]
        }
