![cf](http://i.imgur.com/7v5ASc8.png) 16: Basic Authentication
===

## Learning Objectives
* Students will learn about cryptographic hash and cyper algorythems and some of their uses
* Students will be able to model a User and safely store their sensitive data 
* Studetns will be able to implament a Basic Authourization parser

## Resources
* Read [basic auth](https://en.wikipedia.org/wiki/Basic_access_authentication)

## User Modeling
Modern web applications need to model sensitive information about their users. When a users provides an applications with sensitive infromation, they are trusting that it will not leeked are missued. This means its a developers responsiblity to store that information responsibly. Some information like emails, usernames, and addresses can be stored in plain text, as long as the database is password protected and or behind a firewall. Other information like a users password should be encrypted using a hashing algorythm before it is ever stored, preventing anyone (including developers with database permssions) from ever getting access to their password.  

User models that have sensitive data should **NEVER** be sent to client applications. If your application requires that users be able to read each others personal information, create a second Profile model to hold that data, and strictly limit access controlls to the Profile model. Safely using a second model will ensure that no users will accidenlty or mallisiously get access to sensitive information. 

## Cryptography 
> The science which studies methods for encoding messages so that they can be read only by a person who knows the secret information required for decoding, called the key; it includes cryptanalysis, the science of decoding encrypted messages without possessing the proper key, and has several other branches.  

\- [GNU Collaborative International Dictionary of English](http://gcide.gnu.org.ua) 

#### Hash Algorythems
A Cryptographic Hash Algorythem takes a piece of data and produses a hash that is deliberatly dificult to reverse. If identical data is passed into the algorythem the same hash will allways be produced. Hash algorythems are often used for checking the integrity of data. 

In a User model a hash password can be stored when the user signs up. When the user needs to login they can resend their password and the server can hash the login password using the same hash algorythem. The server can then compare the hashed login password with previously stored hashed password to determin if the user should be authenticated.

#### Cyper Algorythems
A Cryptographic Cyper Algorythem takes a piece of data and a key and produces encrypted data. Later the encrypted data can be reversed into the original data, by decrypting it using the same key. 

User tokens can be created by associated a random unique string (tokenSeed) with a user account and encrypting the tokenSeed with a secret key only the server knows. We can then send the encrypted token to a client application. When the client makes a future request they can send back the token. The server can reverse the token into the tokenSeed by decrypting it with the secret key, and because the tokenSeed was unique the database can be quiered to produce the user who made the request. 

## Basic Authorizaton
Basic Authorization is a common method used to send a username and password in an HTTP request. The username and password are joined with a ':' then base64 encoded and then placed after the string 'Basic '. The resulting string is set to the value of an Authorization header.

A Server can decode the Basic Authorization header to retrieve the username and passowrd. Its important to note that base64 encodeing is not a form of encryption. The client and server must use HTTPS to protect the username and password as it travels across the network.

``` javascript
let encoded = window.btoa('slugbyte:secretpassword')
// c2x1Z2J5dGU6c2VjcmV0cGFzc3dvcmQ=

request({
  method: 'GET',
  url: 'https://api.example.com/login',
  headers: {
    Authorization: `Basic ${encoded}`,
  },
})
.then(handleLogin)
.catch(handleLoginError)
``` 

