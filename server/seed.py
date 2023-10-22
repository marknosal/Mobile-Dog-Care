#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime, timedelta
import string

# Remote library imports
from faker import Faker
from config import bcrypt

# Local imports
from app import app
from models import db, User, Client, Request, Pet

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        # clear all rows
        User.query.delete()
        Client.query.delete()
        Request.query.delete()
        Pet.query.delete()
        print('Rows cleared...')

        # add user
        
        def generate_random_string():
            characters = string.ascii_letters + string.digits
            random_length = randint(8,50)
            random_string = ''.join(rc(characters) for _ in range(random_length))
            return random_string
        
        users = []
        for i in range(5):
            password=generate_random_string()
            new_user = User(
                name=fake.name(),
                age=fake.random_int(min=18, max=99),
                email=fake.email(),
                earnings=0.00,
                _password_hash=bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')
            )
            users.append(new_user)
        db.session.add_all(users)
        db.session.commit()
        print('User created...')

        # add clients
        clients = []
        for i in range(20):
            new_client = Client(
                name=fake.name(),
                address=fake.address(),
                debt=0.00
            )
            clients.append(new_client)
        db.session.add_all(clients)
        db.session.commit()
        print('Clients created...')

        # add pets
        pets = []
        available_species = ['dog', 'cat', 'bird', 'turtle', 'mammal', 'reptile', 'amphibian']
        for client in clients:
            num_pets = randint(1,5)
            client_pets = []
            for i in range(num_pets):
                new_pet = Pet(
                    name=fake.first_name(),
                    age=fake.random_int(min=0, max=200),
                    species=rc(available_species),
                    notes=fake.sentence(),
                    client_id=client.id
                )
                client_pets.append(new_pet)
            pets.extend(client_pets)
        db.session.add_all(pets)
        db.session.commit()
        print('Pets created...')

        # add requests
        requests = []
        for i in range(15):
            rand_client = rc(clients)
            rand_client_pets = [pet for pet in rand_client.pets]
            rand_pet = rc(rand_client_pets)
            time=datetime.now() + timedelta(days=randint(1,30), hours=randint(1,24))

            new_request = Request(
                details=fake.sentence(),
                location=fake.address(),
                price=randint(20, 500),
                client_id=rand_client.id,
                user_id=rc(users).id,
                pet=rand_pet,
                datetime=time
            )
            db.session.add(new_request)
            requests.append(new_request)
        db.session.commit()
        print('Requests created...')

        print ('Seed complete...')

