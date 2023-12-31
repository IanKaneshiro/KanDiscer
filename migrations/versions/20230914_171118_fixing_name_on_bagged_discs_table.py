"""fixing name on bagged_discs table

Revision ID: 39f4318aa44f
Revises: cf9621ec4300
Create Date: 2023-09-14 17:11:18.299713

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '39f4318aa44f'
down_revision = 'cf9621ec4300'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bagged_discs',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('bag_id', sa.Integer(), nullable=False),
                    sa.Column('disc_id', sa.Integer(), nullable=False),
                    sa.Column('weight', sa.Float(), nullable=True),
                    sa.Column('color', sa.String(length=50), nullable=True),
                    sa.Column('plastic', sa.String(length=50), nullable=True),
                    sa.Column('image_url', sa.String(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['bag_id'], ['bags.id'], ),
                    sa.ForeignKeyConstraint(['disc_id'], ['discs.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.drop_table('bagged_disc')

    if environment == "production":
        op.execute(f"ALTER TABLE bagged_discs SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bagged_disc',
                    sa.Column('id', sa.INTEGER(), nullable=False),
                    sa.Column('bag_id', sa.INTEGER(), nullable=False),
                    sa.Column('disc_id', sa.INTEGER(), nullable=False),
                    sa.Column('weight', sa.FLOAT(), nullable=True),
                    sa.Column('color', sa.VARCHAR(length=50), nullable=True),
                    sa.Column('plastic', sa.VARCHAR(length=50), nullable=True),
                    sa.Column('image_url', sa.VARCHAR(), nullable=True),
                    sa.Column('created_at', sa.DATETIME(), nullable=True),
                    sa.Column('updated_at', sa.DATETIME(), nullable=True),
                    sa.ForeignKeyConstraint(['bag_id'], ['bags.id'], ),
                    sa.ForeignKeyConstraint(['disc_id'], ['discs.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.drop_table('bagged_discs')
    # ### end Alembic commands ###
