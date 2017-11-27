![cf](http://i.imgur.com/7v5ASc8.png) 02: Tools and Context
===

# Learning Objectives
* Students will understand the difference between context and scope
* Students will be able to control a functions context using call, apply, and bind
* Students will be able to handle thrown errors using try and catch 
* Understand the role context plays in constructor functions
* Students will be able to define npm scripts for automating command line tasks

# Resources
### Package.json
* Read [About package.json](https://docs.npmjs.com/files/package.json)

### NPM Scripts
* Skim [NPM scripts as build tools](https://www.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
* Skim [NPM scripts docs](https://docs.npmjs.com/misc/scripts)
* Skim [semver](http://semver.org/)

### Context
* Read [MDN this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
* Watch [Javascript context tutorial](https://www.youtube.com/watch?v=fjJoX9F_F5g)

### Prototype
* Read [MDN inheritance and the prototype chain]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
* Skim [MDN New](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)
* Skim [MDN object prototype]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)

### Errors
* Read [Node error docs](https://nodejs.org/dist/latest-v6.x/docs/api/errors.html)


# package.json
* A `package.json` is a config file used for configuring metadata about a node module.
* It only requires a name and version field, but a typical package.json has much more information.
* Dependencies and Dev-dependencies
  * Dependencies : a list of packages required to run the main program
  * Dev-dependencies : a list of packages required to develop the module
* NPM scripts are used to manage common tasks for working a node project  
* Setting up a project checklist
  * Create a new directory named after your project
  * Navigate inside your directory
  * Run `npm init` and answer the questions
  * Now you should find a `package.json` inside your current directory :)

# Context vs Scope
* Every function invocation has both a scope and a context associated with it. 
* Scope is function-based while context is object-based. 
* Scope pertains to the variable access of a function when it is invoked and is unique to each invocation. 
* Context is always the value of the `this` keyword which is a reference to the object that “owns” the currently executing code.


# Node Errors
## Error
* a generic error
* `.stack` - a **String**. Describes the point in the code where the `Error` was instantiated
* `.message` - a **String**. Description set by calling the `new Error(message)`  

## ReferenceError
* Indicates that an attempt is being made to access a variable that is not defined
* `ReferenceError` is a subclass of `Error`  

## SyntaxError
* indicates a program is not valid javascript
* `SyntaxError` is a subclass of `Error`  

## TypeError
* indicates that a provided argument is not an allowable type
* `TypeError` is a subclass of `Error`    

## SystemError
* `.code` - A **String** describing the error code
* `.errno` - A **Number** describing the error code
* `.syscall` - A **String** describing the syscall that failed
* `SystemError` is **not** a subclass of `Error`
* Common System Errors
 * `EACCESS` - An attempt to access a file without the right permissions
 * `EADDRINUSE` - An attempt to start a server on a PORT that is already in use
 * `ECONNREFUSED` - A connection was deliberately refused by the target machine
 * `ECONNRESET` - A connection was forcibly closed by a peer
 * `EEXIST` - A file exists and the attempted action required that it didn't
 * `EISDIR` - An action expected to act on a file but found a directory
 * `EMFILE` - To many files were open for your operating system to handle
 * `ENOENT` - An action expected a file, but did not find one
 * `ENOTDIR` - An action expected a directory, but found something else
 * `ENOTEMPTY` - An action expected an empty directory, but found one with data in it
 * `EPERM` - An attempt to do something that you currently don't have permissions to do
 * `EPIPE` - An attempt to write data to a connection that had been closed

# Throw Try Catch
* If an un handled error is thrown in javascript the program will crash
* try catch blocks allow you to safely throw a an error and handle it

# Pass by reference vs Pass by value
* Objects are passed by reference
* Strings, Numbers, Bools, undefined, and null are passed by value

# Call, Bind, Apply
* when a function has a `this` we say that `this` is the functions context
* unlike scope a functions context can be configured
* If a function is not a property on an object, by default it has no context
* If a function is a property on an object, by default that object is the context for that function
* `call`, `bind`, and `apply` are function prototype methods that allow us to change the context of a function
* `call` is a methods on a function that invokes a function with a specified context and arguments  
 * `call` passes comma separated arguments
* `apply` is a methods on a function that invokes a function with a specified context and arguments  
 * `apply` passes arguments from an array  
* don't mess with `__proto__` its slow **not even to read a property**
* if you want to determine an objects prototype use `Object.getPrototypeOf(someObject)`
* don't nest a lot of prototype's it will have a speed impact on your code
* if you look up a property that is not on any object on the prototype chain it will still look through the whole prototype chain
