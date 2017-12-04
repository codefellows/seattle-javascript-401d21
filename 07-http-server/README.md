![cf](http://i.imgur.com/7v5ASc8.png) 07: HTTP and REST APIs
===

## Daily Plan
* Notes & Daily Recap
  - Labor Day Holiday (Monday)
    - Game plan for next week being a 4-day week
  - Survey feedback

* Code Review - TCP chat server & Tests
* HTTP Overview
  - Req/Res review
  - Status codes
* REST Review
* Lab Preview & HTTP Server Demo
  - Body parser review
  - Url & Query parsers
  - Endpoints & Methods

* [11:00a] Guest Lecture: Testing an HTTP Server - Allie G.

## HTTP Resources
* Skim [Nodejs http module]
* Skim [Wiki list of header fields]
* Read [What is a rest api?]

## Learning Objectives
* Students will be able to identify qualities of the HTTP protocol
* Students will be able to implement a HTTP server using Nodejs
* Students will be able to explain what a HTTP RESTful is

## Overview
#### HTTP
* **HTTP** stands for hyper text transport protocol
* a stateless `request/response` protocol in the `client/server` computing model
* HTTP requests have
 * **METHOD** - used to indicate the type of action preformed on the resource
 * **URL** - used to indicate which resource to affect
 * **HTTP VERSION** - usually `HTTP/1.1`
 * **HEADERS** - used for optional request configuration
 * **MESSAGE BODY** - used with some **METHODS** to pass data to the server

* HTTP responses have
 * **HTTP VERSION** - usually `HTTP/1.1`
 * **STATUS CODE** - a number to indicate the requests success
 * **STATUS MESSAGE** - a name associated with the **STATUS CODE**
 * **HEADERS** - used for optional responses configuration
 * **MESSAGE BODY** - used to pass data back to the client

* **HTTP Status Codes**
  * _note: the following list showcases some of the more common status codes - this is **not** the entire list_

  * **100 - Informational**
    * 100 - continue

  * **200 - Success**
    * 200 - ok
    * 201 - created
    * 202 - accepted
    * 204 - no content

  * **300 - Redirection**
    * 300 - multiple choices
    * 301 - moved permanently
    * 302 - found
    * 304 - not modified
    * 308 - permanent redirect

  * **400 - Client Error**
    * 400 - bad request
    * 401 - unauthorized
    * 402 - payment required
    * 403 - forbidden
    * 404 - not found

  * **500 - Server Error**
    * 500 - internal server error
    * 501 - not implemented
    * 502 - bad gateway
    * 503 - service unavailable

#### REST
* uniform interface
 * resources are identified by urls
 * actions are identified by methods
* stateless
 * the client and server to not maintain a connection for longer than request/response
* cacheable
 * responses must implicitly or explicitly define themselves as cacheable
* client-server
 * using client server architecture for thoughtfully dividing separation of concerns
 * servers store data
 * clients maintain user state and create the user interface
* layered system
 * clients can not tell how the backend is implemented
 * the server could be one server or it could be 1000, but the interface is the same

## HTTP Servers
  * **Overview**
    * to demonstrate the concepts of how a modern REST API is created, we are going to create a vanilla NodeJS HTTP server with simple GET and POST interactions
    * in addition to the server, we'll be building a vanilla body parsing module that is used to parse JSON based requests
    * our server will be using the native NodeJS `http`, `url`, and `querystring` modules
    * _remember:_ the WRRC (web request response cycle) revolves around making a request to a server and the server providing a response
      * we'll be using `req` and `res` objects to access information about the request and the response
        * _note:_ `req` and `res` are just naming conventions (best practice is to use these conventions)

<!--links -->
[Nodejs http module]: https://nodejs.org/api/http.html
[What is a rest api?]: https://medium.com/@lazlojuly/what-is-a-restful-api-fabb8dc2afeb#.nm7uiiltt
[Wiki list of header fields]: https://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields




### Survey Feedback
1. Constructive feedback
  - Better prep for classes
  - I was told that you earn an actual Microsoft Certification from the .net 401 so I would recommend someone to talk that course instead
  - Slow the pace a half tick or cover the topics more thoroughly before sending us off to labs
  - Been a bit more organized

2. How was the last week
  - I feel the first week in 401 was much better structured then the first week in 301. Because I can see a path on what we are learning and where we might be headed with what we are learning I can structure my research and learning.
  - Projector going out wasn't great, but it was an unfortunate situation beyond anyone's control.
  - The fact that the school does not have a spare projector or bulb is really unacceptable. Having lecture for 2 days in the event area when we are trying to cover a rather large topic is a failure on the schools part. It was distracting and very difficult to take notes.
  - Really enjoying the stuff we are learning and I feel like the lecture has been great this week.

3. Least helpful components
  - Code demos
  - Equipment breakdowns
  - We tend to fly over the content for the labs and then have to struggle through it for hours, which i understand it is not supposed to be easy but there are times we really dont get much instruction on the daily lab work.

4. Most helpful components
  - This week should have been taught in 301! The lab 05 which we deconstructed and then reconstructed javascript methods was a great tool to understand how they work. We also took a deep dive into the callstack and callback functions which totally was glossed over in 301, I used them without understand them. Now I "think" I understand them and thought that bitmap was terribly hard but I understand callbacks now.
  - Morning lectures
  - googling stuff that I didnt understand from code demos
  - White boarding was useful, I'm looking forward to learning more about data structures as well.
  - Mob coding has been incredibly helpful!
  - It seems the TA's actually understand the course materials which is helpful when we need them.
  - Everything is great.
  - Having awesome instructor and TAs. And class mates that are willing to stop whatever they doing to help!
  - Even though I haven't been utilizing the TA's help very much in this first week I'm relieved that they seem eager to help and share their knowledge.
  - The lectures have been just the right pace for me this week - not moving too fast or too slow. I also appreciate that the demo code has been really helpful and that there are a lot more readings and notes.

5. Questions, suggestions, concerns
  - Nopes all around.

6. Candid feedback
  - All My TA's have promptly been available whenever I needed them.
  - I've really enjoyed 401JS so far. I appreciate the content and how we are learning things at a deeper level. I also appreciate that we are given the opportunity to work thru problem sets with direction. I think the learning really comes in the struggle.
  - Allie has been fantastic as a TA so far, and her grading and comments have pointed me in the direction that I need to work towards.
  - Great job instructional team!
  - This TA group is awesome - super willing to help out and really friendly. Go TAs!!
