![cf](http://i.imgur.com/7v5ASc8.png) 03: Asynchronous Callbacks
=====================================

## Learning Objectives
* Students will understand the how syncronous and asyncronous code runs in the Javascript runtime
* Students will be able to manage asyncrous data flow using error first callbacks
* Students will be able to utilize the asyncronous methods on the built-in node modules
* Students will be able to work with raw data using Node's Buffers
* Students will be able to test asyncronous code using a BDD testing framework 

## Resources
* Watch [what the heck is the event loop anyway](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
* Read [fs module docs](https://nodejs.org/dist/latest-v6.x/docs/api/fs.html)
* Read [Understanding error first callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)

## Javascript Runtime
There are many Javscript runtimes. V8 is the name of the runtime used in Chrome browsers and NodeJS. V8 will be used in the following descriptions of how javascript a runtime works, but other browsers and javascript environments have the same behaveiors.

#### Hoisting
In javascript variable and function declartions get "hoisted" to top of your code before it runs. When the javascript runtime executes your code, it first reorganizes what you have written so that all variable and function definitions are at the top of their current function scope. Developers that are new to Javascript often find hoisting strange, but its a feature of the language that cannot be disabled. Learn to use hoisting as a tool!

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
// after hoisting (how the code actualy runs)
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
In javascript every syncronus function that is called is push onto a stack in V8. The function on top of the stack is allways the function that is currently executing. When the function that is running returns it is poped off a stack. This stack is referd to as a **Call Stack**. V8 has a single Call Stack, therefor only one function can be running at a time. The Call Stack is allways printed to the screen when an error is thrown, which helps developers to trace where errors have occurd in their code. 

#### Callback Queue
When an asyncronous function called *"foo"* is invoked it is pushed onto the V8 Call Stack. Then *"foo"* makes a call to a Browser/Node API and passes on a callback. Then the *"foo"* function returns and is poped of the Call Stack, and V8 keeps on exicuting Syncronous code. Meanwhile the external Browser/Node API is still running. Once the external API has completed its task it will pass any results into the callback and enqueue the callback on V8s **Callback Queue**. Functions stored on the Callback Queue are not executing, they are only waiting to be put on to the Call Stack.

#### Event Loop
The event loop is in charge of dequeueing callbacks from the V8 Callback Queue and pushing them on to the Call Stack. It has one rule for doing this. It will only push a callback on to the Call Stack if it is empty.
* When the Call Stack pops its last function
  * The Event Loop will check if any callbacks are in the Callback Queue
  * If it finds a callback it will dequeue it from the Callback Queue and Push it on the Call Stack
* When both the Call Stack and Callback Queue are empty
  * The Event Loop will watch the Callback Queue for new callbacks
  * When a callback is encuded it will be immediatly dequeued and pushed on to the Call Stack

## NodeJS Callback Pattern
NodeJS made the decision to have all asyncronus events be handled using error first callbacks. The main advantage of this is that all aysncrouns methods have a consisitant interface. This means that when you are working with Asyncrouns NodeJS code, you can allways assume how the callback is going to be fromated, making your life as a developer much easier! 

Having a consistant callback interface also has made it possible for librarys to be written that javascript developers in handling complex async code. 

#### Defining an error first callback
* a callback is simply a function that is passed as an argument to another function
* "error first" callbacks have the function signature `(err, result) => {}`
  * the first paramiter is reserved for an error 
    * the value will be null or undefiend if there is no error
  * the second callback is reserved for any successful response data 
    * the value will be null or undefiend if there is no data
    * not every NodeJS method passes data into the callback. In methods that do not resolve data success is defined as a lack of an error

## File System I/O
The NodeJS `fs` module gives Node proggrammers the ability to perform file system opperations. The `fs` module has the ability to Create, Read, Update, and Delete files using many different methods. Most methods on the fs module have syncronous and asyncronous implimentatins. Syncronous methods end in _Sync_, like `fs.readFileSync`, and asyncronous method's lack the word _Sync_ in their names, like `fs.readFile`. This naming pattern is true across all the built in node modules. Syncronous methods block javascript from exicuting further code until they finish. This is a can be a huge drawback, therefor Syncronous methods are rarley used in web server development.

``` javascript
// example of how to copy a file using nodejs
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
Buffers are nodes built in constuctor for woking with binary data, also called raw data. `Buffer` is a global constructor in NodeJs. When reading from the filesystem, network, or elsewhere data ususaly is presented to the devloper in the form of a buffer. Buffers are an array of bytes, with many useful methods for reading and writing data. The data in buffers can be decoded as integers, floating point numbers, and strings.
 ```
   var data = new Buffer('welcome to bufferville') // create a buffer using a string
   console.log(data) // looks like hex when console logged, but its a buffer not a string!!!!
   
   console.log(data.toString()) // prints the original string
   console.log(data.toString('hex')) // prints the strings data as hex digits
   console.log(data.toString('utf8', 0, 1)) // prints the character stored in the first byte
   console.log(data.readUInt8()) // prints the intiger stored in the first byte 
   console.log(data.readFloatLE()) // prints the floating point number stored in the first 4 bytes
 ```
    

## Asynchronous Testing
Testing frameworks like Mocha, Jasmine, and Jest support testing asyncronus code, by giving us a callback to invoke when our assertions are done. Tests have two seconds to call `done` callback before a timeout error occurs. The testing frameworks will treat any value passed into the `done` callback as an error.

``` javascript
// example using done in "it" tests
it('true should be true', (done) => {
  setTimeount(() => {
    expect(true).toBe(true)
    done()
    // done('any value`) // passing a value into done makes the test fail
  }, 0)
  // invoking done here will be a false positve
})
```
