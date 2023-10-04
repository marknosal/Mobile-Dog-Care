#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

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
        new_user = User(
            name=fake.name(),
            age=fake.random_int(min=18, max=99),
            email=fake.email(),
            earnings=0.00,
        )
        db.session.add(new_user)
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
        for i in range(30):
            random_client = rc(clients)
            new_pet = Pet(
                name=fake.first_name(),
                age=fake.random_int(min=0, max=200),
                species=rc(available_species),
                client_id=random_client.id
            )
            pets.append(new_pet)
        db.session.add_all(pets)
        db.session.commit()
        print('Pets created...')
