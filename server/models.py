from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-requests.user',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    earnings = db.Column(db.Float)
    # relationships
    requests = db.relationship('Request', back_populates='user')
    clients = association_proxy('requests', 'client', creator=lambda client_obj: Request(client=client_obj))

    def __repr__(self):
        return f'<User {self.id}. Name: {self.name}. Age: {self.age}. Email: {self.email}. Earnings: {self.earnings}.>'

class Request(db.Model, SerializerMixin):
    __tablename__ = 'requests'

    serialize_rules = ('-user.requests', '-client.requests', '-pet.requests', '-pet.client')


    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.Float)
    complete = db.Column(db.Boolean, default=False)
    datetime = db.Column(db.DateTime, default=datetime.utcnow())


    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
    # relationships
    user = db.relationship('User', back_populates='requests')
    client = db.relationship('Client', back_populates='requests')
    pet = db.relationship('Pet', back_populates='requests')


    def __repr__(self):
        return f'<Request {self.id}. Location: {self.location}. Price: {self.price}.>'

class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    serialize_rules = ('-requests.client', '-pets.client',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    debt = db.Column(db.Float)
    # relationships
    requests = db.relationship('Request', back_populates='client')
    users = association_proxy('requests', 'user', creator=lambda user_obj: Request(user=user_obj))
    pets = db.relationship('Pet', back_populates='client')

    def __repr__(self):
        return f'<Client: {self.id}. Name: {self.name}. Address: {self.address}. Debt: {self.debt}.>'

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    serialize_rules =('-client.requests','-requests', '-client.users', '-client.pets')

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    species = db.Column(db.String)
    notes = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    # relationships
    client = db.relationship('Client', back_populates='pets')
    requests = db.relationship('Request', back_populates='pet')

    def __repr__(self):
        return f'<Name: {self.name}. Age: {self.age}. Species: {self.species}.>'