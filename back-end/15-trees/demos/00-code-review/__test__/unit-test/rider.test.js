'use strict';

const Rider = require('../../model/rider.js');
require('jest');

describe('Rider Module', function() {
  let newRider = new Rider();
  describe('Rider schema', () => {
    it('should create a object', () => {
      expect(newRider).toBeInstanceOf(Object);
    });
  });
});