'use strict';

const greet = module.exports = {};

greet.hi = (name) => {
  if(name === '' || typeof name !== 'string')
    throw new TypeError('<name> should be a string');

  return `Hello, ${name}!`;
};

greet.bye = (name) => {
  if(name === '' || typeof name !== 'string')
    throw new TypeError('<name> should be a string');

  return `Goodbye, ${name}!`;
};