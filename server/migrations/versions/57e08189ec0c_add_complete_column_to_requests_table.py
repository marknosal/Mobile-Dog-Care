"""add "complete" column to requests table

Revision ID: 57e08189ec0c
Revises: 87ca11bc1274
Create Date: 2023-10-06 08:40:18.390010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '57e08189ec0c'
down_revision = '87ca11bc1274'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.add_column(sa.Column('complete', sa.Boolean(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.drop_column('complete')

    # ### end Alembic commands ###