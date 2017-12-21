'use strict';

const faker = require('faker');
const accountMockFactory = require('./account-mock-factory');
const Sound = require('../../model/sound');

const soundMockFactory = module.exports = {};

soundMockFactory.create = () => {
  let mock = {};

  return accountMockFactory.create()
    .then(accountMock => {
      mock.accountMock = accountMock;
      return new Sound({
        account : accountMock.account._id,
        title : faker.lorem.words(10),
        url : faker.random.image(),
      }).save();
    })
    .then(sound => {
      mock.sound = sound;
      return mock;
    });
};

soundMockFactory.remove = () => {
  return Promise.all([
    accountMockFactory.remove(),
    Sound.remove({})
  ]);
};