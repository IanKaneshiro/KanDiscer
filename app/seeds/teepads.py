from app.models import db, Teepad, environment, SCHEMA
from sqlalchemy.sql import text


def seed_teepads():
    teepad1 = Teepad(
        hole_number=1,
        course_id=1,
        lat=44.050963068556996,
        lng=-123.1529549384451,
    )

    teepad2 = Teepad(
        hole_number=2,
        course_id=1,
        lat=44.0504870571707,
        lng=-123.15299441460132,
    )

    teepad3 = Teepad(
        hole_number=3,
        course_id=1,
        lat=44.05046067372952,
        lng=-123.15153686522522,
    )

    teepad4 = Teepad(
        hole_number=4,
        course_id=1,
        lat=44.05072084818741,
        lng=-123.15040268407805,
    )

    teepad5 = Teepad(
        hole_number=5,
        course_id=1,
        lat=44.05233367635924,
        lng=-123.15064891082511,
    )

    teepad6 = Teepad(
        hole_number=6,
        course_id=1,
        lat=44.052464718808466,
        lng=-123.1482200317821,
    )

    teepad7 = Teepad(
        hole_number=7,
        course_id=1,
        lat=44.05290150078318,
        lng=-123.14871272132203,
    )

    teepad8 = Teepad(
        hole_number=8,
        course_id=1,
        lat=44.0533187413962,
        lng=-123.1500723355887,
    )

    teepad9 = Teepad(
        hole_number=9,
        course_id=1,
        lat=44.05391229242235,
        lng=-123.14868500217351,
    )

    teepad10 = Teepad(
        hole_number=10,
        course_id=1,
        lat=44.052774982968,
        lng=-123.14822336828644,
    )

    teepad11 = Teepad(
        hole_number=11,
        course_id=1,
        lat=44.05416093220995,
        lng=-123.14867919506254,
    )

    teepad12 = Teepad(
        hole_number=12,
        course_id=1,
        lat=44.053221844224026,
        lng=-123.15050883519518,
    )

    teepad13 = Teepad(
        hole_number=13,
        course_id=1,
        lat=44.054142916597414,
        lng=-123.15168088939618,
    )

    teepad14 = Teepad(
        hole_number=14,
        course_id=1,
        lat=44.05218779812694,
        lng=-123.15082955393135,
    )

    teepad15 = Teepad(
        hole_number=15,
        course_id=1,
        lat=44.052272320554806,
        lng=-123.15234744586972,
    )

    teepad16 = Teepad(
        hole_number=16,
        course_id=1,
        lat=44.05198370109369,
        lng=-123.1527955705296,
    )

    teepad17 = Teepad(
        hole_number=17,
        course_id=1,
        lat=44.051514349592395,
        lng=-123.15142319725831,
    )

    teepad18 = Teepad(
        hole_number=18,
        course_id=1,
        lat=44.05060797086824,
        lng=-123.15113526974402,
    )

    db.session.add(teepad1)
    db.session.add(teepad2)
    db.session.add(teepad3)
    db.session.add(teepad4)
    db.session.add(teepad5)
    db.session.add(teepad6)
    db.session.add(teepad7)
    db.session.add(teepad8)
    db.session.add(teepad9)
    db.session.add(teepad10)
    db.session.add(teepad11)
    db.session.add(teepad12)
    db.session.add(teepad13)
    db.session.add(teepad14)
    db.session.add(teepad15)
    db.session.add(teepad16)
    db.session.add(teepad17)
    db.session.add(teepad18)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_teepads():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.teepads RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM teepads"))

    db.session.commit()
