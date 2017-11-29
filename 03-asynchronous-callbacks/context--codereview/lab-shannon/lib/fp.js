'use strict';

const fp = module.exports = {};

fp.map = (callback, collection) => {
  if (typeof callback !== 'function'){
    throw new TypeError('The callback you provided is not a function');
  // vinicio - here we have a little bit more control to handle the error
  }else if (!collection.length){
    throw new TypeError(`The collection provided must be an array-like object`);
  }

  return Array.prototype.map.call(collection, callback);
};

//vinicio - function expression vs function declaration?
//          this is a function declaration
// function myFunction() {

// } // no semicolon since it's a declaration

//vinicio - this is a function expression
fp.filter = (callback, collection) => {
  if (typeof callback !== 'function'){
    throw new TypeError('The callback you provided is not a function');
  }
  else if (!Array.isArray(collection)){
    throw new TypeError(`The collection provided must be an array`);
  }

  return Array.prototype.filter.call(collection, callback);
};

fp.slice = (start, stop, collection) => {
  if (!collection.length){
    throw new TypeError(`The collection provided must be an array-like object`);
  }
  else if (typeof start !== `number`){
    throw new Error(`Start must be a number`);
  }
  else if (typeof stop !== `number`){
    throw new Error(`Start must be a number`);
  }

  return Array.prototype.slice.call(collection, start, stop);
};

fp.reduce = (callback, collection, initialValue) => {
  if (typeof callback !== 'function'){
    throw new TypeError('The callback you provided is not a function');
  }
  else if (!collection.length){
    throw new TypeError(`The collection provided must be an array-like object`);
  }
  else if (typeof initialValue !== `number`){
    throw new TypeError(`The accumulator must be a number`);
  }
  else if (!collection.every((num) => {
    return typeof num === `number`;
  })){
    throw new Error(`All elements of the array must be a number`);
  }

  return Array.prototype.reduce.call(collection, callback, initialValue)
};
