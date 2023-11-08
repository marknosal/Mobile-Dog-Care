#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, abort
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
import datetime

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Request, Client, Pet

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]
    if request.endpoint not in open_access_list and not session.get('user_id'):
        abort(401, 'Unauthorized')

class CheckSession(Resource):
    def get(self):
        user = User.query.filter_by(id=session.get('user_id')).first()
        if user:
            return user.to_dict(), 200
        return {}, 401
    
api.add_resource(CheckSession, '/check_session', endpoint='check_session')

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        try:
            user = User.query.filter_by(username=username).first()
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
            return {'error': 'Wrong Password'}, 401
        except Exception as e:
            return {'error': str(e)}, 401

api.add_resource(Login, '/login', endpoint='login')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None
        return {}, 204

api.add_resource(Logout, '/logout', endpoint='logout')

class Signup(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        name = data.get('name')
        age = data.get('age')
        email = data.get('email')
        password = data.get('password')
        new_user = User(
            username=username,
            name=name,
            age=age,
            email=email
        )
        new_user.password_hash = password
        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return new_user.to_dict(), 201
        except Exception as e:
            return {'error': f'Username {username} is unavailable'}, 422
        
api.add_resource(Signup, '/signup', endpoint='signup')


class UsersById(Resource):
    def get(self, id):
        pass
    def patch(self, id):
        data = request.get_json()
        try:
            userPatch = User.query.get(session['user_id'])
            for key, value in data.items():
                setattr(userPatch, key, value)
            db.session.commit()
            return userPatch.to_dict(), 202
        except Exception as error:
            db.session.rollback()
            return {'error': str(error)}, 500
    def delete(self):
        pass

api.add_resource(UsersById, '/users/<int:id>', endpoint='users_by_id')

class Requests(Resource):
    def get(self):
        requests = Request.query.filter(
            Request.user_id==session['user_id'],
            Request.details.isnot(None)
        ).all()
        requests_to_dict = [n.to_dict() for n in requests]
        return requests_to_dict, 200
    
    def post(self):
        data = request.get_json()
        try:
            existing_client = Client.query.filter_by(name=data['client']).first()
            datetime_obj = datetime.datetime.strptime(data['datetime'], '%Y-%m-%dT%H:%M')
            if existing_client:
                existing_pet = next((pet for pet in existing_client.pets if pet.name == data['pet']), None)
            else:
                existing_pet = None
            requestClient = existing_client if existing_client else Client(name=data['client'])
            requestPet = existing_pet if existing_pet else Pet(name=data['pet'], client=requestClient)
            newRequest = Request(
                client=requestClient,
                pet=requestPet,
                details=data['details'],
                location=data['location'],
                price=data['price'],
                user_id=session['user_id'],
                datetime=datetime_obj
            )
            db.session.add(newRequest)
            db.session.commit()
            return newRequest.to_dict(), 201
        except IntegrityError:
            db.session.rollback()
            return {'error': 'IntegrityError'}, 400
        except ValueError as error:
            db.session.rollback()
            return {'error': str(error)}, 400
    
api.add_resource(Requests, '/requests', endpoint='requests')

class RequestsById(Resource):
    def get(self, id):
        pass

    def patch(self, id):
        
        data = request.get_json()
        
        try:
            requestPatch = Request.query.get_or_404(id)
            for key, value in data.items():
                if key == 'datetime':
                    datetime_obj = datetime.datetime.strptime(value, '%Y-%m-%dT%H:%M')
                    setattr(requestPatch, key, datetime_obj)
                else:
                    setattr(requestPatch, key, value)
            db.session.commit()

            return requestPatch.to_dict(), 202
        
        except Exception as e:
            db.session.rollback()

            return {'error': str(e)}, 500
    
    def delete(self, id):
        deletedRequest = Request.query.filter_by(id=id).first()
        try:
            db.session.delete(deletedRequest)
            db.session.commit()

            return {'message': 'deletion successful'}, 200
        except Exception as e:
            db.session.rollback()

            return {'error': str(e)}, 500

api.add_resource(RequestsById, '/requests/<int:id>', endpoint='requests_by_id')

class Clients(Resource):
    def get(self):
        request_condition = Client.requests.any(user_id=session['user_id'])
        clients = Client.query.filter(request_condition).all()
        clients_to_dict = [client.to_dict() for client in clients]
        return clients_to_dict, 200
    def post(self):
        data = request.get_json()
        try:
            newClient = Client(
                name=data['name'], 
                address=data['address']
            )
            db.session.add(newClient)
            # current_user = User.query.filter(User.id==session['user_id']).first()
            # current_user.clients.append(newClient)
            db.session.commit()
            return newClient.to_dict(), 201
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Integrity Error'}, 400
        except ValueError as error:
            db.session.rollback()
            return {'error': str(error)}, 400

api.add_resource(Clients, '/clients', endpoint='clients')

class ClientsById(Resource):
    def get(self, id):
        pass
    def patch(self, id):
        data = request.get_json()
        try:
            clientPatch = Client.query.get_or_404(id)
            for key, value in data.items():
                setattr(clientPatch, key, value)
            db.session.commit()
            return clientPatch.to_dict(), 202
        except Exception as error:
            db.session.rollback()
            return {'error': str(error)}, 500
    def delete(self, id):
        pass

api.add_resource(ClientsById, '/clients/<int:id>', endpoint='clients_by_id')

class Pets(Resource):
    def get(self):
        request_condition = Pet.requests.any(user_id=session['user_id'])
        pets = Pet.query.filter(request_condition).all()
        pets_to_dict = [pet.to_dict() for pet in pets]
        return pets_to_dict, 200
    def post(self):
        data = request.get_json()
        try:
            newPet = Pet(
                name=data['name'],
                species=data['species'],
                age=data['age'],
                notes=data['notes']
            )
            db.session.add(newPet)
            # current_user = User.query.filter(User.id==session['user_id']).first()
            
            db.session.commit()
            return newPet.to_dict(), 201
        except IntegrityError:
            db.session.rollback()
            return {'error': 'Integrity Error'}, 400
        except ValueError as error:
            db.session.rollback()
            return {'error': str(error)}, 400

api.add_resource(Pets, '/pets', endpoint='pets')

class PetsById(Resource):
    def get(self, id):
        pass
    def patch(self, id):
        data = request.get_json()
        try:
            petPatch = Pet.query.get_or_404(id)
            for key, value in data.items():
                setattr(petPatch, key, value)
            db.session.commit()
            return petPatch.to_dict(), 202
        except Exception as error:
            db.session.rollback()
            return {'error': str(error)}, 500
    def delete(self, id):
        pass

api.add_resource(PetsById, '/pets/<int:id>', endpoint='pets_by_id')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

