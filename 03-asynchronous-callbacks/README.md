![cf](http://i.imgur.com/7v5ASc8.png) 03: Asynchronous Callbacks
=====================================

## Learning Objectives
* Students will understand how synchronous and asynchronous code runs in the Javascript runtime
* Students will be able to manage asynchronous data flow using error first callbacks
* Students will be able to utilize the asynchronous methods from built-in node modules
* Students will be able to work with raw data using Buffers
* Students will be able to test asynchronous code using a BDD testing framework

## Resources
* Watch [what the heck is the event loop anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* Read [fs module docs](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html)
* Read [Understanding error first callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

## Javascript Runtime
There are many Javascript runtimes. V8 is the name of the runtime used in the Chrome web browser and NodeJS. V8 will be used in the following descriptions of how a Javascript runtime works, but other browsers and Javascript environments have the same behaviors.

#### Hoisting
In Javascript, variable and function declarations get "hoisted" to top of your code before it runs. When the Javascript runtime executes your code, it first reorganizes what you have written so that all variable and function definitions are at the top of their current function scope. Developers that are new to Javascript often find hoisting strange, but it is a feature of the language that cannot be disabled. Learn to use hoisting as a tool!

``` javascript
// code before hoisting (how a programmer wrote the code)
var chars = ['a', 'b', 'c'];
var result = upperCharList(chars);
console.log(result);

function upperCharList(list){
  var result = [];
  for(var i=0; i<list.length; i++){
    var upper = list[i].toUpperCase());
    result.push(upper);
  }
  return result;
}
```

``` javascript
// after hoisting (how the code actually runs)
var chars, result;
function upperCharList(list){
  var result, i, upper;
  result = [];
  for(i=0; i<list.length; i++){
    upper = list[i].toUpperCase();
    result.push(upper);
  }
  return result;
}

chars = ['a', 'b', 'c'];
result = upperCharList(chars);
console.log(result)
```

#### Call Stack
In Javascript, every synchronous function that is called is pushed onto a stack in V8. The function on top of the stack is always the function that is currently executing. When the function that is running returns it is popped off a stack. This stack is referred to as a **Call Stack**. V8 has a single Call Stack, therefor only one function can be running at a time. The Call Stack is always printed to the screen when an error is thrown, which helps developers to trace where errors have occurred in their code.

#### Callback Queue
When an asynchronous function called *"foo"* is invoked, it is pushed onto the V8 **call stack**. Then *"foo"* makes a call to a browser/NodeJS API and passes on a callback. Then the *"foo"* function returns and is popped of the call stack, and V8 keeps on executing synchronous code. Meanwhile, the external browser/NodeJS API is still running. Once the external API has completed it's task, it will pass any results into the callback and enqueue the callback on V8's **callback queue**. Functions stored on the callback queue are not executing, they are only waiting to be put onto the call stack.

#### Event Loop
The event loop is in charge of dequeueing callbacks from the V8 callback queue and pushing them on to the call stack. It has one rule for doing this. It will only push a callback on to the call stack if it is empty.
* when the call stack pops its last function
  * the event loop will check if any callbacks are in the callback queue
  * if it finds a callback it will dequeue it from the callback queue and push it onto the call stack
* when both the call stack and callback queue are empty
  * the event loop will watch the callback queue for new callbacks
  * when a callback is included it will immediately be dequeued and pushed onto the call stack

## NodeJS Callback Pattern
NodeJS made the decision to have all asynchronous events be handled using error first callbacks. The main advantage of this is that all asynchronous methods have a consistent interface. This means that when you are working with asynchronous NodeJS code, you can always assume how the callback is going to be formatted, making your life as a developer much easier!

Having a consistent callback interface has also made it possible for libraries to be written that assist Javascript developers in handling complex async code!

#### Defining an error first callback
* a callback is simply a function that is passed as an argument to another function
* "error first" callbacks have the function signature `(err, result) => {}`
  * the first parameter is reserved for an error
    * the value will be `null` or `undefined` if there is no error
  * the second callback is reserved for any successful response data
    * the value will be `null` or `undefined` if there is no data
    * not every NodeJS method passes data into the callback
    * in methods that do not resolve data, success is defined as a lack of an error

## File System I/O
The NodeJS `fs` module gives NodeJS programmer's the ability to perform file system operations. The `fs` module has the ability to Create, Read, Update, and Delete files using many different methods. Most methods on the `fs` module have synchronous and asynchronous implementations. Synchronous methods end in _Sync_, like `fs.readFileSync`, and asynchronous method's lack the word _Sync_ in their names, like `fs.readFile`. This naming pattern is true across all of the built-in NodeJS modules. Synchronous methods block Javascript from executing further code until they finish. This can be a huge drawback, therefor synchronous methods are rarely used in web server development.

``` javascript
// example of how to copy a file using NodeJS
const fs = require('fs')
const inputFile = './path/to/input.txt'
const outputFile = './path/to/output.txt'

fs.readFile(inputFile, (err, buffer) => {
  if(err) throw err
  fs.writeFile(outputFile, buffer, (err) => {
    if(err) throw err
    console.log('done')
  })
})
```

## Buffer
Buffers are NodeJS built-in constructors for working with binary data, also called raw data. Buffer is a global constructor in NodeJs. When reading from the filesystem, network, or elsewhere data is usually presented to the developer in the form of a buffer. Buffers are an array of bytes, with many useful methods for reading and writing data. The data in buffers can be decoded as integers, floating point numbers, and strings.

 ```
   var data = new Buffer('welcome to bufferville') // create a buffer using a string
   console.log(data) // looks like hex when console logged, but its a buffer not a string!!!!

   console.log(data.toString()) // prints the original string
   console.log(data.toString('hex')) // prints the strings data as hex digits
   console.log(data.toString('utf8', 0, 1)) // prints the character stored in the first byte
   console.log(data.readUInt8()) // prints the integer stored in the first byte
   console.log(data.readFloatLE()) // prints the floating point number stored in the first 4 bytes
 ```


## Asynchronous Testing
Testing frameworks like **MochaJS**, **Jasmine**, and **Jest** support testing asynchronous code by giving us a callback to invoke when our assertions are done. Tests have two seconds to call a  `done` callback before a timeout error occurs. The testing frameworks will treat any value passed into the `done` callback as an error.

``` javascript
// example using done in "it" tests
it('true should be true', (done) => {
  setTimeount(() => {
    expect(true).toBe(true)
    done()
    // done('any value`) // passing a value into done makes the test fail
  }, 0)
  // invoking done here will be a false positive
})
```
