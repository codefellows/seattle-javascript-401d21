## REST API built using Express and MongoDB
This is a server built from express and MongoDB that uses a MongoDB model to save api hits. It is setup as an inventory of resumes.. 

## Motivation
I was motivated by an extreme desire to learn web development which led me to enroll in this program which ultimately led me to this assignment. 

## Resumes Schema
Should have the following characteristics:
- unique Project
- unique ID (via MongoDB)
- name
- age
- timestamp

## Tech/framework used
Node.JS, Javascript, 
### Dependencies necessary for production: 
- dotenv
- express
- mongoose
- parser
- winston
- body-parser
### Dependencies necessary for development: 
- eslint
- faker
- jest
- superagent


## Features
Server should run and respond to API put, post, get and delete calls regarding resumes. 

## Installation
Clone this repo to your local machine then install the npm dependencies necessary to run this guy. 

## Tests
There are four tests right now.
```
- GET : 404 : should respond with a 404 error for any valid requests with an id that was not found
- GET : 200 : should respond with a 200 status if there are no errors
- POST : 200 : should respond with a resume and a 200 status code if there is no error
- POST : 400 : should return a 400 code if sent an incomplete resume
- POST : 409 : should return a 409 if the project (unique) already exists
- DELETE : 204 : should respond with a 204 status if there are no errors when deleting based on a specific id
- DELETE : 404 : should respond with a 404 status if the id provided is incorrect
- PUT : 200 : a put request should update a resume and respond with a 200 if there are no errors
- PUT : 404 : should return a 404 if the resume doesnt exist
- PUT : 409 : should return a 409 if the project (unique) already exists

- 
```

## How to use?
Once you install the dependencies you should be able to run `npm run test` to start the tests which starts the server in your CLI. Also you want to open and start a database in a different tab in your CLI. run `npm dbon` to turn on the mongo server.


## Contribute
If anyone wants to help, feel free to open a pull request and send it over. PRs will be answered in the order they are received. 

## Credits
Initial codebase created by the Vinincio Vladimir Sanchez Trejo. 
Mad props to anyone who helped me and my parents for birthing me.

#### Anything else that seems useful
```You miss 100% of the shots you don't take. Wayne Gretzky.``` 

-Michael Scott.  

## License
MIT License