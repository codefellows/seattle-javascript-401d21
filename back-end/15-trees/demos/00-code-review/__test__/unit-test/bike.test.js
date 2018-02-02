'use strict';

const Bike = require('../../model/bike.js');
const mocks = require('../lib/mock')
require('jest');

describe('Bike Module', function() {
  describe('Bike schema', () => {
    this.mockRider = mocks.rider.createOne()
    let newBike = new Bike({
      make: 'Huffy',
      category: 'BMX',
      rider: this.mockRider._id
    });

    it('should create a object', () => {
      expect(newBike).toBeInstanceOf(Object);
    });

    it('should have a rider ID property that matches the mockRider', () => {
      expect(newBike.rider).toEqual(this.mockRider._id)
    })
  });
});