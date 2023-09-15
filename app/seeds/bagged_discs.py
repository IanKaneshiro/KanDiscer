from app.models import db, BaggedDisc, environment, SCHEMA
from sqlalchemy.sql import text


def seed_bagged_discs():
    bag1 = BaggedDisc(
        bag_id=1,
        disc_id=5,
        weight=174,
        color='blue',
        plastic='Z',
        image_url='https://lh3.googleusercontent.com/pw/AIL4fc98MpXO1xlsMgJ18Ym05FB11ev9AF89tYtAC8vw8xDZHIHR08dp5hn5ZO7u7jbRIVJQwyIvrkWqcHq822jpWt3FPekiHBQQvRO3lclTYhxE0k5xHgCvB8ZPhA_Kjz6ufXjz5F1TrhF4DzNxwjiuiarjvw=w1080-h1440-s-no?authuser=0',
    )
    bag2 = BaggedDisc(
        bag_id=1,
        disc_id=4,
        weight=177,
        color='pink',
        plastic='Z'
    )
    bag3 = BaggedDisc(
        bag_id=1,
        disc_id=1,
        weight=177,
        color='clear',
        plastic='Z'

    )

    db.session.add(bag1)
    db.session.add(bag2)
    db.session.add(bag3)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_bagged_discs():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bagged_discs"))

    db.session.commit()
