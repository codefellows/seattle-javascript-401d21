![cf](http://i.imgur.com/7v5ASc8.png) 01: Node Ecosystem
=====================================

## Learning Objectives
* Students will be able to set up a NodeJS Package using npm
* Students will be able to write commonjs modules
* Students will be able to to write unit tests for syncronous Javascript code.
* Students will be able to use to test driven development methodologies

## Resources 
* Read [about nodejs]
* Skim [libuv docs]
* Skim [about v8]
* Read [what is npm]
* Read [just another guide to ES6]
* Skim [node and es6 docs]
* Read [a gentle intro to tdd in js]
* Read [expect docs](http://chaijs.com/api/bdd/)
* Read [mocha getting started guide]

## Use Your Computer Like A Developer
It's time to unlearn any bad computer usage habbits, you may have developed in you pre-programmer years. It is critical that you keep your file system organized. Writing code is dificult enough, so dont allow your problem to be finding your code on the file system. You should also come up with a system for naming your files, and never deviate from it!!! Keep all of your projects in one place, and allways use version control. Use best git pratices even when you are working on personal projects! Use the command line when ever posible, in the long run it will save you many hours of time. 

#### File Naming Tips
Name all of your files with cabob-case ("-" separated words). Don't use uppercase letters unless you want the file to appear first when you run `ls`. In git projects it is standard to capitalize README.md for this reason.

## NodeJS
NodeJS is an open source framework for writing javascript on your operating system. Node is compromised of the **V8** Javascript runtime, and the **NodeAPIs**. V8 suports many features in the lastest version of Javascript called ES6 (or ES2015) which has added many new syntax features and optimizations. V8 is the Javascript runtime developed for the Chrome browser, and is written in C and C++. The Node APIs are writtend in C, C++, and Javascript. Node was developed to enabled developers to easily write code with asynchronous input and output (IO). In many other langauges asyncronous IO creates a lot of work for developers, and can be error prone. Node uses an event loop driven non-blocking architecture, that enables node to have a very low overhead when it is not running. Node has an increadibly rich ecosystem of packages available through the Node Package Manager (NPM). 

## CommonJS modules
NodeJS supports commonjs modules, enabling developers to organize their code into small files that define specific functionality. This plays a huge role in allowing Javascript developers to build large scale applications. In a commonjs module anything that is assigned to `module.exports` can be accessable to other modules module through invoking the `require`  function. The require expects a relative or absolute path to the module being imported, like `require('./relative/path/to/the/module.js')`. CommonJS modules can not be co-dependent, meaning that if module "A" requires module "B" then "B" can not also require "A".

## Test Driven Development
Test driven development (TDD) is a methodology for writing code. TDD relies on a very short development cycle, this means that it expects developers to create small testable features. TDD can speed up development time, validate the integrity of new code, and help developers understand their goals. TDD is brokend down into three steps called `red`, `green`, and `refactor`.

###### RED
Make a plan for the code that needs to be written, in order to solve your goal. Write tests that will run that code and check for expected behaviors. At this point if you run your tests, they should fail (red).

###### GREEN
Write code to pass the specifcations of your tests, without making it perfect. If you succeed, when you run your tests they should pass (green) 

###### REFACTOR
Refactor your code for speed, memory optimization, and most important **readability**. Your tests should still pass after this step.

<!--links -->
[about nodejs]: https://nodejs.org/en/about/
[node and es6 docs]: https://nodejs.org/en/docs/es6/
[libuv docs]: https://github.com/libuv/libuv
[about v8]: https://developers.google.com/v8/
[what is npm]: https://docs.npmjs.com/getting-started/what-is-npm
[a gentle intro to tdd in js]: http://jrsinclair.com/articles/2016/gentle-introduction-to-javascript-tdd-intro/
[mocha getting started guide]: http://mochajs.org/#getting-started
[just another guide to ES6]: https://medium.com/sons-of-javascript/javascript-an-introduction-to-es6-1819d0d89a0f#.wb7rj1gin
