from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Bag(db.Model):
    __tablename__ = 'bags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    user = db.relationship('User', back_populates='bags')
    discs = db.relationship(
        'BaggedDisc', back_populates='bag', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
