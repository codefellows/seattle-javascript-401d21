01 : Node Ecosystem
===

# Learning Objectives
* Students will be able to set up a node project
* Students will be able to create node modules that conform to the CommonJS module pattern
* Students will be able to construct and run unit tests
* Students will be able explain the TDD philosophy of red, green, refactor

-----

## Readings
### Node.js 
* Read [About Node]
* Read/Skim [Node Modules](https://nodejs.org/docs/latest/api/modules.html#modules_modules)
* Skim [Node API](https://nodejs.org/docs/latest-v7.x/api/)
* Skim [About V8]
* Skim [What is NPM]

### Test-Driven Development 
* Read [A Gentle Intro to TDD in JS]
  * Read only part 1
  * We'll be using a different framework (Mocha) than the one used in this article, but most of the concepts and principles are applicable to the framework we'll be using (Jest)
* Read [Getting Started with Jest](https://facebook.github.io/jest/docs/en/getting-started.html) 
* Skim [Expect Docs](https://facebook.github.io/jest/docs/en/expect.html)

### ES6 
* Read [Just Another Guide to ES6]
* Skim [Node's ES6 Docs]

-----

## Setting up a development workspace
Before people are developers, they often develop many habits they will need to unlearn:
* Use the command line whenever possible. In the long run it will save you a lot of time.
* It is highly important to keep our file system organized.
  * If your problem is finding your code, you are in deep trouble!.
  * Create a dir structure for keeping track of you class work.
* File naming tips
  * Never put space bars in your file names.
  * Use `-` or `_` instead. But choose one and stick with it... don't use both!.
  * Never use capital letters in your filenames, unless its convention (like README.md).
    * Some file systems (like osx) don't keep track of Case and will cause git issues.
``` text
 * $HOME/
  | - Desktop/
  | - Downloads/
  | - ...
  | - cf-401/
  |   | - labs/
  |   |   | - lab-01-node-ecosystem
  |   |   | - lab-02-tools-and-context
  |   |   | - ...
  |   | - lecture-notes/
  |   |   | - class-01-node-ecosystem
  |   |   | - class-02-tools-and-context
  |   |   | - ...
  ```
## Node.JS
* Node is an asynchronous, event-driven runtime used to build back-end (a.k.a Server Side) JavaScript applications.
* Node uses an "event loop" to work only when events are triggered.
    * When Node has no work to be done, Node sleeps.
* Node input and output (I/O) is non-blocking. 
  * This save developers from having to worry about concurrent programming patterns.
* At a high level, Node is composed of two main components:
  * __Javascript API__ : 
    * Internally, Node uses [libuv](https://github.com/libuv/libuv) for I/O.
  * __V8 Javascript engine__
* Node's documentation has a stability index.
  * 0 - deprecated - don't use the feature.
  * 1 - Experimental - don't use this feature in something you care about.
  * 2 - Stable - fine to use.
  * 3 - Locked - fine to use.
* *Make sure you read the docs for the version of node you're using.*

## NPM
* NPM is a package manager for installing javascript libraries.
* NPM is composed of the following.
  * A registry where all the packages are hosted.
  * A search engine where you can find packages.
  * A CLI where that helps you interface with the registry.
  * A for profit organization.

## CommonJS modules
* Modules are used to break down applications into smaller pieces.
* Why are modules useful?
  * The common `<script src=""></script>` pattern used to work with JavaScript loads variables and functions into global scope.
  * Relying in the global space is error-prone due to naming conflicts and unexpected side-effects.
  * Modules allow us to explicitly define what's loaded in the global scope.
    * This plays a huge role in allowing Javascript developers to build large scale applications. 

### Using CommonJS modules
* In Node.js, every JavaScript file is a module.
* CommonJS modules work based on 2 main elements:
  * The `module.exports` object
    * Anything that is assigned to module.exports can be accessed by other modules via the `require` function. 
    * Everything else will be hidden from other modules.
  * The `require` function
    * Searches and loads CommonJS modules.
    * The require function expects a relative or absolute path to the module being imported. 
      * Like: `require('./relative/path/to/the/module.js')`. 
* CommonJS modules cannot be co-dependent
  * If module "A" requires module "B" then "B" can not also require "A".
* *ES6 introduced a different module format that is not compatible with CommonJS modules.*
   * *At this time, both ES6 and CommonJS modules are common in JavaScript codebases, so we'll learn both in this course.*

## Testing and TDD
* TDD is a software development process where you write tests before you write code.
* It relies on a very short development cycle.
  * It encourages to build small things at a time.
### TDD Process
* This process is called __red, green, refactor__:
* __Red__
  * Bake a plan for the features needed to make a program work.
  * Choose a feature to implement.
  * Write code that tests that features behavior.
  * The tests now should fail, because the feature has not been implemented.
* __Green__ 
  * Write the feature itself.
  * The tests now should pass, because the feature has been implemented.
* __Refactor__ 
  * Refactor you code to optimize it.
  * The tests should still pass, because the behavior should not have changed.

## Jest 
* Jest is a testing framework.
  * Its job is to facilitate writing and running tests.
* Expect is an assertion library.
  * Its job facilitate writing expectations and then throw errors when the expectations are not met.
* When testing with jest, we'll primarily work with 3 functions:
  * `descride`
  * `test`
  * `expect`

<!--links -->
[About Node]: https://nodejs.org/en/about/
[Node's ES6 Docs]: https://nodejs.org/en/docs/es6/
[libuv Docs]: https://github.com/libuv/libuv
[About V8]: https://developers.google.com/v8/
[What is NPM]: https://docs.npmjs.com/getting-started/what-is-npm
[A Gentle Intro to TDD in JS]: http://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/
[Just Another Guide to ES6]: https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f#.wb7rj1gin
