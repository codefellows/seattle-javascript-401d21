'use strict';

const Greet = module.exports = {};

Greet.hi = (name) => {
  if(name === '' || typeof name !== 'string')
    return -1;

  return `Hello, ${name}!`;
};

Greet.bye = (name) => {
  if(name === '' || typeof name !== 'string')
    return -1;

  return `Goodbye, ${name}!`;
};

function betterBye(){
  console.log('==============================');
}

betterBye();
