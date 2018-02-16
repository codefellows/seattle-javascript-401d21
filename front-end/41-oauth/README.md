![cf](http://i.imgur.com/7v5ASc8.png) 41: OAuth 
===

## Learning Objectives
* Students will learn to set up a Google Cloud appliction
* Students will learn to implament OAuth2 on the server side 

## Readings
* Skim [OAuth wiki](https://en.wikipedia.org/wiki/OAuth)
* Read [OAuth2 simplified](https://aaronparecki.com/oauth-2-simplified/)
* Read [Google OAuth2 Docs](https://developers.google.com/identity/protocols/OAuth2)
* Read [Google OAuth Server Side](https://developers.google.com/identity/protocols/OAuth2WebServer)
* Read [Google Openid Docs](https://developers.google.com/identity/protocols/OpenIDConnect)

## OAUTH2.0
OAuth is an open standard for access delegation. It servers as a way to give users the ability to grant apps access to services, without giving the apps their password. 

#### Access Code
* First the client needs to grant the application permision.
* To do this you need to give an anchor tag that will take them to the services authorzation page
* The anchor tag should pass the following information through a query string to the authorzation server
  * `response_type=code` indicates that your server wants to recieve an authorzation code
  * `client_id=<your client id>` tells the authorization server which app the user is granting access to
  * `redirect_uri=<your redirect uri>` tells the auth server which server enpoint to redirect to 
  * `scope=<list of scopes>` tells the auth server what you want the user to give access to 
  * `state=<anything you want>` a place where you can store info to pass to your server if you want

#### Access Token
* If the users grants access to the app the auth server will redirect to your redirect uri calback with a code
* Once you have a code you can exchange it for and access token by making a post request to the authorzation server and providing the following information
  * `grant_type=authorization_code`
  * `code=<the code your recieved`
  * `redirect_uri=REDIRECT_URI` must be same as the redirect uri your client provied
  * `client_id=<your client id>` tells the auth server which app is making the requests
  * `client_secret=<your client secret>` authenticates that the app making the request is the app registered with the `client_id` 
* once you get an Access Token you can use it to make API calls to the service on be have of that user 
