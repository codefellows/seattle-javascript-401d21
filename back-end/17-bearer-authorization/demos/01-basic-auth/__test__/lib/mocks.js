'use strict';

const Auth = require('../../model/auth');// vinicio - similar to a user
const faker = require('faker');
const Gallery = require('../../model/gallery');

// vinicio - {auth:{},gallery:{},mario:{}}
const mocks = module.exports = {};
mocks.auth = {};

mocks.auth.createOne = () => {
  let result = {};
  result.password = faker.internet.password();

  return new Auth({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  })
    .generatePasswordHash(result.password)
    .then(user => result.user = user)
    .then(user => user.generateToken())
    .then(token => result.token = token)
    .then(() => {
      return result;
    });
};

mocks.gallery = {};
mocks.gallery.createOne = () => {
  let resultMock = null;

  return mocks.auth.createOne()
    .then(createdUserMock => resultMock = createdUserMock)
    .then(createdUserMock => {
      return new Gallery({
        name: faker.internet.domainWord(),
        description: faker.random.words(15),
        userId: createdUserMock.user._id,
      }).save(); // vinicio - something is being saved into Mongo
    })
    .then(gallery => {
      resultMock.gallery = gallery;
      console.log(resultMock);
      return resultMock;
    });
};
mocks.auth.removeAll = () => Promise.all([Auth.remove()]);