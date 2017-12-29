![cf](http://i.imgur.com/7v5ASc8.png) 19: Continuous Integration and Deployment
===

## Learning Objectives
* Students will learn about continuous integration and delivery
* Students will be able to deploy their application on Heroku with a continuous delivery pipeline
* Students will be able to configure TravisCI to run their tests on all pushes to GitHub

## Resources
* Read [Deploying NodeJS Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* Read [Getting started with NodeJS on TravisCI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)

## Continuous Integration
Continuous Integration (CI) is the process of regularly merging individually developed features of code into a shared repository as frequently as they are made. In the most basic setup a team could simply use Git to merge code into a master branch. However more advanced CI patterns can be developed, that automate static analysis (lining), running unit and integration tests, testing platform support, enforcing code reviews, and much more.

## Continuous Delivery
Continuous Delivery (CD) is the process of deploying software in short cycles, by ensuring that software can be deployed at any time. CD pairs very will with advanced CI setups that help ensure the core product is always a stable code base.
