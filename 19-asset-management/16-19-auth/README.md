![cf](https://i.imgur.com/7v5ASc8.png) Lab 17: Authentication
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
For this assignment you will be building a RESTful HTTP server with basic authentication useing express.

#### Account
Create a user `Account` model that keeps track of a username, email, hashed password, and token seed. The model should be able to regenorate tokens using json web token. 

#### Server Endpoints
* `POST /signup` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new account
  * on success respond with a 200 status code and an authentication token
  * on failure due to a bad request send a 400 status code

## Tests
* POST should test for 200, 400, and 409 (if any keys are unique)

## Documentation
In the README.md write documention for starting your server and makeing requests to each endpoint it provides. The documentaion should describe how the server would respond to valid and invalid requests.
