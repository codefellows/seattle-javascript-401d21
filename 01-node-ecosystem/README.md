![cf](http://i.imgur.com/7v5ASc8.png) 01 : Node Ecosystem
===

# Daily Plan
* Intros
* Class overview 
  - What are we going to do over the next ten weeks?
  - What are we covering this week? Today?
* Workspace discussion... how organized are you?
* Node.js / NPM Intro/Review
* Test Driven Development
  - Writing basic assertions
  - Jest as a test runner
* Node.js Modules
  - Running scripts
  - Creating modules
  - Working with exports
* Lab Process Overview
* Lab Assignment Preview

# Learning Objectives
* Students will be able to set up a node project
* Students will be able to create node modules that conform to the CommonJS module pattern
* Students will be able to construct and run unit tests
* Students will be able explain the TDD philosophy of red, green, refactor

# Resources
### Node.js
* Read [About Node]
* Skim [libuv Docs]
* Skim [About V8]

### ES6 
* Read [Just Another Guide to ES6]
* Skim [Node and ES6]

### NPM 
* Read [What is NPM]

### Testing 
* Read [A Gentle Intro to TDD in JS]
* Read [expect docs](https://github.com/mjackson/expect)
* Read [Getting Started with JEST]


# Setting up a development workspace 
* Before people are developers they often development many habits of computer usage they will need to unlearn
* It is highly important that as a developer people keep there file system organized
* If your problem is finding your code, you are in deep trouble!
* Students should set up a directory for all there class work and never deviate from working outside of this dir
* Create a directory structure for keeping track of you class work
 * **Never put space bars in your file names**
 * **Use `-` or `_` instead. But choose one and stick with it... don't use both!**
 * **Never use capital letters in your filenames, unless its convention (like README.md)**
   * some file systems (like osx) don't keep track of Case and will cause git issues

## Sample Structure
``` text
 * $HOME/
  | - Desktop/
  | - Downloads/
  | - ...
  | - cf-401/
  |   | - labs/
  |   |   | - lab-01-node-echosystem
  |   |   | - lab-02-tools-and-context
  |   |   | - ...
  |   | - lecture-notes/
  |   |   | - class-01-node-ecosystem
  |   |   | - class-02-tools-and-context
  |   |   | - ...
  ```
# Node.JS
* Node is an asynchronous event driven framework, for programming in javascript on your operating system!
* Node only does work when events are triggered.
* When Node has no work to be do Node sleeps
* Node input and output (I/O) is non-blocking
⋅* This save developers from having to worry about complicated concurrent programming patterns!
* Node is composed of four main components
⋅* Node Javascript API - The Javascript interface to all the cool C++ APIs
⋅* V8 - a javascript runtime
⋅* libuv - a c library for async io (for the operating system)
⋅* Node C++ APIs - the glue between Node's Javascript APIs and libuv
* Node has great documentation online, but make sure you read the docs for the version of node your using
* Nodes documentation has a stability index
 * 0 - deprecated - don't use the feature
 * 1 - Experimental - don't use this feature in something you care about
 * 2 - Stable - fine to use
 * 3 - Locked - fine to use

# NPM
* NPM is a package manager for installing javascript libraries
* NPM is composed of the following
 * A registry where all the packages are hosted
 * A search engine where you can find packages
 * A CLI where that helps you interface with the registry
 * A for profit organization

# Testing and TDD
* TDD is a software development process
* It relies on a very short development cycle
 * It encourages to build small things at a time
* TDD Process
 * you make a plan for the features needed to make a program work
 * you choose a feature to implement
 * you write code that tests that features behavior
 * the tests now should fail, because the feature has not been implemented
 * you write the feature it self
 * the tests now should pass, because the feature has been implemented
 * you refactor you code to optimize it
 * the tests should still pass, because the behavior should not have changed
* This is process is called RED GREEN REFACTOR
 * RED - the test is written, but fail
 * GREEN - the test pass because the feature is implemented
 * REFACTOR - the code runs better, and the test still pass

## Jest and Expect
* Jest is a testing framework
 * Its job is to facilitate writing and running test
* Expect is an assertion library
 * Its job facilitate writing expectations and then throw errors when the expectations are not met

<!--links -->
[About Node]: https://nodejs.org/en/about/
[libuv Docs]: https://github.com/libuv/libuv
[About V8]: https://developers.google.com/v8/

[Just Another Guide to ES6]: https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f#.wb7rj1gin
[Node and ES6]: https://nodejs.org/en/docs/es6/

[What is NPM]: https://docs.npmjs.com/getting-started/what-is-npm
[A Gentle Intro to TDD in JS]: http://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/
[Getting Starting with JEST]: https://facebook.github.io/jest/docs/en/getting-started.html#content