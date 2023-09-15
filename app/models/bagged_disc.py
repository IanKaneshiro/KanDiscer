from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BaggedDisc(db.Model):
    __tablename__ = 'bagged_disc'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bag_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('bags.id')), nullable=False)
    disc_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('discs.id')), nullable=False)
    weight = db.Column(db.Float)
    color = db.Column(db.String(50))
    plastic = db.Column(db.String(50))
    image_url = db.Column(db.String)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'notes': self.notes,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
