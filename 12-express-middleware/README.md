![cf](http://i.imgur.com/7v5ASc8.png) 12: Express Middleware
===

## Learning Objectives
* Students will be able to create and use Express middlewar
* Students will learn about Cross Site Origin Resource Scripting (CORS)
* Students will be able to implement CORS on an HTTP server

## Resources
* Skim [morgan docs](https://github.com/expressjs/morgan)
* Skim [cors docs](https://github.com/expressjs/cors)
* Skim [dotenv docs](https://github.com/motdotla/dotenv)

## Express middleware
Express middleware are functions that have access to the request object, response object, and `next`. Middleware is chained together, and can effect the entire app or a single route. Middleware often processes the request or application state and then modifies the request or response. Modifying the request and/or response object is useful because future middleware and routes will have access to that information. Middleware use cases include parsing authorization and authentication, parsing json, xml, or mulitpart/form-data request bodies, logging, interacting with external APIs to send or retrieve data, and much more. Any middleware can end the middleware chain by sending a response.

#### middleware example  
``` javascript
// parses the request body as JSON
// onSuccess the request will have a body and text properties
// onFailure an error will be passed to the next error middleware
module.exports = (req, res, next) => {
   let text = ''
   req.on('err', next)
   req.on('data', (data) => text += data.toString())
   req.on('end', () => {
      try {
        req.body = JSON.parse(text)
        req.text = text
        next()
      } catch (err) {
        next(err)
      }
   })
}
```

#### error middlware example   
``` javascript
// log errors and respond with 500 status code
module.exports = (err, req, res, next) => {
  console.error(err)
  res.sendStatus(500) // ends the middleware chain
}
```

## CORS
All Browsers follow the [same-origin policy](https://en.wikipedia.org/wiki/Same-origin_policy) and have been designed to limit client access to HTTP servers that a client source is not being hosed on. Cross Site Origin Resource Scripting (CORS) is a mechanism that clients and servers can implement so that browsers will know which HTTP requests an external script (script hosted on a different domain) is allowed to make. CORS use a set of headers on both the client request and server response to dictate to the browser what Access Controls are in place.

#### Preflighted Requests
Preflighted requests are HTTP requests sent using the OPTIONS method to the resource on the domain. Preflight requests are sent to gather information about the resource before making the actual request. Cross-Site requests are automatically preflighted by the browser to make sure the actual request is valid to send.

#### CORS Request Headers
* The `Origin` header is required to be set on all CORS Requests. Its value should be the domain that the client is hosted on.
* The `Access-Control-Request-Method` header is used in a pre-flight request to determine which types of request methods are available for a given URI path.
* The `Access-Control-Request-Headers` header is used in a pre-flight request to determine which types of request methods are available for a given URI path.

###### Example CORS Preflight Request
```
OPTIONS /api/note HTTP/1.1
Host: api.some-service.com
Origin: https://www.example.com
Access-Control-Request-Method: POST,PUT,GET,DELETE
Access-Control-Request-Headers: Content-Type, Authorization
```

#### CORS Response Headers
* The `Access-Control-Allow-Origin` specifies that a URI may access the resource
* The `Access-Control-Allow-Methods` is used in a preflight response to specifie which methods are allowed when accessing a resource
* The `Access-Control-Allow-Headers` is used in a preflight response to specifie which headers are allowed when making the actual request

* The `Access-Control-Allow-Credentials` is used in preflight response to specifie if the actual request can be made using credentials (cookies)
* The `Access-Control-Expose-Headers` is used in preflight response to specifie that which custom server headers should be exposed to the browser
* The `Access-Control-Max-Age` is used in a preflight response to specifie in seconds how long the response can be cached

###### Example CORS Preflight Response
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://www.example.com
Access-Control-Allow-Method: POST,GET
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Expose-Headers: App-Token
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 900000
```
