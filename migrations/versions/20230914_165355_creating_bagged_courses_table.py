"""creating bagged courses table

Revision ID: c53136b82a92
Revises: 5ad33f596d67
Create Date: 2023-09-14 16:53:55.736464

"""
from alembic import op
import sqlalchemy as sa


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'c53136b82a92'
down_revision = '5ad33f596d67'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('courses',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('owner_id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('location_name', sa.String(), nullable=True),
                    sa.Column('lat', sa.Float(), nullable=True),
                    sa.Column('lng', sa.Float(), nullable=True),
                    sa.Column('headline', sa.String(), nullable=True),
                    sa.Column('description', sa.Text(), nullable=True),
                    sa.Column('course_contact', sa.String(), nullable=True),
                    sa.Column('course_website', sa.String(), nullable=True),
                    sa.Column('year_established', sa.Integer(), nullable=True),
                    sa.Column('hole_count', sa.Integer(), nullable=False),
                    sa.Column('tee_types', sa.String(), nullable=True),
                    sa.Column('target_types', sa.String(), nullable=True),
                    sa.Column('services', sa.String(), nullable=True),
                    sa.Column('cost', sa.Float(), nullable=True),
                    sa.Column('approved', sa.Boolean(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=True),
                    sa.Column('updated_at', sa.DateTime(), nullable=True),
                    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    if environment == "production":
        op.execute(f"ALTER TABLE courses SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('courses')
    # ### end Alembic commands ###
