'use strict';

const faker = require('faker');
const Category = require('../../model/category');

const categoryMock = module.exports = {};

categoryMock.create = () => {
  return new Category({
    title : faker.lorem.words(7),
    keywords : faker.lorem.words(5).split(' '),
  }).save();
};

categoryMock.createMany = (howMany) => {
  return Promise.all(new Array(howMany).fill(0)
    .map(() => categoryMock.create()));
};

categoryMock.remove = () => Category.remove({});