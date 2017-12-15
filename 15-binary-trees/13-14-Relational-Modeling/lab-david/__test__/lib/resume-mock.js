'use strict';

const faker = require('faker');
const Resume = require('../../model/resume');

const resumeMock = module.exports = {};

resumeMock.create = () => {
  return new Resume({
    name : faker.internet.userName(1),
    age : faker.random.number(1),
  }).save();
};

resumeMock.createMany = (creationCount) => {
  return Promise.all(new Array(creationCount).fill(0)
    .map(() => resumeMock.create()));
};

resumeMock.remove = () => Resume.remove({});