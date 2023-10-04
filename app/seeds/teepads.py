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

    teepad19 = Teepad(
        hole_number=1,
        course_id=2,
        lat=44.055685380536715,
        lng=-123.07966157529806,
    )

    teepad20 = Teepad(
        hole_number=2,
        course_id=2,
        lat=44.0557209687625,
        lng=-123.07838693752748
    )

    teepad21 = Teepad(
        hole_number=3,
        course_id=2,
        lat=44.05463971071143,
        lng=-123.07937992966453
    )

    teepad22 = Teepad(
        hole_number=4,
        course_id=2,
        lat=44.053929961710026,
        lng=-123.08001753044485,
    )

    teepad23 = Teepad(
        hole_number=5,
        course_id=2,
        lat=44.05366255023182,
        lng=-123.07840807174163
    )

    teepad24 = Teepad(
        hole_number=6,
        course_id=2,
        lat=44.05363611015824,
        lng=-123.08129096174372
    )

    teepad25 = Teepad(
        hole_number=7,
        course_id=2,
        lat=44.05339983689177,
        lng=-123.07876767460951
    )

    teepad26 = Teepad(
        hole_number=8,
        course_id=2,
        lat=44.05265569364201,
        lng=-123.07753837963125
    )

    teepad27 = Teepad(
        hole_number=9,
        course_id=2,
        lat=44.05294518637467,
        lng=-123.07632266580985
    )

    teepad28 = Teepad(
        hole_number=10,
        course_id=2,
        lat=44.0539739988468,
        lng=-123.0764755072579
    )

    teepad29 = Teepad(
        hole_number=11,
        course_id=2,
        lat=44.05417769251332,
        lng=-123.07609926111424
    )

    teepad30 = Teepad(
        hole_number=12,
        course_id=2,
        lat=44.052919624047405,
        lng=-123.07480860799649
    )

    teepad31 = Teepad(
        hole_number=13,
        course_id=2,
        lat=44.05317354814704,
        lng=-123.07685925471276
    )

    teepad32 = Teepad(
        hole_number=14,
        course_id=2,
        lat=44.054975058280945,
        lng=-123.07958961491215,
    )

    teepad33 = Teepad(
        hole_number=15,
        course_id=2,
        lat=44.05574423198013,
        lng=-123.07836850840812,
    )

    teepad34 = Teepad(
        hole_number=16,
        course_id=2,
        lat=44.05653475710767,
        lng=-123.0791578636283,
    )

    teepad35 = Teepad(
        hole_number=17,
        course_id=2,
        lat=44.05724554787216,
        lng=-123.07738998999093,
    )

    teepad36 = Teepad(
        hole_number=18,
        course_id=2,
        lat=44.056226631010446,
        lng=-123.07852748757625,
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
    db.session.add(teepad19)
    db.session.add(teepad20)
    db.session.add(teepad21)
    db.session.add(teepad22)
    db.session.add(teepad23)
    db.session.add(teepad24)
    db.session.add(teepad25)
    db.session.add(teepad26)
    db.session.add(teepad27)
    db.session.add(teepad28)
    db.session.add(teepad29)
    db.session.add(teepad30)
    db.session.add(teepad31)
    db.session.add(teepad32)
    db.session.add(teepad33)
    db.session.add(teepad34)
    db.session.add(teepad35)
    db.session.add(teepad36)

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
