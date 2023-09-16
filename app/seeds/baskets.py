from app.models import db, Basket, environment, SCHEMA
from sqlalchemy.sql import text


def seed_baskets():
    basket1 = Basket(
        id=1,
        hole_number=1,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=297,
        par=3
    )

    basket2 = Basket(
        id=2,
        hole_number=2,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=318,
        par=3
    )

    basket3 = Basket(
        id=3,
        hole_number=3,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=302,
        par=3
    )

    basket4 = Basket(
        id=4,
        hole_number=4,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=405,
        notes="",
        par=3
    )

    basket5 = Basket(
        id=5,
        hole_number=5,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=620,
        par=4
    )

    basket6 = Basket(
        id=6,
        hole_number=6,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=286,
        par=3
    )

    basket7 = Basket(
        id=7,
        hole_number=7,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=405,
        par=3
    )

    basket8 = Basket(
        id=8,
        hole_number=8,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=321,
        par=3
    )

    basket9 = Basket(
        id=9,
        hole_number=9,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=299,
        par=3
    )

    basket10 = Basket(
        id=10,
        hole_number=10,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=397,
        par=3
    )

    basket11 = Basket(
        id=11,
        hole_number=11,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=372,
        par=3
    )

    basket12 = Basket(
        id=12,
        hole_number=12,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=254,
        par=3
    )

    basket13 = Basket(
        id=13,
        hole_number=13,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=699,
        par=4
    )

    basket14 = Basket(
        id=14,
        hole_number=14,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=333,
        par=3
    )

    basket15 = Basket(
        id=15,
        hole_number=15,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=415,
        par=3
    )

    basket16 = Basket(
        id=16,
        hole_number=16,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=384,
        par=4
    )

    basket17 = Basket(
        id=17,
        hole_number=17,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=236,
        par=3
    )

    basket18 = Basket(
        id=18,
        hole_number=18,
        course_id=1,
        lat=44.050948,
        lng=-123.091639,
        distance=514,
        par=3
    )

    db.session.add(basket1)
    db.session.add(basket2)
    db.session.add(basket3)
    db.session.add(basket4)
    db.session.add(basket5)
    db.session.add(basket6)
    db.session.add(basket7)
    db.session.add(basket8)
    db.session.add(basket9)
    db.session.add(basket10)
    db.session.add(basket11)
    db.session.add(basket12)
    db.session.add(basket13)
    db.session.add(basket14)
    db.session.add(basket15)
    db.session.add(basket16)
    db.session.add(basket17)
    db.session.add(basket18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_baskets():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM baskets"))

    db.session.commit()
