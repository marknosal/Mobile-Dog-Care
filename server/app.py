#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Request, Client

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Requests(Resource):
    def get(self):
        response_to_dict = [n.to_dict() for n in Request.query.all()]
        response = make_response(response_to_dict, 200)
        return response
    
    def post(self):
        data = request.get_json()
        try:
            newRequest = Request(
                details=data['details'],
                location=data['location'],
                price=data['price']
            )
            db.session.add(newRequest)
            db.session.commit()
            return newRequest.to_dict(), 201
        except IntegrityError:
            return {'error': 'IntegrityError'}, 400
    
api.add_resource(Requests, '/requests')

class RequestsById(Resource):
    def get(self, id):
        pass

    def patch(self, id):
        requestPatch = Request.query.filter_by(id=id).first()
        data = request.get_json()
        requestPatch.details = data['details']
        requestPatch.location = data['location']
        requestPatch.price = data['price']
        db.session.add(requestPatch)
        db.session.commit()
        return requestPatch.to_dict(), 200
    
    def delete(self, id):
        pass

api.add_resource(RequestsById, '/requests/<int:id>')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

