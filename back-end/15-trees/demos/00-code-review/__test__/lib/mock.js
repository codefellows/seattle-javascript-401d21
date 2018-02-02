'use strict';

const faker = require('faker');
const Rider = require('../../model/rider.js');
const Bike = require('../../model/bike.js');

const mock = module.exports = {};

// Rider Mocks - One, Many, RemoveAll
mock.rider = {};

mock.rider.createOne = () => new Rider({ name: faker.name.firstName() }).save();

mock.rider.createMany = n =>
  Promise.all(new Array(n).fill(0).map(mock.rider.createOne));

mock.rider.removeAll = () => Promise.all([Rider.remove()]);


// Bike Mocks - One, Many, RemoveAll
mock.bike = {};

mock.bike.createOne = () => {
  let result = {};

  return mock.rider.createOne()
    .then(rider => {
      result.rider = rider;
      return new Bike({
        make: `${faker.hacker.adjective()}`,
        category: faker.hacker.ingverb(),
        rider: rider._id.toString(),
      }).save();
    })
    .then(bike => result.bike = bike)
    .then(() => result);
};

mock.bike.createMany = n => {
  let result = {};

  return mock.rider.createOne()
    .then(rider => {
      result.rider = rider;
      let bikeProms = new Array(n).fill(0).map(() => new Bike({
        make: `${faker.hacker.adjective()}`,
        category: faker.hacker.ingverb(),
        rider: rider._id.toString(),
      }).save());
      return Promise.all(bikeProms);
    })
    .then(bikes => result.bikes = bikes)
    .then(() => result);
};

mock.bike.removeAll = () => Promise.all([Bike.remove()]);