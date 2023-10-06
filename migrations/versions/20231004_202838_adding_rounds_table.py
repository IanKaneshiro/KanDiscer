"""adding rounds table

Revision ID: cd23cb200660
Revises: 2c43dacaad2e
Create Date: 2023-10-04 20:28:38.409533

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'cd23cb200660'
down_revision = '2c43dacaad2e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('rounds',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('course_id', sa.Integer(), nullable=False),
                    sa.Column('start_time', sa.DateTime(), nullable=True),
                    sa.Column('end_time', sa.DateTime(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['course_id'], ['courses.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE rounds SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('rounds')
    # ### end Alembic commands ###