# Code Fellows: Code 401d19: Full-Stack JavaScript

## Lab 08: RESTful HTTP Server
A RESTful HTTP server with GET, POST, and DELETE routes. Users can POST trials bike objects to the server, GET trials bike objects back, and DELETE trials bike objects.

## Tech/frameworks/packages

- node 
- npm
- node packages
  - jest
  - eslint
  - dotenv
  - winston
  - http
  - url

## Code Example

1. `POST`
      `echo '{"make":"Scorpa","model":"Twenty","displacement":300,"color":"orange","year":2016}' | http post localhost:3000/api/trials-bikes`
1. `GET`
      `http get localhost:3000/api/trials-bikes`
1. `GET` with id
      `http get localhost:3000/api/trials-bikes?id=dc256e50-db1b-11e7-9f4a-2bb8540a5f`
1. `DELETE`
      `http delete localhost:3000/api/trials-bikes?id=dc256e50-db1b-11e7-9f4a-2bb8540a5f`
## Installation

1. Fork and clone https://github.com/RobertMcReed/08-09-vanilla-rest-server to your computer.
1. `cd` into `lab-rob/` and run `npm install`.
1. `touch .env` and add `PORT=3000`.

## Tests

run `npm test` to check tests.

1. POST should respond with a 200 status code and the trials bike object sent in the request if things go correctly.
1. POST should respond with a 400 status code and an object containing an error property if an invalid/no object is sent.
1. GET should respond with a 200 status code and all posted objects if no query string id is given.
1. GET should respond with a 200 status code and a single posted trials bike object if a valid query string id is given.
1. GET should respond with a 404 status code and an object with an error property if an invalid query string id is given.
1. DELETE should respond with a 204 status code and an empty body if a valid query string id is given.
1. DELETE should respond with a 400 status code and an object containing an error property if an invalid/no id is sent.
1. DELETE should respond with a 404 status code and an object containing an error property if an invalid query string id is given.

## How to use?

After installation, from `lab-rob/` run `npm start` to start the server. 

From a different terminal window, make POST requests using httpie (install with homebrew if you need it).

All requests should hit the endpoint `/ap1/trials-bikes`

POST requests must send an object with the following keys:
```
make, model, displacement, color, year
```

GET without a query string will return an array of all posted objects.

GET with a query string of `id` matching an object with the given `id` property will return the specific object.

DELETE with a query string of `id` matching an object with the given `id` property will remove the specific object from the array of objects.

## Contribute

You can totally contribute to this project if you want. Fork the repo, make some cool changes and then submit a PR.

## Credits

Initial codebase created by Vinicio Vladimir Sanchez Trejo.

## License

MIT. Use it up!