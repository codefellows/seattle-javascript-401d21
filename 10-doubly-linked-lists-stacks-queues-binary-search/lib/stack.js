'use strict';

let stack = module.exports = {};

stack.createStack = () => {
  //-----------------------------
  // Vinicio - This won't be accessible outside the module
  //-----------------------------
  let data = [];
  //-----------------------------

  return {
    push: (value) => {
      data.push(value);
    },
    pop: () => {
      return data.pop();
    },
  };
};