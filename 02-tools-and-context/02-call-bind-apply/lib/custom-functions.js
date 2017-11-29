'use strict';

const customFunctions = module.exports = {};

customFunctions.add = function(){
  // vinicio - non-arrow  functions have an 'arguments' object
  //           'arguments' is an 'Array-like' object
  //           meaning, you can do arguments[0]
  return Array.prototype.reduce.call(arguments, 
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },0);
};

customFunctions.addWithES6 = (...args) => {
  return Array.prototype.reduce.call(args, 
    (accumulator, currentValue) => {
      return accumulator + currentValue;
    },0);
};


customFunctions.reduce = (callback,collection,initialValue) => {
  // vinicio - customFunctions.reduce assumes that collection is an array-like object
  //           ideally, this would be tested.
  if(typeof callback !== 'function')
    throw new TypeError('<callback> should be a function');
  
  // more error-checking code

  return Array.prototype.reduce.call(collection,
    callback,initialValue);
};

