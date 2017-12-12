## REST API built using Express and MongoDB
This is a server built from express and MongoDB that uses a MongoDB model to save api hits. It is setup as in inventory of mountains. 

## Motivation
I was motivated by an extreme desire to learn web development which led me to enroll in this program which ultimately led me to this assignment. 

## Mountains
Should have the following characteristics:
- unique ID (via MongoDB)
- name
- state
- range

## Tech/framework used
Node.JS, Javascript, 
### Dependencies necessary for production: 
- dotenv
- express
- mongoose
- parser
- winston
### Dependencies necessary for development: 
- eslint
- faker
- jest
- superagent


## Features
Server should run and respond to API put, post and delete calls regarding mountains. 

## Installation
Clone this repo to your local machine then install the npm dependencies necessary to run this guy. 

## Tests
There are four tests right now.
```
- GET : 404 : should respond with a 404 error for any valid requests with an id that was not found
- GET : 200 : should contain a response body for a request made with a valid id
- POST : 400 : should respond with a bad request if no request body was provided or the body was invalid
- POST : 200 : should respond with the body content for a post request with a valid body
```

## How to use?
Once you install the dependencies you should be able to run `npm run test` to start the tests which starts the server in your CLI. 


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