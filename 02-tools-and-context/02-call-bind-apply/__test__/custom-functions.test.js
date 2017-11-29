'use strict';

const customFunctions = require('../lib/custom-functions');

describe('custom-functions.js', () => {
  describe('customFunctions.add', () => {
    //vinicio - this test correct behavior
    test('return value should be the sum of all arguments if there are no errors', () => {
      expect(customFunctions.add(1)).toBe(1);
      expect(customFunctions.add(1,2,3)).toBe(6);
    });

    // vinicio - this tests edge cases
    test('return value should be 0 if there are no arguments', () => {
      expect(customFunctions.add()).toBe(0);
    });
  });

  describe('customFunctions.addWithES6', () => {
    //vinicio - this test correct behavior
    test('return value should be the sum of all arguments if there are no errors', () => {
      expect(customFunctions.addWithES6(1)).toBe(1);
      expect(customFunctions.addWithES6(1,2,3)).toBe(6);
    });

    // vinicio - this tests edge cases
    test('return value should be 0 if there are no arguments', () => {
      expect(customFunctions.addWithES6()).toBe(0);
    });
  });

  describe('customFunctions.reduce', () => {
    test('return value should be the sum of the collection if the callback is adding them', () => {
      expect(customFunctions.reduce(
        (accumulator,currentValue) => { //argument 1
          return accumulator + currentValue; 
        },
        [1,2,3],//argument 2
        0 // argument 3
      )).toBe(6);
    });

    //vinicio - the main reason to using exceptions is that they can't be ignored
    test('An exception should de thrown if callback is not a function', () => {
      expect(
        () => {
          customFunctions.reduce('I\'m totally a function ()', [1,2,3], 0);
        }
      ).toThrow();
    });
  });
});

// vinicio - parameter vs argument?
// myFunction(2,1) --> these are arguments
// let myFunction = function(a,b) --> these are parameters