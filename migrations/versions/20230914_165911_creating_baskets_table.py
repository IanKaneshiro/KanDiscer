"""creating baskets  table

Revision ID: 6e032c7d7e30
Revises: c53136b82a92
Create Date: 2023-09-14 16:59:11.644559

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '6e032c7d7e30'
down_revision = 'c53136b82a92'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('baskets',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('course_id', sa.Integer(), nullable=False),
                    sa.Column('lat', sa.Float(), nullable=False),
                    sa.Column('lng', sa.Float(), nullable=False),
                    sa.Column('distance', sa.Integer(), nullable=False),
                    sa.Column('notes', sa.String(), nullable=True),
                    sa.Column('par', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(
                        ['course_id'], ['courses.id'], "courses_foreign_key_baskets"),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE baskets SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('baskets')
    # ### end Alembic commands ###
