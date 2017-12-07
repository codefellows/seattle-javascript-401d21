'use strict';

const uuid = require('uuid/v1');

class TrialsBike {
  constructor(make, model, year, displacement, color) {
    // vinicio - type-checking would be a good refactor point
    if(typeof make !== 'string')
      throw TypeError('ERROR');

    this.make = make;
    this.model = model;
    this.year = year;
    this.displacement = displacement;
    this.color = color;
    this.id = uuid();
    this.timestamp = new Date();
  }
}

module.exports = TrialsBike;