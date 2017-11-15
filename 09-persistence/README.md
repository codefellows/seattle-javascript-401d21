![cf](http://i.imgur.com/7v5ASc8.png) 09: Persistence
===

## Learning Objectives
* Students will learn about different solutions for persiting data
* Students will be able to persist data using the file system

## Resources
* Read [wiki persistence](https://en.wikipedia.org/wiki/Persistence_(computer_science))
* Read [a Breif History of Databases](http://avant.org/project/history-of-databases/)

## Persistence
Programers have designed many ways to persist data in their applications. Three common froms of persistance are in-memory stoarge, file system storage, and database storage. Each of theses persistance solutions have circomestantial pros and cons. 
In memory storage has the advantage of being extremly fast, however RAM is small and expensive so this stragey does not work for large amounts of data. File system persistance is slow, but disk space is cheap so this stratagy works well for large assets. Databases have been designed to store and query large amounts of data with clean interfaces. There are many types of databases that each attempt to solve unique problems. Relational databases like postgres enforce tabular data and support relasionships, joins and transactions. NoSql or (non-relational) databases suport storing and retrieving non tabular data, and have grown in popularity with big data and real-time systems. 
