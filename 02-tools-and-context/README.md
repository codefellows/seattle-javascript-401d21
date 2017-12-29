![cf](http://i.imgur.com/7v5ASc8.png) 02: Tools and Context
=====================================

## Learning Objectives
* Students will be able to define npm scripts for automating command line tasks
* Students will be able to control function context by using `call`, `apply`, and `bind`
* Students will be able to handle thrown errors using `try` and `catch`
* Students will be able to interpret the different types of errors in Javascript

## Resources
* Read [about package.json]
* Skim [npm scripts as build tools]
* Skim [npm scripts docs]
* Read [semver](http://semver.org/)
* Read [node error docs]
* Read [mdn this]
* Watch [javascript context tutorial]

## package.json
The `package.json` file is used to describe and configure a NodeJS package. The only two fields that are required by a package.json are `name` and `version`. If a package has external dependencies, they are listed by name and version under the fields `dependencies` and `devDependencies`. If the package depends on an external package to run, the external package should be listed under `dependencies`. If the external package is only needed in development (like a testing framework), it should be listed under `devDependencies`. `package.json` files can have a `scripts` field where keys can be associated with unix commands. NPM scripts have the added benefit that they can run any command line utility (CLI) defined in a dependency, without globally installing the CLI on you operating system.

#### Semantic Versioning
The NodeJS/NPM community follows semantic versioning (semver). Semantic versioning describes how to manage version changes to a software product. Semver formats the version number using a `MAJOR.MINOR.PATCH` construct. You should change a MAJOR version when you make incompatible API changes, a MINOR version when you add functionality in a backwards-compatible manner, or a PATCH version when you make backwards-compatible bug fixes.

## Errors
Error messages are super important tools for debugging broken code. Javascript has many built in error messages, but you can also define your own errors in your programs. It is important to not forget that errors will happen in production. Error logs are kept in order to fix bugs in productions. Writing good error messages is critical for finding and fixing bugs in deployed applications.

#### Writing good error messages
A great error message should have the following features
* a timestamp so that a timeline of the error can be made
* a message about the problem that occurred
* a message about the cause of the problem
* a consistent format (so that it can be parsed and searched)
* a severity level (low, med high) or (0 - 10)

``` javascript
// creating a smart error
class Bug extends Error {
  constructor({problem, cause, level=0, timestamp=new Date().toISOString()}){
    super(`__ERROR__ ${problem}: ${cause} (LEVEL ${level}) (TIMESTAMP ${timestamp})`)
    this.problem = problem
    this.cause = cause
    this.level = level
    this.timestamp = timestamp
  }
}

let error = new Bug({problem: 'cannot create user', cause: 'requires password'})
```

#### Handling Thrown Errors
Javascript functions can throw errors. Throwing errors is a great way to force developers to use a function correctly, because un-handled errors will crash Javascript and stop program execution. This is often referred to as *failing fast*. The idea is that the sooner the code fails, the sooner a developer will find their bugs and fix them. Though throwing errors is a useful feature of the language itself, programs like servers need a way to continue running in spite of bugs in the code. Javascript has a `try {} catch (error) {}` syntax for handling this.

``` javascript
let userInput = '{'
try {
 let data = JSON.parse(userInput)
 // do something with data
} catch(e) {
  console.error(e)
}
```

#### Error Cheat Sheet
| Type |  Reason |
| --- | --- |
| Error | generic error |
| ReferenceError | an attempt was made to access a variable that is not defined |
| SyntaxError | the javascript is not valid |
| TypeError | a provided argument was no the allowable type |
| SystemError | a NodeJS error that occurs when a system error has occurred |

###### System Error Cheat Sheet
* `EACCESS` - an attempt to access a file without the right permissions
* `EADDRINUSE` - an attempt to start a server on a PORT that is already in use
* `ECONNREFUSED` - a connection was deliberately refused by the target machine
* `ECONNRESET` - a connection was forcibly closed by a peer
* `EEXIST` - a file exists and the attempted action required that it didn't
* `EISDIR` - an action expected to act on a file but found a directory
* `EMFILE` - too many files were open for your operating system to handle
* `ENOENT` - an action expected a file, but did not find one
* `ENOTDIR` - an action expected a directory, but found something else
* `ENOTEMPTY` - an action expected an empty directory, but found one with data in it
* `EPERM` - an attempt to do something that you currently don't have permissions to do
* `EPIPE` - an attempt to write data to a connection that had been closed

## Context
By default, when a Javascript function belongs to an object, it is called a method. The object the method belongs to is called the methods **context**. In a function, the keyword `this` points to it's context.

A functions context can be reassigned using the function methods `call`, `apply` and `bind`. Arrow functions inherit their parent context, and cannot use call, apply, and bind.

#### Call
`call` is a function method that invokes a function with a specified context and comma separated arguments

``` javascript
Array.prototype.reduce.call('hello world', (result, char) => result + char.toUpperCase(), '')
```
#### Apply
`apply` is a function method that invokes a function with a specified context and an array of arguments

``` javascript
let args = [(result, char) => result + char.toUpperCase(), '']
Array.prototype.reduce.apply('hello world', args)
```
#### Bind
`bind` is a function method that returns a new function with specified context and comma separated default args

``` javascript
// define a generic DOM mutation function
function childrenSet(...children){
  this.innerHTML = children.join(' ')
}

// reset the DOM using childrenSet and call
childrenSet.call(document.body, '<div id="logo"></div>', '<div id="warning"></div>')

// create DOM mutation helpers using bind
const bodyClear = childrenSet.bind(document.body)
const logoGet = () => document.getElementById('logo')
const warningGet = () => document.getElementById('warning')
const logoSet = childrenSet.bind(logoGet(), 'code fellows')
const warningSet = childrenSet.bind(warningGet(), 'WARNING:')

// use the DOM mutation helpers
logoSet()
warningSet('password is required')

logoGet().addEventListener('click', () => {
  bodyClear()
})

warningGet().addEventListener('click', () => {
  warningSet('the sky is falling')
})
```

<!--links -->
[node error docs]: https://nodejs.org/dist/latest-v6.x/docs/api/errors.html
[about package.json]: https://docs.npmjs.com/files/package.json
[npm scripts as build tools]: https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
[npm scripts docs]: https://docs.npmjs.com/misc/scripts
[mdn new]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new

[mdn object prototype]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype
[mdn inheritance and the prototype chain]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
[mdn this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
[Javascript Context Tutorial]: https://www.youtube.com/watch?v=fjJoX9F_F5g
