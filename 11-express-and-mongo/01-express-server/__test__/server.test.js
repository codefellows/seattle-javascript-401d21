'use strict';

// vinicio - this is for express
process.env.PORT = 7000;
// vinicio - this is for mongo
process.env.MONGODB_URI = 'mongodb://localhost/testing';

const faker = require('faker');
const superagent = require('superagent');
const Note = require('../model/note');
const server = require('../lib/server');

const apiURL = `http://localhost:${process.env.PORT}/api/notes`;

const noteMockCreate = () => {
  return new Note({
    title : faker.lorem.words(10),
    content : faker.lorem.words(100),
  }).save();
};


describe('/api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(() => Note.remove({}));

  describe('POST /api/notes', () => {
    test('should respond with a note and 200 status code if there is no error', () => {
      let noteToPost = {
        title : faker.lorem.words(10),
        content : faker.lorem.words(100),
      };
      return superagent.post(`${apiURL}`)
        .send(noteToPost)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(noteToPost.title);
          expect(response.body.content).toEqual(noteToPost.content);
        });
    });
    test('should respond with a 400 code if we send an incomplete note', () => {
      let noteToPost = {
        content : faker.lorem.words(100),
      };
      return superagent.post(`${apiURL}`)
        .send(noteToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

  });

  describe('GET /api/notes', () => {
    test('should respond with 200 status code if there is no error', () => {
      let noteToTest = null;

      noteMockCreate()
        .then(note => {
          //vinicio - no error checking for now
          noteToTest = note;
          return superagent.get(`${apiURL}/${note._id}`);
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(noteToTest._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(noteToTest.title);
          expect(response.body.content).toEqual(noteToTest.content);
        });
    });
    test('should respond with 404 status code if there id is incorrect', () => {
      return superagent.get(`${apiURL}/gregorAndTheHound`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});