from flask.cli import AppGroup
from .users import seed_users, undo_users
from .discs import seed_discs, undo_discs
from .bags import seed_bags, undo_bags
from .bagged_discs import seed_bagged_discs, undo_bagged_discs
from .courses import seed_courses, undo_courses
from .baskets import seed_baskets, undo_baskets
from .course_images import seed_course_images, undo_course_images
from .teepads import seed_teepads, undo_teepads

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_discs()
        undo_bags()
        undo_bagged_discs()
        undo_courses()
        undo_teepads()
        undo_baskets()
        undo_course_images()
    seed_users()
    seed_discs()
    seed_bags()
    seed_bagged_discs()
    seed_courses()
    seed_teepads()
    seed_baskets()
    seed_course_images()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_discs()
    undo_bags()
    undo_bagged_discs()
    undo_courses()
    undo_teepads()
    undo_baskets()
    undo_course_images()
    # Add other undo functions here
