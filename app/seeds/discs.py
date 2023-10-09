from app.models import db, Disc, environment, SCHEMA
from sqlalchemy.sql import text


# Adds disc seeder data
def seed_discs():
    disc1 = Disc(
        manufacturer='Discraft',
        name='Buzzz',
        description='The Buzzz is disc golf’s most popular midrange due to its consistency and compatibility with a wide range of players styles. The Buzzz is a low profile modern midrange that is the gold standard for straight to stable flights players can trust.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=buzzz&post_type=product',
        plastics='Z, ESP, Ti, Big Z, CryZtal, Jawbreaker, Pro-D',
        speed=5,
        glide=4,
        turn=-1,
        fade=1,
        diameter=21.7,
        height=1.9,
        rim_depth=1.3,
        rim_width=1.2,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2022/09/PNG-image-F3693DDF63E1-1.png',
        approved=False,

    )

    disc2 = Disc(
        manufacturer='Discraft',
        name='Machete',
        description='The Machete is a low profile meat hook driver built to slice through headwinds with unparalleled predictability. Use it with brute force to easily manage upwind shots, or more like a scalpel for on-demand placement precision on a hyzer or flex shot.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=Machete&post_type=product',
        plastics='Z, ESP, Ti, CryZtal, Big Z',
        speed=11,
        glide=4,
        turn=0,
        fade=4,
        diameter=21.1,
        height=1.6,
        rim_depth=1.1,
        rim_width=2.1,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Machete.Webp',
        approved=True,

    )

    disc3 = Disc(
        manufacturer='Discraft',
        name='Heat',
        description='The Heat™ debuted as the 2014 Ace Race proto and quickly caught fire with players for its control, glide and distance at slower arm speeds. It has a smaller rim for easier grip, and is being hailed as a breakthrough in delivering improved distance for new and developing players.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=heat&post_type=product',
        plastics='Z, ESP, TI, CryZtal, Big Z',
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
        manufacturer='Discraft',
        name='Meteor',
        description='The Meteor is an understable midrange designed for glide and effortless straight flights. In Z blend, the Meteor will break in slowly into an easy turning midrange for technical control shots with the durability for a long life of consistent flight. ',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=meteor&post_type=product',
        plastics='Z, ESP, TI, CryZtal, Big Z',
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
        manufacturer='Discraft',
        name='Luna',
        description='The Luna is a new putter co-designed from start to finish with Paul McBeth. The Luna features a new and unique plastic blend, combining the fan favorites of Jawbreaker and the durability and extra tackiness of rubber. The melding and firming process of these two materials makes for a great feel in the hand and gives the utmost confidence on the course. The Luna is a great neutral flying putter, making it a staple for heavily wooded and open style courses. This control allows The Luna to take advantage of any angle or putting style and showcase it at its full potential.',
        type='Putter',
        purchase_link='https://otbdiscs.com/?s=luna&post_type=product',
        plastics='ESP, Z, Big Z, CryzTal',
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

    disc6 = Disc(
        manufacturer='Innova',
        name='Destroyer',
        description='The Destroyer is a legendary distance driver known for its incredible speed and distance potential. It is a very overstable disc, which means that it will finish with a strong fade to the right (for right-handed throwers). The Destroyer is a great choice for strong arms who need a disc that can handle windy conditions or that can be used to power through tight gaps.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/product/destroyer-champion/',
        plastics='Blizzard, Star, GStar, Champion, Dx, Halo',
        speed=13,
        glide=5,
        turn=-1,
        fade=3,
        diameter=21.2,
        height=2.0,
        rim_depth=1.5,
        rim_width=2.3,
        image_url='https://otbdiscs.b-cdn.net/wp-content/uploads/2018/12/416e5dFCBkL._SX425_.jpg',
        approved=True,
    )

    disc7 = Disc(
        manufacturer='Discraft',
        name='Zombee',
        description='The Zombee is a popular midrange disc known for its reliable straight flight and its ability to power through the wind. It is a very versatile disc that can be used for a variety of shots, including drives, approaches, and upshots. The Zombee is a great choice for players of all skill levels.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=zombee&post_type=product',
        plastics='Z, ESP, FLX',
        speed=6,
        glide=4,
        turn=-1,
        fade=1,
        diameter=21.2,
        height=1.9,
        rim_depth=1.5,
        rim_width=1.6,
        image_url='https://static.wixstatic.com/media/b32cf7_cae5ace2f1084d58b22830389c6320da~mv2_d_1680_1680_s_2.png/v1/fill/w_794,h_784,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/bigz_undertaker.png',
        approved=True,
    )

    disc8 = Disc(
        manufacturer='Dynamic Discs',
        name='Escape',
        description='The Escape is a popular fairway driver known for its long distance potential and its relatively straight flight path. It is a great choice for players who need a disc that can handle a variety of shots, including drives, approaches, and turnovers. The Escape is also a good choice for windy conditions.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=escape&post_type=product',
        plastics='Lucid, Fuzion, Lucid Air, Fluid, Lucid X, Lucid Ice, Fuzion Ice',
        speed=9,
        glide=5,
        turn=-1,
        fade=2,
        diameter=21.2,
        height=1.9,
        rim_depth=1.5,
        rim_width=1.8,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/Escape.Webp',
        approved=True,
    )

    disc9 = Disc(
        manufacturer='Westside Discs',
        name='Harp',
        description='The Harp is a popular overstable approach disc known for its reliable fade and its ability to handle windy conditions. It is a great choice for players who need a disc that can hold a line and finish with a strong fade. The Harp is also a good choice for players who need a disc that can be used for forehand shots.',
        type='Putter',
        purchase_link='https://otbdiscs.com/?s=harp&post_type=product',
        plastics='VIP, Tournament, BT Hard',
        speed=4,
        glide=3,
        turn=0,
        fade=3,
        diameter=21.2,
        height=2.0,
        rim_depth=1.4,
        rim_width=1.6,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/20230517134709_Harp-BTSoftBurst.webp',
        approved=True,
    )
    disc10 = Disc(
        manufacturer='Kastaplast',
        name='Kaxe Z',
        description='The Kaxe Z is a popular midrange disc known for its reliable straight flight and its ability to power through the wind. It is a very versatile disc that can be used for a variety of shots, including drives, approaches, and upshots. The Kaxe Z is a great choice for players of all skill levels.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=kaxe+z&post_type=product',
        plastics='K1, K2',
        speed=6,
        glide=5,
        turn=0,
        fade=2,
        diameter=21.2,
        height=1.9,
        rim_depth=1.5,
        rim_width=1.6,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/20230323140245_KaxeZ.webp',
        approved=True,
    )

    disc11 = Disc(
        manufacturer='Prodigy Disc',
        name='A3',
        description='The A3 is a popular overstable approach disc known for its reliable fade and its ability to handle windy conditions. It is a great choice for players who need a disc that can hold a line and finish with a strong fade. The A3 is also a good choice for players who need a disc that can be used for forehand shots.',
        type='Putter',
        purchase_link='https://otbdiscs.com/?s=a3&post_type=product',
        plastics='400G, 300, 750',
        speed=4,
        glide=4,
        turn=0,
        fade=3,
        diameter=21.2,
        height=2.0,
        rim_depth=1.4,
        rim_width=1.6,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/A337a878.Webp',
        approved=True,
    )

    disc12 = Disc(
        manufacturer='Latitude 64',
        name='River',
        description='The River is a popular fairway driver known for its long distance potential and its relatively straight flight path. It is a great choice for players who need a disc that can handle a variety of shots, including drives, approaches, and turnovers. The River is also a good choice for windy conditions.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=river&post_type=product',
        plastics='Gold Line, Opto Line, Opto Air, Pearl',
        speed=7,
        glide=7,
        turn=-1,
        fade=1,
        diameter=21.5,
        height=1.9,
        rim_depth=1.2,
        rim_width=1.8,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/River14a.Webp',
        approved=True,
    )

    disc13 = Disc(
        manufacturer='Axion Discs',
        name='Crave',
        description='The Axiom Crave is a popular fairway driver known for its long distance potential and its relatively straight flight path. It is a great choice for players who need a disc that can handle a variety of shots, including drives, approaches, and turnovers. The Crave is also a good choice for windy conditions.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=crave&post_type=product',
        plastics='Neutron, Plasma, Electron, Proton, Fission',
        speed=6,
        glide=5,
        turn=-1,
        fade=1,
        diameter=21.1,
        height=1.4,
        rim_depth=1.2,
        rim_width=1.8,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/20230324134401_Crave-Plasma.webp',
        approved=True,
    )

    disc14 = Disc(
        manufacturer='Discmania',
        name='FD',
        description='The FD is a popular fairway driver known for its long distance potential and its relatively straight flight path. It is a great choice for players who need a disc that can handle a variety of shots, including drives, approaches, and turnovers. The FD is also a good choice for windy conditions.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=fd&post_type=product',
        plastics='C-Line, S-Line, G-Line, D-Line',
        speed=7,
        glide=6,
        turn=0,
        fade=1,
        diameter=21.2,
        height=1.8,
        rim_depth=1.1,
        rim_width=1.7,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/FDa10fed.Webp',
        approved=True,
    )

    disc15 = Disc(
        manufacturer='MVP',
        name='Reactor',
        description='The Reactor is a popular midrange disc known for its reliable straight flight and its ability to handle windy conditions. It is a great choice for players of all skill levels.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=reactor&post_type=product',
        plastics='Eclipse 2.0, Fission, Neutron, Proton',
        speed=5,
        glide=5,
        turn=-0.5,
        fade=1.5,
        diameter=21.4,
        height=1.7,
        rim_depth=1.3,
        rim_width=1.4,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/Reactor.Webp',
        approved=True,
    )

    disc16 = Disc(
        manufacturer='Discraft',
        name='Hades',
        description='The Hades is a popular distance driver known for its incredible speed and distance potential. It is a very overstable disc, which means that it will finish with a strong fade to the right (for right-handed throwers). The Hades is a great choice for strong arms who need a disc that can handle windy conditions or that can be used to power through tight gaps.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=hades&post_type=product',
        plastics='ESP, FLX, Z, Big Z',
        speed=12,
        glide=6,
        turn=-3,
        fade=2,
        diameter=21,
        height=1.6,
        rim_depth=1.1,
        rim_width=2.3,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/Hadescf0.Webp',
        approved=True,
    )

    disc17 = Disc(
        manufacturer='Axiom Discs',
        name='Insanity',
        description='The Insanity is a popular distance driver known for its incredible speed and distance potential. It is a very overstable disc, which means that it will finish with a strong fade to the right (for right-handed throwers). The Insanity is a great choice for strong arms who need a disc that can handle windy conditions or that can be used to power through tight gaps.',
        type='Fairway Driver',
        purchase_link='https://otbdiscs.com/?s=insanity&post_type=product',
        plastics='Neutron, Plasma, Electron',
        speed=9,
        glide=5,
        turn=-2,
        fade=1.5,
        diameter=21.1,
        height=1.4,
        rim_depth=1.2,
        rim_width=2.0,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/20230324135256_Insanity-Photon.webp',
        approved=True,
    )

    disc18 = Disc(
        manufacturer='Innova',
        name='Boss',
        description='The Boss is a legendary distance driver known for its incredible speed and distance potential. It is a very overstable disc, which means that it will finish with a strong fade to the right (for right-handed throwers). The Boss is a great choice for strong arms who need a disc that can handle windy conditions or that can be used to power through tight gaps.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=boss&post_type=product',
        plastics='Champion, Star, GStar',
        speed=13,
        glide=5,
        turn=-1,
        fade=3,
        diameter=21.1,
        height=1.5,
        rim_depth=1.2,
        rim_width=2.5,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/Boxx831e.Webp',
        approved=True,
    )

    disc19 = Disc(
        manufacturer='Discraft',
        name='Nuke SS',
        description='The Nuke SS is a popular distance driver known for its incredible speed and distance potential. It is a slightly understable disc, which means that it will have a slight turn to the right (for right-handed throwers) before fading back to the left. The Nuke SS is a great choice for players who need a disc that can handle a variety of shots, including drives, approaches, and turnovers. It is also a good choice for windy conditions.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=nuke+ss&post_type=product',
        plastics='Z-Line, ESP, FLX',
        speed=13,
        glide=5,
        turn=-3,
        fade=3,
        diameter=21.2,
        height=1.5,
        rim_depth=1.1,
        rim_width=2.5,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/NukeSS.Webp',
        approved=True,
    )

    disc20 = Disc(
        manufacturer='Axiom Discs',
        name='Envy',
        description='The Envy is a popular midrange driver known for its reliable straight flight and its ability to handle windy conditions. It is a great choice for players of all skill levels.',
        type='Putter',
        purchase_link='https://otbdiscs.com/?s=envy&post_type=product',
        plastics='Lucid, Fuzion, Lucid Air, Fluid, Lucid X, Lucid Ice, Fuzion Ice',
        speed=3,
        glide=3,
        turn=0,
        fade=2,
        diameter=21.0,
        height=1.8,
        rim_depth=1.4,
        rim_width=1.1,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/20230324134507_Envy-CosmicElectronF.webp',
        approved=True,
    )
    disc21 = Disc(
        manufacturer='Discraft',
        name='Nebula',
        description='The Discraft Nebula was the Ace Race disc for 2008. It is an overstable midrange that is now only available in this limited edition Elite Z run. In a lot of ways, the Nebula was the first Buzzz OS, as it is a very dependable overstable midrange that will hold strong in the wind.',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=nebula&post_type=product',
        plastics='Big Z, Esp, Z',
        speed=5,
        glide=4,
        turn=-0.5,
        fade=2,
        diameter=21.30,
        height=2.0,
        rim_depth=1.30,
        rim_width=1.30,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Nebula_1.Webp',
        approved=True,
    )
    disc22 = Disc(
        manufacturer='Discraft',
        name='Thrasher',
        description='The Thrasher is a very fast and understable disc. It is important to know that this mold is not flippy, allowing huge distance from slower arms, and yet is still completely big-arm friendly. It will finish on a slow hyzer in most situations, so expect some clean anhyzers out of this disc. This mold is a great choice for most any skilled player',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=thrasher&post_type=product',
        plastics='Esp, Big Z, Z, Ti',
        speed=12,
        glide=5,
        turn=-3,
        fade=2,
        diameter=21.20,
        height=1.50,
        rim_depth=1.10,
        rim_width=2.20,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Thrasher_3.Webp',
        approved=True,
    )
    disc23 = Disc(
        manufacturer='Discraft',
        name='Scorch',
        description='The Scorch is an understable distance driver. It is much like a longer Avenger SS. This makes it a great distance driver that will have some turn and a decent amount of fade, providing a consistent "S" curve flight path every time you rip it.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=scorch&post_type=product',
        plastics='Esp, Z, Big Z',
        speed=12,
        glide=6,
        turn=-2,
        fade=2,
        diameter=21.10,
        height=1.80,
        rim_depth=1.10,
        rim_width=2.20,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Scorch_3.Webp',
        approved=True,
    )
    disc24 = Disc(
        manufacturer='Discraft',
        name='Nuke',
        description='The Discraft Nuke is one of the most popular distance drivers in the world. This fast-flying driver has an ultra-thick rim (2.5cm) and maintains maximum speed for a long time. While this disc is ultra-fast, it is relatively stable for power throwers and has a Discraft stability rating of just 1.6. The Nuke is available in all the plastics Discraft makes.',
        type='Distance Driver',
        purchase_link='https://otbdiscs.com/?s=nuke&post_type=product',
        plastics='Esp, Big Z, Z, Ti',
        speed=13,
        glide=5,
        turn=-1,
        fade=3,
        diameter=21.20,
        height=1.60,
        rim_depth=1.20,
        rim_width=2.50,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Nuke5004.Webp',
        approved=True,
    )
    disc24 = Disc(
        manufacturer='Discraft',
        name='Nuke',
        description='The Wasp is one of the more popular overstable midrange discs. This is a great disc for windy conditions and strategic fading shots',
        type='Midrange',
        purchase_link='https://otbdiscs.com/?s=wasp&post_type=product',
        plastics='Esp, Big Z, Z, Ti',
        speed=5,
        glide=3,
        turn=-0,
        fade=2,
        diameter=21.60,
        height=1.80,
        rim_depth=1.20,
        rim_width=1.20,
        image_url='https://infinitediscs.com/Inf_Uploads/DiscProducts/W675_Waspf9ec.Webp',
        approved=True,
    )

    db.session.add(disc1)
    db.session.add(disc2)
    db.session.add(disc3)
    db.session.add(disc4)
    db.session.add(disc5)
    db.session.add(disc6)
    db.session.add(disc7)
    db.session.add(disc8)
    db.session.add(disc9)
    db.session.add(disc10)
    db.session.add(disc11)
    db.session.add(disc12)
    db.session.add(disc13)
    db.session.add(disc14)
    db.session.add(disc15)
    db.session.add(disc16)
    db.session.add(disc17)
    db.session.add(disc18)
    db.session.add(disc19)
    db.session.add(disc20)
    db.session.add(disc21)
    db.session.add(disc22)
    db.session.add(disc23)
    db.session.add(disc24)
    db.session.add(disc25)

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
            f"TRUNCATE table {SCHEMA}.discs RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM discs"))

    db.session.commit()
