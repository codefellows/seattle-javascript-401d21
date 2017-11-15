![cf](http://i.imgur.com/7v5ASc8.png) 19: Continous Integration and Deployment 
===

## Learning Objectives
* Students will be able to deploy their application on Heroku with a continupus delivery pipeline
* Students will be able to configure TravisCI to run their tests on all pushes to GitHub
* Studetns will learn about Continuous Integration
* Studetns will learn about Continuous Delivery

## Resources
* Read [Deploing NodeJS Apps on Heroku](https://devcenter.heroku.com/articles/deploying-nodejs)
* Read [Getting started with NodeJS on TravisCI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs)

## Continuous Integration
Continuous Intigraion (CI) is the process of regulary merging individauly developed features of code into a shared repository as frequently as they are made. In the most basic setup a team could simpaly use Git to merge code into a master branch. However more advanced CI patterns can be develped, that automate static analysis (lining), running unit and integration tests, testing platform support, enforcing code reviews, and much more. 

## Continuous Delivery
Continuous Delivery (CD) is the process of deploing software in short cycles, by ensuring that software can be deployed at any time. CD pairs very wil with advanced CI setups that help ensure the core product is allwas a stable code base.
