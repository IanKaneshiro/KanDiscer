from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class CourseImage(db.Model):
    __tablename__ = 'course_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    course_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('courses.id')), nullable=False)
    url = db.Column(db.String, nullable=False)
    preview = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    owner = db.relationship('User', back_populates='images')
    course = db.relationship('Course', back_populates='images')

    def to_dict(self):
        return {
            'id': self.id,
            'url': self.url,
            'preview': self.preview,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
