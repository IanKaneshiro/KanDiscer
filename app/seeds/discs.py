from app.models import db, Disc, environment, SCHEMA
from sqlalchemy.sql import text


# Adds disc seeder data
def seed_discs():
    disc1 = Disc(
        manufacture='Discraft',
        name='Buzzz',
        description='The Buzzz is disc golf’s most popular midrange due to its consistency and compatibility with a wide range of players styles. The Buzzz is a low profile modern midrange that is the gold standard for straight to stable flights players can trust.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=buzzz&post_type=product',
        plastics='Z, ESP, TI, FLX',
        speed=5,
        glide=4,
        turn=-1,
        fade=1,
        diameter=21.7,
        height=1.9,
        rim_depth=1.3,
        rim_width=1.2,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2022/09/PNG-image-F3693DDF63E1-1.png',
        approved=True,

    )

    disc2 = Disc(
        manufacture='Discraft',
        name='Machete',
        description='The Machete is a low profile meat hook driver built to slice through headwinds with unparalleled predictability. Use it with brute force to easily manage upwind shots, or more like a scalpel for on-demand placement precision on a hyzer or flex shot.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=Machete&post_type=product',
        plastics='Z, ESP, TI',
        speed=11,
        glide=4,
        turn=0,
        fade=4,
        diameter=21.1,
        height=1.6,
        rim_depth=1.1,
        rim_width=2.1,
        image_url='https://cdn.discgolfscene.com/image/cache/catalog/discs/discraft/machete/machete-esp-2500x2500.jpg',
        approved=True,

    )

    disc3 = Disc(
        manufacture='Discraft',
        name='Heat',
        description='The Heat™ debuted as the 2014 Ace Race proto and quickly caught fire with players for its control, glide and distance at slower arm speeds. It has a smaller rim for easier grip, and is being hailed as a breakthrough in delivering improved distance for new and developing players.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=heat&post_type=product',
        plastics='Z, ESP, TI',
        speed=9,
        glide=6,
        turn=-3,
        fade=1,
        diameter=21.1,
        height=2.1,
        rim_depth=1.2,
        rim_width=1.9,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2021/11/zheat_max-br_2.jpg',
        approved=True,

    )

    disc4 = Disc(
        manufacture='Discraft',
        name='Meteor',
        description='The Meteor is an understable midrange designed for glide and effortless straight flights. In Z blend, the Meteor will break in slowly into an easy turning midrange for technical control shots with the durability for a long life of consistent flight. ',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=meteor&post_type=product',
        plastics='Z, ESP, TI',
        speed=5,
        glide=5,
        turn=-3,
        fade=1,
        diameter=21.5,
        height=2.0,
        rim_depth=1.3,
        rim_width=1.3,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2021/10/zmeteor_max-br_1.jpg',
        approved=True,
    )
    disc5 = Disc(
        manufacture='Discraft',
        name='Luna',
        description='The Luna is a new putter co-designed from start to finish with Paul McBeth. The Luna features a new and unique plastic blend, combining the fan favorites of Jawbreaker and the durability and extra tackiness of rubber. The melding and firming process of these two materials makes for a great feel in the hand and gives the utmost confidence on the course. The Luna is a great neutral flying putter, making it a staple for heavily wooded and open style courses. This control allows The Luna to take advantage of any angle or putting style and showcase it at its full potential.',
        type='Putter',
        purchase_link='https://otbdiscs.com/?s=luna&post_type=product',
        plastics='Jawbreaker, ESP, FLX',
        speed=3,
        glide=3,
        turn=0,
        fade=3,
        diameter=21.1,
        height=2.0,
        rim_depth=1.4,
        rim_width=1.1,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2021/03/Big-Z-Luna-Bright-yellow_1024x1024.png',
        approved=True,
    )

    db.session.add(disc1)
    db.session.add(disc2)
    db.session.add(disc3)
    db.session.add(disc4)
    db.session.add(disc5)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_discs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM discs"))

    db.session.commit()
