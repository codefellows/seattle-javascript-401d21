'use strict'

const math = require('../lib/math')
require('jest') // This is not required

// This is a basic Jest assertion
expect(math.floor(1.123)).not.toEqual(1.123)
expect(math.floor(1.123)).toEqual(1)


describe('Math Module', function() {
  describe('#Floor', function() {
    it('should take in a floating point number, and return the previous whole integer', function() {
      expect(math.floor(1.123)).toEqual(1)
      expect(math.floor(1.123)).not.toEqual(1.123)
    })

    it('should validate that the input for `num` is a numeric value', function() {
      // expect(...)
    })
  })
  describe('#Ceiling', function() {

  })
  describe('#Absolute', function() {

  })
})