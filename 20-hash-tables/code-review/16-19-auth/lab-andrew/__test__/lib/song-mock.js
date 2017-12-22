'use strict';

const faker = require('faker');
const accountMock = require('./account-mock');
const Song = require('../../model/song');

const songMock = module.exports = {};

songMock.create = () => {
  let resultMock = {};
  return accountMock.create()
    .then(accountMock => {
      resultMock.accountMock = accountMock;

      return new Song({
        title: faker.lorem.words(1),
        url: `${faker.internet.url()}/stringofnumbers.catsong.mp3`,
        account: accountMock.account._id,
      }).save();
    })
    .then(song => {
      resultMock.song = song;
      return resultMock;
    });
};

songMock.remove = () => {
  return Promise.all([
    accountMock.remove(),
    Song.remove({}),
  ]);
};