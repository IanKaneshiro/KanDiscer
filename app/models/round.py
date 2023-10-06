from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy import func


class Round(db.Model):
    __tablename__ = 'rounds'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    course_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('courses.id')), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.now())
    end_time = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    course = db.relationship('Course', back_populates='rounds', uselist=False)
    scores = db.relationship(
        'Score', back_populates='round', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            "courseId": self.course_id,
            "startTime": self.start_time,
            "endTime": self.end_time,
            "course": self.course.to_dict(),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
