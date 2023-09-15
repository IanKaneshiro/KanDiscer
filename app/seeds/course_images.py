from app.models import db, CourseImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_course_images():
    image1 = CourseImage(
        owner_id=1,
        course_id=1,
        url='https://d22ksth68ujgu2.cloudfront.net/16681522ae34dbb1e0ee2e5b9c367e97_m_IMG_7683.jpg',
        preview=True
    )

    db.session.add(image1)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_course_images():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM course_images"))

    db.session.commit()
