![cf](http://i.imgur.com/7v5ASc8.png) 17: Bearer Authorization
===

## Learning Objectives
* Students will be able to create a Bearer Authentication parser
* Students will learn to implament Access Controls in there HTTP server routes

## Resources
* Read [intro to jwt](https://jwt.io/introduction/)

## Access Controlls
Access Controlls are the selective restriction of resources. Access Controlls are implamented everywhere in computer systems. Unix files have read write and execute permissions assiged to owners, groups, and everyone else. Websites have limit access to pages based on the credentials of a user. APIs restrict access to internal and external developers differnaly. 

In our REST APIs it is important to limit access to clients based on credentials. This means a user Foo should not be able to delete a user Bar's resource, unless Bar said that Foo is allowed to. Limiting what actions a user can preform on a given resource is called Access Controll. A user can be given a token at signup and login, and that user can pass that token back to the server on requests with limited access controlls. Once the server parses the token into a user it can determine if the user is authorized to preform the request. 

## Bearer Authorization
Bearer authorization is a common way send a user token in an http request. The user token is placed after the string 'Bearer ' and the resulting string is set to the Authorization header. Bearer authorization is often used to create routes with access contriols. A server can decode the token into a user and determine if the client is authorzied to make the request.

```
let token = '98asdf7987asfd987as98df79a8s7f9d87as98df79a8s7f98as7fd9a8s7df987adfs798'

request({
  method: 'POST'
  url: 'https://api.example.com/notes',
  data: {content: 'get milk!'},
  headers: {
    Authorization: `Bearer ${token}`
  },
})
.then(handleLogin)
.catch(handleLoginError) 
```
