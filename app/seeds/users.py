from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name='Demo', last_name='Man', username='Demo', email='demo@aa.io', pdga_number=123456, skill_level='amateur', throwing_preference='right-hand backhand', admin=True, password='password')
    Paul = User(
        first_name='Paul', last_name='Mcbeth', username='goat', email='goat@discgolf.io', pdga_number=12345, skill_level='pro', throwing_preference='right-hand, backhand', admin=False,  password='password')
    Kristen = User(
        first_name='Kristen', last_name='Tattar', username='champion', email='champion@discgolf.io', pdga_number=54342, skill_level='pro', throwing_preference='right-hand, backhand', admin=True,  password='password')

    db.session.add(demo)
    db.session.add(Paul)
    db.session.add(Kristen)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
