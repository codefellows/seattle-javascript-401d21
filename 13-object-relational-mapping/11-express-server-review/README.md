![cf](https://i.imgur.com/7v5ASc8.png) Lab 11: Express and Mongo REST API
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Resources
* [express docs](http://expressjs.com/en/4x/api.html)
* [mongoosse guide](http://mongoosejs.com/docs/guide.html)
* [mongoosse api docs](http://mongoosejs.com/docs/api.html)

## Configuration 
Configure the root of your repository with the following files and directories. Thoughfully name and organize any aditional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables **(should be git ignored)**
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc** - contains the course linter configuratoin
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `test` script for running tests
  * create a `start` script for running your server
  * create `dbon` and `dboff` scripts for managing the mongo daemon
* **db/** - contains mongodb files **(should be git ignored)**
* **lib/** - contains module definitions
* **model/** - contains module definitions
* **route/** - contains module definitions
* **\_\_test\_\_/** - contains test modules

## Feature Tasks  
For this assignment you will be building a RESTful HTTP server useing express.

#### Model
In the model/ directory create a Model for a resource using Mongoose (that is different from the class lecture resource). The model must include 4 properties, two of which should be required.

#### Server Endpoints
Create the following routes for performing CRUD opperations on your resourcee
* `POST /api/<resource-name>` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and the created note 
  * on failure due to a bad request send a 400 status code
* `GET /api/<resource-name>` and `GET /api/<resource-name>?id={id}` 
  * with no id in the query string it should respond with an array of all of your resources
  * with an id in the query string it should respond with the details of a specifc resource (as JSON)
    * if the id is not found respond with a 404
* `DELETE /api/<resource-name?id={id}>` 
  * the route should delete a note with the given id 
  * on success this should return a 204 status code with no content in the body
  * on failure due to lack of id in the query respond with a 400 status code
  * on failure due to a resouce with that id not existing respond with a 404 status code

## Tests
* Write tests to ensure the `/api/resource-name` endpoint responds as described for each condition below:
  * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
  * `GET`: test 200, it should contain a response body for a request made with a valid id
  * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
  * `POST`: test 200, it should respond with the body content for a post request with a valid body
  
## Documentation
In the README.md write documention for starting your server and makeing requests to each endpoint it provides. The documentaion should describe how the server would respond to valid and invalid requests.

## Bonus 1pt
* Create and test a put route
