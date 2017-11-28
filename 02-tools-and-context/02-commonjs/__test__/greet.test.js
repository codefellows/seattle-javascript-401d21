'use strict';

const greet = require('../lib/greet');

describe('greet.test.js', () => {
  describe('greet.hi', () => {

    test('greet.hi should return “Hello, <name>!” if no errors are present', () => {
      // vinicio - a test should be as small as possible
      expect(greet.hi('Mario')).toEqual('Hello, Mario!');
      expect(greet.hi('Bowser')).toEqual('Hello, Bowser!');
    });

    test('An exception should be thrown in case of error', () => {
      expect(() => {
        greet.hi('');
      }).toThrow();

      expect(() => {
        greet.hi(282828);
      }).toThrow();
    });

  });
  describe('greet.bye', () => {

    test('greet.bye should return “Goodbye, <name>!” if no errors are present', () => {
      expect(greet.bye('Mario')).toEqual('Goodbye, Mario!');
      expect(greet.bye('Bowser')).toEqual('Goodbye, Bowser!');
    });

    test('An exception should be thrown in case of error', () => {
      expect(() => {
        greet.bye('');
      }).toThrow();

      expect(() => {
        greet.bye(282828);
      }).toThrow();
    });

  });

});