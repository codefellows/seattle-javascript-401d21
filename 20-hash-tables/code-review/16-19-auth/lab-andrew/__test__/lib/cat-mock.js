'use strict';

const faker = require('faker');
const accountMock = require('./account-mock');
const Cat = require('../../model/cat');

const catMock = module.exports = {};

catMock.create = () => {
  let resultMock = {};
  return accountMock.create()
    .then(accountMock => {
      resultMock.accountMock = accountMock;

      return new Cat({
        says : faker.lorem.words(100),
        catPic : faker.random.image(),
        lastName : faker.name.lastName(),
        firstName : faker.name.firstName(),

        account : accountMock.account._id,
      }).save();
    })
    .then(cat => {
      resultMock.cat = cat;
      return resultMock;
    });
};

catMock.remove = () => {
  return Promise.all([
    accountMock.remove(),
    Cat.remove({}),
  ]);
};