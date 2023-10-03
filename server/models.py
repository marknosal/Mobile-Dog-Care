from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    earnings = db.Column(db.Float)
    # relationships
    requests = db.relationship('Request', back_populates='user')

    def __repr__(self):
        return f'<User {self.id}. Name: {self.name}. Age: {self.age}. Email: {self.email}. Earnings: {self.earnings}.>'

class Request(db.Model):
    __tablename__ = 'requests'

    id = db.Column(db.Integer, primary_key=True)
    details = db.Column(db.String)
    location = db.Column(db.String)
    price = db.Column(db.Float)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    # relationships
    user = db.relationship('User', back_populates='requests')
    client = db.relationship('Client', back_populates='requests')

class Client(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    debt = db.Column(db.Float)
    # relationships
    requests = db.relationship('Request', back_populates='client')
    pets = db.relationship('Pet', back_populates='client')

class Pet(db.Model):
    __tablename__ = 'pets'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    species = db.Column(db.String)
    notes = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    # relationships
    client = db.relationship('Client', back_populates='pets')