CF-GRAM
===
> a social photo platform REST API

## Configuration
Create a `.env` file and configure it with the following environment variables
``` bash
PORT=3000
DEBUG=true
CORS_ORIGINS='<one or more cors origins (space separated)>'
MONGO_URI='<mongo uri>'
SECRET='<random string>'
AWS_ACCESS_KEY_ID='<a aws access key id>'
AWS_SECRET_ACCESS_KEY='<a aws secret access key>'
AWS_BUCKET='<a aws bucket>'
```

## Running CF-Gram
* Start a mongodb `yarn db-on`
* Start the server `yarn start`

## API Resources
#### User Model
The user model is used in the back-end strictly for authentication and authorization. The user model will never be returned from the API, however userID's are stored on Profiles, Photos, and Comments for authorization validation.

* `_id` - an unique database generated string which uniquely identifies a user
* `email` - a unique string which stores the users email
* `username` - a unique string that stores the users username
* `passwordHash` - a string that holds a users hashed password
* `tokenSeed` - a unique and random string used to generate authorization tokens

#### Profile Model
Each user can have a single profile. Authorization is required for Creating, Updating, and Deleting Profiles but they have public read access.

* `_id` - an unique database generated string which uniquely identifies a profile
* `owner` - the user id of the profiles creator
* `email` - a unique string which stores the profiles email
* `username` - a unique string that stores the profiles profil ename
* `avatar` - a string holding a URL to a profile photo
* `bio` - a string holding a profiles bio

#### Photo Model
Each user can have may photos. Authorization is required for Creating, Updating, and Deleting Photos but they have public read access.

* `_id` - an unique database generated string which uniquely identifies a profile
* `owner` - the user id of the photos creator
* `profile` - stores a the creators profile ID. the profile is populated on GET requests
* `comments` - stores an array of comment IDs. the comments are populated on GET requests
* `url` - a string which store a url to the photo
* `description` - a string with a description of the photo

#### Comment Model
Each user can have many comments, and each photo can have may comments. Authorization is required for Creating, Updating, and Deleting Comments but they have public read access.

* `_id` - an unique database generated string which uniquely identifies a profile
* `owner` - the user id of the photos creator
* `profile` - stores a the creators profile ID. the profile is populated on GET requests
* `photoID` - stores the photo id of the photo the comment is a response to
* `content` - a string with the users comment

## Auth
CF-Gram uses Basic authentication and Bearer authorization to enforce access controls. Basic and Bearer auth both use the HTTP `Authorization` header to pass credentials on a request.

#### Basic Authentication
Once a user account has been created Basic Authentication can be used to make a request on behalf of the account. To create a Basic Authorization Header the client must base64 encode a string with the username and password separated by a colon. Then the encoded string can then be append to the string `'Basic '` and set to an `Authorization` header on an HTTP Request.

``` javascript
// Example of formating a Basic Authentication header in Javascript
let username = 'slugbyte'
let password = 'abcd1234'

let encoded = window.btoa(`${username}:${password}`)
let headers = {
  Authorization: `Basic ${encoded}`
}
```

#### Bearer Authorization
After a successful sign-up or login request the client will receive a token. Bearer Authorization uses that token to make a request on behalf of that user account. The token should be append to the string `'Bearer '` and set to an Authorization header on an HTTP Request.

``` javascript
// Example of formating a Bearer Authorization header in Javascript
let token = '11983261983261982643918649814613298619823698243'

let headers = {
  Authorization: `Bearer ${token}`
}
```

---


#### POST `/signup`
a HTTP POST request to /signup will create a new user account.

###### request
* Expected Headers
  * Content-Type: application/json
* Request Body
  * JSON containing a username, email and password

``` json
{
  "username": "slugbyte",
  "email": "slugbyte@slugbyte.com",
  "password": "abcd1234"
}
```

###### response
The response body will be a **bearer token**.

---

#### GET `/login`
A HTTP GET request to /login will login (fetch a token) to an existing user account.

###### request
* Expected Headers
  * Basic Authorization for the user account

###### response
The response body will be a **bearer token**.

## Profiles
#### POST `/profiles`
A HTTP POST request to /profiles will create a new profile.

###### request
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data
* Expected Body
  * a `bio` field containing string with the users bio
  * a `image` filed with the users avatar image

###### response
the response will be a JSON profile

---

#### GET `/profiles`
a HTTP GET request to /profiles will return an array of profiles
###### request
* Optional Query Parameters
  * SEE PAGINATION

###### response
See pagination

---

#### GET `/profiles/:id`
a HTTP GET request to /profiles/:id  will return a profile
###### response
the response will return a JSON profile

---

#### GET `/profiles/me`
a HTTP GET request to /profiles/:id  will return a profile
###### request
* Expected Headers
  * Bearer authorization
###### response
the response will return a users JSON profile


---

#### PUT `/profiles/:id`
a HTTP PUT request to /profiles/:id will update a profile
###### request
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data or application/json
* Optional Body Fields
  * an optional `image` filed with the users avatar image
    * photo uploads are only possible for Content-Type: multipart/form-data
  * an optional `bio` field containing string with the users bio

###### response
the response will return a JSON profile

---

#### DELETE `/profiles/:id`
a HTTP DELETE request to /profiles/:id will delete a profile
###### request
* Expected Headers
  * Bearer authorization

###### response
the response will have no body and a status of **204**

## Photos
#### POST `/photos`
A HTTP POST request to /photos will create a new photo. A photo cannot be created until the User has created a profile.

###### request
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data
* Expected Body
  * a `photo` filed with the file asset
  * a `description` field

###### response
the response will be a JSON photo

#### GET `/photos`
a HTTP GET request to /photos will return an array of photos
###### request
* Optional Query Parameters
  * SEE PAGINATION

###### response
See pagination

#### GET `/photos/:id`
a HTTP GET request to /photos/:id  will return a photo
###### response
the response will return a JSON profile

#### PUT `/photos/:id`
a HTTP PUT request to /photos/:id will update a profile

###### request
* Expected Headers
  * Bearer authorization
  * Content-Type: multipart/form-data or application/json
* Optional Body Fields
  * an optional `photo` filed with a replacement photo
    * photo uploads are only possible for Content-Type: multipart/form-data
  * an optional `description`

#### DELETE `/photos/:id`
a HTTP DELETE request to /photos/:id will delete a profile
###### request
* Expected Headers
  * Bearer authorization

###### response
the response will have no body and a status of **204**

## Comments
#### POST `/comments`
#### GET `/comments`
#### GET `/comments/:id`
#### PUT `/comments/:id`
#### DELETE `/comments/:id`
