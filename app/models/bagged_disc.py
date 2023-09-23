from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BaggedDisc(db.Model):
    __tablename__ = 'bagged_discs'

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

    bag = db.relationship('Bag', back_populates='discs')
    disc = db.relationship('Disc', back_populates='bagged_disc')

    def to_dict(self):
        return {
            'id': self.id,
            'weight': self.weight,
            'color': self.color,
            'plastic': self.plastic,
            'imageUrl': self.image_url,
            'info': self.disc.to_dict(),
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
