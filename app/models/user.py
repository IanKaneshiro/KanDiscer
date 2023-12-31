from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    image_url = db.Column(db.String)
    pdga_number = db.Column(db.INTEGER, unique=True)
    skill_level = db.Column(db.String(40))
    throwing_preference = db.Column(db.String(40))
    admin = db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(
        db.DateTime, default=datetime.now(), onupdate=datetime.now())

    bags = db.relationship('Bag', back_populates='user',
                           cascade='all, delete-orphan')
    images = db.relationship('CourseImage', back_populates='owner')
    courses = db.relationship(
        'Course', back_populates='owner', cascade='all, delete-orphan')
    scores = db.relationship(
        'Score', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'username': self.username,
            'imageUrl': self.image_url,
            'pdgaNumber': self.pdga_number,
            'skillLevel': self.skill_level,
            'throwingPreference': self.throwing_preference,
            'admin': self.admin,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
