"""add foreign keys

Revision ID: 87ca11bc1274
Revises: 4aedd546d60f
Create Date: 2023-10-03 08:28:09.256743

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '87ca11bc1274'
down_revision = '4aedd546d60f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('client_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_pets_client_id_clients'), 'clients', ['client_id'], ['id'])

    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('client_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_requests_client_id_clients'), 'clients', ['client_id'], ['id'])
        batch_op.create_foreign_key(batch_op.f('fk_requests_user_id_users'), 'users', ['user_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('requests', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_requests_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_requests_client_id_clients'), type_='foreignkey')
        batch_op.drop_column('client_id')
        batch_op.drop_column('user_id')

    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_pets_client_id_clients'), type_='foreignkey')
        batch_op.drop_column('client_id')

    # ### end Alembic commands ###