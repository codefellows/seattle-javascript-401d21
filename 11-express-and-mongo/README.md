![cf](http://i.imgur.com/7v5ASc8.png) 11: Express and Mongo
===

## Learning Objectives
* Students will learn about MongoDB and Express
* Students will be able to create RESTful HTTP servers through the use of Express
* Students will be able to persist data using MongoDB

## Resources
* Skim [express api docs](http://expressjs.com/en/4x/api.html)
* Read [express routing](http://expressjs.com/en/guide/routing.html)
* Read [MongoDB Driver QuickStart](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/quick-start/)
* Skim [MongoDB Driver Collection API Docs](http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html)

## Express
ExpressJS is a lightweight framework for building web servers. ExpressJS extends the NodeJS `http` module with a minimal feature set that enables developers to build quickly build powerful web applications. Express features include routing with url params, error handling, a static server, cookie and link helpers, convenience methods for sending json and jsonp, location and redirect management, request parsing, server side rendering, and a framework for creating middleware to extend express.

## MongoDB
MongoDB is a free and open-source document oriented database. This is referred to as a NoSQL database management system. It allows developers to create schemas and store and query JSON like documents. MongoDB has a powerful query system that supports field queries, range queries, and regular expression searches. Documents can be indexed with primary and secondary keys. MongoDB databases can scale horizontally using a technique called sharding, that enables many MongoDB databases to act as one through the use of a load balancer. MongoDB has an aggregation framework that enables developers to process data and return computed results. MongoDB has grown in popularity among teams that strive for agile and rapid development of their products. It is a great database for storing key value pairs.

Although MongoDB has many great features for build modern web application, it is not good at solving the following problems:

 - MongoDB does not support joins, and therefor doesn't model relational data well
 - It is not good for storing binary data (like images)
 - It is not small enough to run as an embedded DB (like on a phone)
 - It is also not good a doing large MapReduce jobs (huge aggregations)

 If your application is depending on doing many of these operations, you may want to consider using other database technologies.

MongoDB, like many databases, is built on the client-server model. A MongoDB Server called a Mongo [Daemon](https://en.wikipedia.org/wiki/Daemon_(computing)) is run as a background task on a host. A Client such as a MongoDB Shell or MongoDB Driver can connect to the MongoDB Dameon to run queries. MongoDB Drivers are libraries that enable developers to make queries from a programing language.
