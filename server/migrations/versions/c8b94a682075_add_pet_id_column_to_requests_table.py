"""add pet_id column to requests table

Revision ID: c8b94a682075
Revises: 97f2c5becc4d
Create Date: 2023-10-07 21:55:26.728194

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c8b94a682075'
down_revision = '97f2c5becc4d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pet_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_requests_pet_id_pets'), 'pets', ['pet_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_requests_pet_id_pets'), type_='foreignkey')
        batch_op.drop_column('pet_id')

    # ### end Alembic commands ###
