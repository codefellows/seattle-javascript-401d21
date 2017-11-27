'use strict';

const greet = require('../lib/greet');

describe('greet.test.js', () => {
  describe('greet.hi', () => {

    test('greet.hi should return “Hello, <name>!” if no errors are present', () => {
      // vinicio - a test should be as small as possible
      expect(greet.hi('Mario')).toEqual('Hello, Mario!');
      expect(greet.hi('Bowser')).toEqual('Hello, Bowser!');
    });

    test('-1 should be returned in case of error', () => {
      expect(greet.hi('')).toEqual(-1);
      expect(greet.hi(82372)).toEqual(-1);
    });

  });
  describe('greet.bye', () => {

    test('greet.bye should return “Goodbye, <name>!” if no errors are present', () => {
      expect(greet.bye('Mario')).toEqual('Goodbye, Mario!');
      expect(greet.bye('Bowser')).toEqual('Goodbye, Bowser!');
    });

    test('-1 should be returned in case of error', () => {
      expect(greet.bye('')).toEqual(-1);
      expect(greet.bye(82372)).toEqual(-1);
    });

  });

});