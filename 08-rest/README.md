![cf](http://i.imgur.com/7v5ASc8.png) 08: Vanilla REST API
=====================================

## Readings
* Watch [Promises](https://www.youtube.com/watch?v=2d7s3spWAzo)
* Read [getting started with promises](https://developers.google.com/web/fundamentals/getting-started/primers/promises)
* Watch [promises](https://www.youtube.com/watch?v=2d7s3spWAzo)
* Skim [httpie docs](https://httpie.org/doc)

## Learning Objectives
* Students will learn to use promises to manage async code
* Students will learn to create a RESTful api with in memory persistence

# Overview
## Promises
  * **Overview**
    * promises are used to solve the problem of nested callbacks (aka: "callback hell")
    * they provide us with a way to make asynchronous code easier to read and follow
    * a promise represents a value which can be available now, in the future, or never
    * basic usage: `new Promise(function(resolve, reject) { ... });`
    * one of the biggest benefits of promises is through the use of the `then()` and `catch()` methods
      * these methods are used to handle returned promises and can be chained as they are on the `Promise` prototype

  * **States**
    * **pending** - initial state - not fulfilled or rejected
    * **fulfilled** - the operation completed successfully
    * **rejected** - the operation failed

  * **Methods**
    * `Promise.all()` - returns a promise that fulfills when all of the promises in an provided array have fulfilled *or* returns a promise that rejects when one of the items in the array rejects
    * `Promise.reject()` - returns a `Promise` object that is rejected
    * `Promise.resolve()` - returns a `Promise` object that is resolved with a given value
    * `catch()` - returns a `Promise` that deals with rejected cases only
    * `then()` - returns a `Promise` that deals with fulfilled cases
    * **demo:** working with promises

## Vanilla REST API
  * **Overview**
    * we'll be creating a vanilla REST API, with a custom router, that uses custom built and native NodeJS modules (with the exception of `uuid`)
      * the router we will be creating will mimic the core functionality of the router supplied by `express.js`
    * in addition to the creation of our API, we'll be adding tests that check our API calls for the expected response data
      * this will be done through the use of `superagent` and Jest (`expect`)

## URI vs URL
A URI is a string of characters used to identify a resource. A URI could be an book ISBN, a street address, a web address, or anything else. URLs are URIs that idedentify resources on the world wide web. A URL must contain everything it needs to retrieve a resource. `/dashboard` is a URI where `https://www.example.com/dashboard` is a URL.

#### Generic URI Anatomy 
```
   scheme          auth             host      port      path             query         fragment
  ┌────┴────┐┌──────┴─────────┐┌─────┴───────┐┌─┴─┐┌─────┴──────┐┌─────────┴──────────┐┌──┴───┐
  protocol://username:password@api.example.com:3000/path/resource?key=value&key2=value2#fragid1
```

#### RESTful HTTP Methods
| METHOD | URI | Function | 
| --- | --- | --- | 
| POST | /api/notes | Create a note resource | 
| GET | /api/notes or /api/notes/:id  | Read a note resources or a note resource | 
| Put/Patch | /api/notes/:id | Update a note resource |
| Delete |  /api/notes/:id | Delete a note resource |
| HEAD | /api/notes/:id | Read metadata about note a resource |
| OPTIONS |  /api/notes | Discover methods available for a note resources |

## Server Side Routers
Server side routers provide an interface to define how server should respond to a given endpoint. An endpoint is defined as a HTTP method in combanation with a URI path. Routers help simpify complexity and increase readablitiy.
