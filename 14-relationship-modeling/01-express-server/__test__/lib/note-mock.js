'use strict';

const faker = require('faker');
const categoryMock = require('./category-mock');
const Note = require('../../model/note');

const noteMock = module.exports = {};

noteMock.create = () => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;

      return new Note({
        title : faker.lorem.words(7),
        content : faker.lorem.words(100),
        category : category._id,
      }).save();
    })
    .then(note => {
      mock.note = note;
      return mock;
    });
};

noteMock.createMany = (howMany) => {
  let mock = {};

  return categoryMock.create()
    .then(category => {
      mock.category = category;
      return Promise.all(new Array(howMany)
        .fill(0)
        .map(() => {
          return new Note({
            title : faker.lorem.words(7),
            content : faker.lorem.words(100),
            category : category._id,
          }).save();
        }));
    })
    .then(notes => {
      mock.notes = notes;
      return mock;
    });
};

noteMock.remove = () => Promise.all([
  Note.remove({}),
  categoryMock.remove(),
]);
