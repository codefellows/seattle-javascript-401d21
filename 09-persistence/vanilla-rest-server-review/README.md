![cf](https://i.imgur.com/7v5ASc8.png) Lab 08: REST API
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Resources
* [node uuid docs](https://github.com/kelektiv/node-uuid)

## Configuration 
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.env** - contains env variables **(should be git ignored)**
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
  * create a `lint` script for running eslint
  * create a `test` script for running tests
  * create a `start` script for running your server
* **lib/** - contains module definitions
* **model/** - contains module definitions
* **route/** - contains module definitions
* **\_\_test\_\_/** - contains test modules

## Feature Tasks  
For this assignment you will be building a RESTful HTTP server. The server will store all resources in memory.

#### Request Parser
The request parser module should return a promise that parses the request url, querystring, and  POST or PUT body (as JSON).

#### Model
In the model/ directory create a constructor for a resource (that is different from the class lecture resource). The model must include 4 properties, including an `id` property generated using node uuid.

#### Server Endpoints
Create the following routes for performing CRUD operations on your resource
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
  * on failure due to a resource with that id not existing respond with a 404 status code

## Tests
* Write tests to ensure the `/api/resource-name` endpoint responds as described for each condition below:
  * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
  * `GET`: test 200, it should contain a response body for a request made with a valid id
  * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
  * `POST`: test 200, it should respond with the body content for a post request with a valid body
