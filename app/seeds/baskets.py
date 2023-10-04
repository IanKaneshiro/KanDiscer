from app.models import db, Basket, environment, SCHEMA
from sqlalchemy.sql import text


def seed_baskets():
    basket1 = Basket(
        hole_number=1,
        teepad_id=1,
        lat=44.05073724174806,
        lng=-123.15207798763349,
        distance=297,
        par=3
    )

    basket2 = Basket(
        hole_number=2,
        teepad_id=2,
        lat=44.050335549832226,
        lng=-123.15177002076109,
        distance=318,
        par=3
    )

    basket3 = Basket(
        hole_number=3,
        teepad_id=3,
        lat=44.050495872936864,
        lng=-123.1503398859764,
        distance=302,
        par=3
    )

    basket4 = Basket(
        hole_number=4,
        teepad_id=4,
        lat=44.05182636937076,
        lng=-123.15065354638654,
        distance=405,
        notes="",
        par=3
    )

    basket5 = Basket(
        hole_number=5,
        teepad_id=5,
        lat=44.052161279061266,
        lng=-123.14823440853417,
        distance=620,
        par=4
    )

    basket6 = Basket(
        hole_number=6,
        teepad_id=6,
        lat=44.05279866837108,
        lng=-123.1492282469045,
        distance=286,
        par=3
    )

    basket7 = Basket(
        hole_number=7,
        teepad_id=7,
        lat=44.05313963354112,
        lng=-123.1501593456099,
        distance=405,
        par=3
    )

    basket8 = Basket(
        hole_number=8,
        teepad_id=8,
        lat=44.053915583232765,
        lng=-123.14915968183095,
        distance=321,
        par=3
    )

    basket9 = Basket(
        hole_number=9,
        teepad_id=9,
        lat=44.05311712022785,
        lng=-123.14894988888824,
        distance=299,
        par=3
    )

    basket10 = Basket(
        hole_number=10,
        teepad_id=10,
        lat=44.0538477809059,
        lng=-123.14840931116886,
        distance=397,
        par=3
    )

    basket11 = Basket(
        hole_number=11,
        teepad_id=11,
        lat=44.05400168271885,
        lng=-123.1500913997165,
        distance=372,
        par=3
    )

    basket12 = Basket(
        hole_number=12,
        teepad_id=12,
        lat=44.05390822368207,
        lng=-123.15032018158062,
        distance=254,
        par=3
    )

    basket13 = Basket(
        hole_number=13,
        teepad_id=13,
        lat=44.05261289055903,
        lng=-123.15020280862427,
        distance=699,
        par=4
    )

    basket14 = Basket(
        hole_number=14,
        teepad_id=14,
        lat=44.05229083112664,
        lng=-123.15208681232176,
        distance=333,
        par=3
    )

    basket15 = Basket(
        hole_number=15,
        teepad_id=15,
        lat=44.05286181927042,
        lng=-123.15369214515934,
        distance=415,
        par=3
    )

    basket16 = Basket(
        hole_number=16,
        teepad_id=16,
        lat=44.05185931929984,
        lng=-123.15137931555192,
        distance=384,
        par=3
    )

    basket17 = Basket(
        hole_number=17,
        teepad_id=17,
        lat=44.050937863617634,
        lng=-123.15098612795347,
        distance=236,
        par=3
    )

    basket18 = Basket(
        hole_number=18,
        teepad_id=18,
        lat=44.0514034429728,
        lng=-123.15254717491858,
        distance=514,
        par=3
    )

    basket19 = Basket(
        hole_number=1,
        teepad_id=19,
        lat=44.056064872387594,
        lng=-123.07843952205204,
        distance=342,
        par=3
    )

    basket20 = Basket(
        hole_number=2,
        teepad_id=20,
        lat=44.05525734470166,
        lng=-123.07949443781922,
        distance=331,
        par=3
    )

    basket21 = Basket(
        hole_number=3,
        teepad_id=21,
        lat=44.05386035501331,
        lng=-123.08086743188662,
        distance=472,
        par=4
    )

    basket22 = Basket(
        hole_number=4,
        teepad_id=22,
        lat=44.053350562758624,
        lng=-123.07781174777321,
        distance=612,
        notes="",
        par=4
    )

    basket23 = Basket(
        hole_number=5,
        teepad_id=23,
        lat=44.05376800423471,
        lng=-123.08054667166087,
        distance=697,
        par=5
    )

    basket24 = Basket(
        hole_number=6,
        teepad_id=24,
        lat=44.05327051063426,
        lng=-123.07967620002991,
        distance=457,
        par=4
    )

    basket25 = Basket(
        hole_number=7,
        teepad_id=25,
        lat=44.053184682529206,
        lng=-123.07728756505037,
        distance=413,
        par=4
    )

    basket26 = Basket(
        hole_number=8,
        teepad_id=26,
        lat=44.0528220727395,
        lng=-123.07600949937692,
        distance=393,
        par=4
    )

    basket27 = Basket(
        hole_number=9,
        teepad_id=27,
        lat=44.05370989901317,
        lng=-123.07616782842535,
        distance=284,
        par=3
    )

    basket28 = Basket(
        hole_number=10,
        teepad_id=28,
        lat=44.05447776604967,
        lng=-123.0760999900628,
        distance=202,
        par=3
    )

    basket29 = Basket(
        hole_number=11,
        teepad_id=29,
        lat=44.053222506339694,
        lng=-123.07530624315322,
        distance=408,
        par=3
    )

    basket30 = Basket(
        hole_number=12,
        teepad_id=30,
        lat=44.053053573311246,
        lng=-123.07605654617029,
        distance=327,
        par=3
    )

    basket31 = Basket(
        hole_number=13,
        teepad_id=31,
        lat=44.0544080044576,
        lng=-123.07941933315674,
        distance=805,
        par=5
    )

    basket32 = Basket(
        hole_number=14,
        teepad_id=32,
        lat=44.055288170112874,
        lng=-123.07841064380307,
        distance=328,
        par=3
    )

    basket33 = Basket(
        hole_number=15,
        teepad_id=33,
        lat=44.05645535674864,
        lng=-123.07798100480674,
        distance=292,
        par=3
    )

    basket34 = Basket(
        hole_number=16,
        teepad_id=34,
        lat=44.05721117039792,
        lng=-123.07839068138505,
        distance=334,
        par=3
    )

    basket35 = Basket(
        hole_number=17,
        teepad_id=35,
        lat=44.056628675749266,
        lng=-123.07865932560796,
        distance=410,
        par=3
    )

    basket36 = Basket(
        hole_number=18,
        teepad_id=36,
        lat=44.05598122959998,
        lng=-123.08001367951215,
        distance=393,
        par=4
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
    db.session.add(basket19)
    db.session.add(basket20)
    db.session.add(basket21)
    db.session.add(basket22)
    db.session.add(basket23)
    db.session.add(basket24)
    db.session.add(basket25)
    db.session.add(basket26)
    db.session.add(basket27)
    db.session.add(basket28)
    db.session.add(basket29)
    db.session.add(basket30)
    db.session.add(basket31)
    db.session.add(basket32)
    db.session.add(basket33)
    db.session.add(basket34)
    db.session.add(basket35)
    db.session.add(basket36)

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
            f"TRUNCATE table {SCHEMA}.baskets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM baskets"))

    db.session.commit()
