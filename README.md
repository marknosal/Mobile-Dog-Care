
## Updating Your README.md

`README.md` is a Markdown file that describes your project. These files can be
used in many different ways- you may have noticed that we use them to generate
entire Canvas lessons- but they're most commonly used as homepages for online
Git repositories. **When you develop something that you want other people to
use, you need to have a README.**

Markdown is not a language that we cover in Flatiron's Software Engineering
curriculum, but it's not a particularly difficult language to learn (if you've
ever left a comment on Reddit, you might already know the basics). Refer to the
cheat sheet in this lesson's resources for a basic guide to Markdown.

### What Goes into a README?

This README should serve as a template for your own- go through the important
files in your project and describe what they do. Each file that you edit (you
can ignore your migration files) should get at least a paragraph. Each function
should get a small blurb.

You should descibe your application first, and with a good level of detail. The
rest should be ordered by importance to the user. (Probably routes next, then
models.)

Screenshots and links to resources that you used throughout are also useful to
users and collaborators, but a little more syntactically complicated. Only add
these in if you're feeling comfortable with Markdown.


- [Markdown Cheat Sheet](https://www.markdownguide.org/cheat-sheet/)



# Mobile Pet Care

This is a full stack application used to help keep track of all your pet sitting/grooming appointments.
It's for the business owner side of things and not the pet owner.  You can sign up or log in and 
then manage your appointtment requests.  You can perform full CRUD on as many requests as you like. 
As well as create create new pet and client records.  Another main feature is the ability to mark requests 
as complete and then accept a payment in custom amount.

To get the application up and running:

1. Fork and clone the repo
2. In the root directory run: pipenv install && pipenv shell
    This creates the virtual environment and installs all dependencies.
3. Then run: npm install --prefix client
    This installs all node dependencies for the front end
4. Run: python server/app.py 
    This runs your backend server/application
5. Run: npm start --prefix client
    This starts the front end application
6. *Optional* run: python server/seed.py
    This wil generate new User, Request, Client, and Pet records.
    username: admin, password: admin is always available

## Back End

In the server directory there are a few further directories. __pycache__ can be ignored.
instance holds a single file: app.db this is the database. migrations holds all the versions of the various 
database migrations.  Each of the files in the server directory servve a different purpose. 

seed.py - is used to generate new records for each model. Unless changed it will automatically generate 
a user with "admin" for both the username and password for easy access.

config.py - this file is used to show how the different record models interact with each other.  First there are imports 
and then we generate the flask application.  The application is configured and the naming convention is defined.
A database and metadata is then created. App is integrated with SQLAlchemy. The database is started and bcrypt is used.
The app has been made RESTful and is allowed to use CORS.

models.py - is used to model the relationships between User, Request, Client, and Pet records.
A User has a 1 to many relationship with Request. Client has 1 to many with Request and User|Client have a many to many through Request. Pet also has a 1 to many relationship with Request.
The models have serialize rules as well as inheriting from the SerializerMixin which allows them to utilize the to_dict() method that helps for creating server responses.

app.py - this is the main file contains all the routes for the application. The app is designed to be RESTful, which helps to map the resources to specific routes.  There is a before_request decorator that will return an Unauthorized response if the user tries to access any route other than the open access list if they are not logged in.  Next is a CheckSession which will return the current user thats logged in or returns an empty string.
    The Login resource helps to authenticate the username/password combo.
    Logout will remove the current lgged in user from the session.
    Signup creates a new User recordf and logs them in.
    UsersById has a patch request built in which is currently used to update the user's earnings.
    Requests has a get that returns all the current requests that are related to the user as well  as a post request so the user can make new requests.  It is built to use current client and pets instead of creating new records if they already exist.
    RequestsById has a patch to handle editting a request and a delete to remove the request from the database.
    Clients ha get and post built in so the user can view the client records associated with them or create a new clent record.  The post option is there mostly for show.  It will create a new Client record but the best way to associate it with the creating user is create a Request, that way it is associated properly.
    ClientsById has a patch method which allows the user to charge them money for the Requests that the User completes
    Pets has get to view all Pets associated with the current user.  It also contains a post request that works similar to the Clients post request in that it will create a new Pet record, but it won't be associated with the current user until a Request has been made.
    PetsById ha a patch request that is used to update the pets notes for later reference and future requests.

The final lines of app.py is to make sure it is run from port 5555 with debug on when ran directly from the command prompt