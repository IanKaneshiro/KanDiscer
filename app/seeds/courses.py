from app.models import db, Course, environment, SCHEMA
from sqlalchemy.sql import text


def seed_courses():
    course1 = Course(
        id=1,
        owner_id=1,
        name='Stewart Pond Disc Golf Course',
        location_name='Eugene, OR',
        lat=44.051067,
        lng=-123.152962,
        headline='A challenging 18-hole course',
        description='First 18 hole course on BLM land.',
        course_contact='stewart.pond.dgc@gmail.com',
        course_website='https://m.facebook.com/Stewart.Pond.DGC',
        year_established=2015,
        hole_count=18,
        tee_types='Concrete',
        target_types='DISCatchers Pro',
        services='dog friendly, cart friendly',
        cost=0,
        approved=True
    )

    db.session.add(course1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_courses():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.courses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM courses"))

    db.session.commit()
