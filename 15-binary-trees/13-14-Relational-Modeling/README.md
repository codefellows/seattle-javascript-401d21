![cf](https://i.imgur.com/7v5ASc8.png) Lab 13: Express and Mongo two resource RESTful API
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
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables **(should be git ignored)**
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc** - contains the course linter configuration
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
For this assignment you will be building a RESTful HTTP server using express.

#### Model
In the model/ directory create a Model for a resource using Mongoose (that is different from the class lecture resource). The model must include 4 properties, two of which should be required. Design your model so that it can have a relationship to a second model you will create tomorrow. It should be the `One` in a `One to Many` model relationship.

#### Server Endpoints
Create the following routes for performing CRUD operations on your resource
* `POST /api/<resource-name>` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and the created resource 
  * on failure due to a bad request send a 400 status code
* `GET /api/<resource-name>/:id` 
  * should respond with the resource and a 200 on success
    * if the id is not found respond with a 404
* `PUT /api/<resource-name>/:id`    
  * should respond with the updated resource and a 200 on success
    * if the id is not found respond with a 404
    * if the request is invalid it should respond with a 400
* `DELETE /api/<resource-name>/:id` 
  * the route should delete a resource with the given id 
  * on success this should return a 204 status code with no content in the body
  * on failure due to a resource with that id not existing respond with a 404 status code

## Tests
* Write tests to ensure the `/api/resource-name` endpoint responds as described for each condition below:
* POST should test for 200, 400, and 409 (if any keys are unique)
* GET should test for 200 and 404
* PUT should test for 200, 400, 404, and 409 (if any keys are unique)
* DELETE should test for 204 and 404

## Documentation
In the README.md write documention for starting your server and making requests to each endpoint it provides. The documentation should describe how the server would respond to valid and invalid requests.

## Bonus 1pt
* Create and test a GET route with pagination for returning an array of your resource.
