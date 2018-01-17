![cf](http://i.imgur.com/7v5ASc8.png) 03: Asynchronous Callbacks
=====================================

## Daily Plan
- Notes:
    - Anything top of mind?
    - Career Coaching Assignments _heads up that they're coming!!_

- Node Callback Pattern
- The Event Loop
- Recursion
    - Quick code challenge _sum all numbers from 0 to n_
    - Lets solve it with a call stack exercise
- Async (concurrency)
- FS Module _working with the file system_
    - Buffers _Introduction_
- Testing Async Code
  - Tell it when it can be `done` OR just `return` the async code...

- Lab Preview
    - Lab Setups _Code challenges and general labs_
    - Whiteboard Process Discussion


# Learning Objectives
* Students will understand the how synchronous and asynchronous code runs in the Javascript runtime
* Students will be able to manage asynchronous data flow using error first callbacks
* Students will be able to utilize the asynchronous methods on the built-in Node modules
* Students will be able to work with raw data using Node's Buffers
* Students will be able to test asynchronous code using a BDD testing framework

# Resources
* Watch [What the Heck is the Event Loop Anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* Read [Understanding Error First Callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)
* Skim [Node's File System Module Docs](https://Nodejs.org/dist/latest-v9.x/docs/api/fs.html)
* Skim [Node's buffer documentation](https://Nodejs.org/api/buffer.html#buffer_buffer)

# Javascript Runtime
* There are many Javascript runtimes.
* V8 is the name of the runtime used in Chrome browsers and NodeJS.
* V8 will be used in the following descriptions of how JavaScript a runtime works, but other browsers and JavaScript environments have the same behaviors.

# Concurrency
* In programing, concurrency means that a program can run more than one thing at a time.
* The ability to do multiple things at a time can greatly increase the amount of things your program can do in a given moment in time. However, traditional means of handling concurrency are extremely complex, and often lead to bugs!
* Javascript is a single threaded language.
  * Which means that it can only do a single thing at a time.
  * However, the JavaScript runtime is setup in such a way that your programs can still have some concurrent behavior, as long as the concurrent behavior is not implemented in JavaScript.

## Node's Concurrency
* The Node C++ apis are written in such a way that they deal with all the complexities of concurrency for us!
  * We are programming at a higher abstraction - removing the need to deal with lower level threading
  * The NodeJS event loop operates under a single thread
    * NodeJS uses many threads "underneath the hood" (libuv)
* NodeJs concurrency through the use of events and callbacks
  * When a JavaScript function makes a call to Node APIs, it passes the Node API a callback.
    * The Node api does it thing
    * Passes its results into the callback
    * Enqueues the callback onto the callback queue
### Call Stack
* The stack keeps track of each function that is currently running in JavaScript
* At any given point in time JavaScript is only running the function on top of the call stack
* Each time a function gets invoked it gets pushed onto the call stack
* Each time a function returns it gets popped from the call stack
### Event Loop
* when NodeJS starts up, it processes the input script then begins processing the event loop
* The event loop constantly checks if the call stack is empty
* When the stack is empty it dequeues any functions on the callback queue and pushes them onto the stack
### Callback Queue
  * The callback queue holds completion handling functions from passed Node APIs
  * Functions stored on the Callback Queue are not executing, they are only waiting to be put on to the Call Stack.

## Node asynchronous callback pattern
* Node functions that have asynchronous input or output take a callback as the last argument
  * Node functions that do not pass back data always have callback functions take the form `(err) => { }`
  * Node functions that do pass back data always have callback functions take the form `(err, data) => { }`


# Working With Binary Data (Part 1)
## Bits and bytes
* A bit is the smallest unit of data in a computer
  * A bit contains a single binary value, 0 or 1
* A byte is comprised of 8 bits
  * We often refer to a nibble as 4 bits (half of a byte)
## Endianness
* Refers to the order of bytes
* Little endian
  * Bytes are written from left to right
* Big endian
  * Bytes are written from right to left
## Buffers
* Buffers are an array of bytes
* Example:
  ```Javascript
    var buff = Buffer.from('Welcome to Bufferville');
    console.log(buff);
    <Buffer 77 65 6c 63 6f 6d 65 20 74 6f 20 62 75 66 66 65 72 76 69 6c 6c 65>
  ```
* Common encoding types:
  * UTF-8 (default)
    * `buff.toString('utf-8')`
  * Base64
    * `buff.toString('base64')`
  * Hex
    * `buff.toString('hex')`

## File System (a.k.a FS) Module
* The FS module is the Node interface to the file system
* The FS module has synchronous and asynchronous methods
* If the method does not have sync in its name you can assume its synchronous
* In this class we will **NEVER** use the synchronous methods
* Useful globals
  * `__dirname` - the absolute path to the directory the current file is in
  * `__filename` - the absolute path to the current file
* Create File
  * `fs.writeFile(filepath, data [, options], callback);`
  * The callback should take the form `(error) => {}`
* Read File
  * `fs.readFile(filepath [, options], callback);`
  * The callback should take the form `(error, data) => {}`
* Delete File
  * `fs.unlink(filepath, callback);`
  * The callback should take the form `(error) => {}`
* Other useful methods
  * `readdir` - reads the contents of a directory
  * `mkdir` - create a directory
  * `stat` - get information about a file/dir/link
  * `watch` - watch a file for changes

#### Asynchronous Testing
 * **Calling `done`**
   * Jest gives us a short timeframe to call `done` before a timeout error occurs
     * be sure to call `done` in the appropriate location (usually, this in your internal logic)
     * calling `done` in the wrong block will likely cause a false positive test result

 * **demo:** testing file system I/O