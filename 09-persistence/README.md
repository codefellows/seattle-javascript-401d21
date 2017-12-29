![cf](http://i.imgur.com/7v5ASc8.png) 09: Persistence
===

## Learning Objectives
* Students will learn about different solutions for persisting data
* Students will be able to persist data using the file system

## Resources
* Read [wiki persistence](https://en.wikipedia.org/wiki/Persistence_(computer_science))
* Read [a Brief History of Databases](http://avant.org/project/history-of-databases/)

## Persistence
Programers have designed many ways to persist data in their applications. Three common forms of persistence are in-memory storage, file system storage, and database storage. Each of theses persistence solutions have circumstantial pros and cons.

In-memory storage has the advantage of being extremely fast, however RAM is small and expensive so this strategy does not work for large amounts of data.

File system persistence is slow, but disk space is cheap so this strategy works well for large assets.

Databases have been designed to store and query large amounts of data with clean interfaces. There are many types of databases that each attempt to solve unique problems. Relational databases like Postgres enforce tabular data and support relationships, joins and transactions. NoSql or (non-relational) databases support storing and retrieving non tabular data, and have grown in popularity with big data and real-time systems.
