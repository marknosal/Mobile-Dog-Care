from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from datetime import datetime, timedelta
import ipdb

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-requests.user',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer)
    email = db.Column(db.String)
    earnings = db.Column(db.Float)
    _password_hash = db.Column(db.String, nullable=False)
    # relationships
    requests = db.relationship('Request', back_populates='user')
    clients = association_proxy('requests', 'client', creator=lambda client_obj: Request(client=client_obj))

    def __repr__(self):
        return f'<User {self.id}. Name: {self.name}. Age: {self.age}. Email: {self.email}. Earnings: {self.earnings}.>'
    
    @hybrid_property
    def password_hash(self):
        return self._password_hash
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

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

    @validates('details')
    def check_details(self, key, details):
        if len(details) < 5:
            raise ValueError(
                {'message': 'Request details must be 5 characters or more.'}
            )
        return details

    @validates('price')
    def check_price(self, key, price):
        if not price:
            raise ValueError(
                {'message': 'price must exist'}
            )
        if not isinstance(price, (int, float,)):
            raise ValueError(
                {'message': 'Price must be a number.'}
            )
        return price

    def to_dict(self):
        data = super().to_dict()
        data['datetime'] = self.datetime.strftime('%Y-%m-%dT%H:%M')
        return data

    def __repr__(self):
        return f'<Request {self.id}. Location: {self.location}. Price: {self.price}.>'

class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    serialize_rules = ('-requests.client', '-pets.client',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String, default='')
    debt = db.Column(db.Float, default=0)
    # relationships
    requests = db.relationship('Request', back_populates='client')
    users = association_proxy('requests', 'user', creator=lambda user_obj: Request(user=user_obj))
    pets = db.relationship('Pet', back_populates='client')

    def __repr__(self):
        return f'<Client: {self.id}. Name: {self.name}. Address: {self.address}. Debt: {self.debt}.>'

class Pet(db.Model, SerializerMixin):
    __tablename__ = 'pets'

    # serialize_rules =('-client.requests','-requests', '-client.users', '-client.pets')
    serialize_rules = ('-requests',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    age = db.Column(db.Integer, default='unknown')
    species = db.Column(db.String, default='pet')
    notes = db.Column(db.String)

    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    # relationships
    client = db.relationship('Client', back_populates='pets')
    requests = db.relationship('Request', back_populates='pet')

    def __repr__(self):
        return f'<Name: {self.name}. Age: {self.age}. Species: {self.species}.>'