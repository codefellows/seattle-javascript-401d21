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

const noteMockCreateMany = (howMany) => {
  //vinicio - TODO: improve validation
  return Promise.all(new Array(howMany)
    .fill(0)
    .map(() => noteMockCreate()));
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

  describe('DELETE /api/notes/:id', () => {
    test('should respond with a 204 if there are no errors', ()=>{
      return noteMockCreate()
        .then(note => {
          return superagent.delete(`${apiURL}/${note._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(204);
        });
    });

    test('should respond with a 404 if the id is invalid', ()=>{
      return superagent.delete(`${apiURL}/reallyOBSCUUUUUUUUUREANYTHING`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('PUT /api/notes', () => {
    test('should update note and respond with 200 if there are no errors', () => {

      let noteToUpdate = null;

      return noteMockCreate()
        .then(note => {
          noteToUpdate = note;
          return superagent.put(`${apiURL}/${note._id}`)
            .send({title : 'Gregor and The Hound'});
        })
        .then(response => {
          // vinicio - Here,I only have access to response
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound');
          expect(response.body.content).toEqual(noteToUpdate.content);
          expect(response.body._id).toEqual(noteToUpdate._id.toString());
        });
    });
  });

  describe('GET /api/notes/', () => {
    test('shold return 10 notes (where 10 is the size of the page by default)', () => {
      return noteMockCreateMany(1000)
        .then(tempNotes => {
          return superagent.get(`${apiURL}`);
        })
        .then(response => {
          console.log(response.headers);
          console.log(response.body);

          expect(response.status).toEqual(200);
          expect(response.body.count).toEqual(1000);
          expect(response.body.data.length).toEqual(10);
        });
    });
  });

  describe('GET /api/notes/:id', () => {
    test('should respond with 200 status code if there is no error', () => {
      let noteToTest = null;

      noteMockCreate()
        .then(note => {
          //vinicio - no error checking for now
          noteToTest = note;
          return superagent.get(`${apiURL}/${note._id}`);
        })
        .then(response => {
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