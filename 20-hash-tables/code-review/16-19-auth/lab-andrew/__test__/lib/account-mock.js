'use strict';

const faker = require('faker');
const Account = require('../../model/account');

const accountMock = module.exports = {};

accountMock.create = () => {
  let mock = {};
  mock.request = {
    username : faker.internet.userName(),
    email : faker.internet.email(),
    password : faker.lorem.words(10),
  };

  return Account.create(mock.request.username, mock.request.email, mock.request.password)
    .then(account => {
      mock.account = account;
      return account.createToken();
    })
    .then(token => {
      mock.token = token;
      return Account.findById(mock.account._id);
    })
    .then(account => {
      mock.account = account;
      return mock;
    })
    .catch(err => console.error(err));
};

accountMock.remove = () => Account.remove({});
