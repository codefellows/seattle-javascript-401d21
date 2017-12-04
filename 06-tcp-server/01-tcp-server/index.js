'use strict';

// ------------------------------------------------------
// const events = require('events');

// let myEventEmitter = new events.EventEmitter();

// myEventEmitter.on('the hound',() => {
//   console.log('I am reacting to an event on line 8');
// });

// myEventEmitter.on('myEventeeeeeee',() => {
//   console.log('I am reacting to an event on line 12');
// });

// myEventEmitter.on('myEvent',() => {
//   console.log('I am reacting to an event on line 16');
// });

// myEventEmitter.emit('myEvent');
// ------------------------------------------------------

const server = require('./lib/server');
const PORT = 3000;

server.start(PORT,() => {});