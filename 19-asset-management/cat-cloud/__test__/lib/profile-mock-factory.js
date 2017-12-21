'use strict';

const faker = require('faker');
const accountMockFactory = require('./account-mock-factory');
const Profile = require('../../model/profile');

const profileMockFactory = module.exports = {};

profileMockFactory.create = () => {
  let resultMock = {};

  return accountMockFactory.create()
    .then(accountMock => {
      resultMock.accountMock = accountMock;

      return new Profile({
        bio : faker.lorem.words(100),
        avatar : faker.random.image(),
        lastName : faker.name.lastName(),
        firstName : faker.name.firstName(),

        account : accountMock.account._id,
      }).save();
    })
    .then(profile => {
      resultMock.profile = profile;
      return resultMock;
    });
};

profileMockFactory.remove = () => {
  return Promise.all([
    accountMockFactory.remove(),
    Profile.remove({}),
  ]);
};