# 14 Mongo Populate
This app creates, reads, updates, and deletes files using MongoDB as it's database and Mongoose as middleware.

---
## Intalling and Getting Started
To use this app, for and git clone this repository to your local computer. Navigate to the `lab-melanie` directory and enter `npm install` in your command line, this will install all necessary dependencies.

Either use the Postman app or Httpie to have the ability to create and modify bikes. The following examples will be demonstrated with Httpie.

#### Create a Rider
In your terminal type:
```
http POST :3000/api/v1/rider name=<name>
```
Be sure to use single quotes if the descriptions contain more than one word.

#### Get a Rider
In your terminal type:
```
http GET :3000/api/v1/rider
```
This will return all riders and their IDs, which will be needed to create a bicycle.

#### Create a Bicycle
In your terminal type:
```
http POST :3000/api/v1/bike year=<year> color=<color> make=<make> category=<category> rider=<rider ID (see above)>
```
Be sure to use single quotes if the descriptions contain more than one word.

If your filepath is incorrect, you will recieve an error message, otherwise you will see a status code of 201.

#### Get a Bike (or all bikes)
To get a specific bike, type in your command line:
```
http GET :3000/api/v1/bike/<bike id>
```
This will return the information about the bicycle and it's rider.

To get all bikes:
```
http GET :3000/api/v1/bike
```

This will return a list of all bike ids.

#### Update a Rider
In your command line, type:
```
http PUT :3000/api/v1/rider/<rider ID> name=<new name>
```

#### Update a Bike
In your command line, type:
```
http PUT :3000/api/v1/bike/<bike id> year=<new year> color=<new color> make=<new make> category=<new category>
```
Just as creating a bike, be sure to use single quotes if the descriptions are longer than one word.

#### Delete a Rider
In your command line, type:
```http DELETE :3000/api/v1/rider/<rider ID>
```

#### Delete a Bike
In your command line, type:
```
http DELETE :3000/api/v1/bike/<bike id>
```
This removes the bike from the database and it's relationship to the rider.

---

## Data Structures

### Route-Rider Module
This contains five methods that routes requests and responses from storage:
* `.post` - sends info from the http request to mongo to create a rider and sends a response back to the viewer
* `.get` - this has two methods, one that uses a specific id of a rider to read the file and send the response back to the viewer, the other only needs the schema (in this case `rider`) and returns the response from mongo as a list of rider ids
* `.put` - takes info from the http request and updates a rider in storage, then sends a response back to the viewer
* `.delete` - takes in the http request with a specific rider id, sends it to mongo to `remove` the file, then sends a status message back to the viewer

### Route-Bike Module
This contains five methods that routes requests and responses from storage:
* `.post` - sends info from the http request to mongo to create a bike and sends a response back to the viewer
* `.get` - this has two methods, one that uses a specific id of a bike to read the file and send the response back to the viewer, the other only needs the schema (in this case `bike`) and returns the response from mongo as a list of bike ids
* `.put` - takes info from the http request and updates a bike in storage, then sends a response back to the viewer
* `.delete` - takes in the http request with a specific bike id, sends it to mongo to `remove` the file and it's relationship to a rider, then sends a status message back to the viewer

---

## Tests
The test directory is separated into four subdirectories: 

`integration-bike` contains files to test each http method, `POST`, `GET`, `PUT`, `DELETE`.

`integration-rider` contains files to test each http method, `POST`, `GET`, `PUT`, `DELETE`.

`lib` contains the jest port configuration

`unit-tests` contains files to test modules that the router and server rely on for requests and responses including:

 * `bike` - builds a bike object
 * `rider` - builds a rider object
 * `error-handler` - customizes error messages and returns the corresponding response