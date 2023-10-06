from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Score(db.Model):
    __tablename__ = 'scores'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    round_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('rounds.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    hole_number = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    round = db.relationship('Round', back_populates='scores', uselist=False)
    user = db.relationship('User', back_populates='scores')

    def to_dict(self):
        return {
            'id': self.id,
            "roundId": self.round_id,
            "userId": self.user_id,
            "holeNumber": self.hole_number,
            "score": self.score,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
