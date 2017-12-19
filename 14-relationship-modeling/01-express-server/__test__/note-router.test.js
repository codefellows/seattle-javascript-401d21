'use strict';

require('./lib/setup');

const faker = require('faker');
const superagent = require('superagent');
//const Note = require('../model/note');
const server = require('../lib/server');

const noteMock = require('./lib/note-mock');
const categoryMock = require('./lib/category-mock');

const apiURL = `http://localhost:${process.env.PORT}/api/notes`;

describe('/api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(noteMock.remove);

  describe('POST /api/notes', () => {
    test('should respond with a note and 200 status code if there is no error', () => {
      let tempCategoryMock = null;
      return categoryMock.create()
        .then(mock => {
          tempCategoryMock = mock;

          let noteToPost = {
            title : faker.lorem.words(10),
            content : faker.lorem.words(100),
            category : mock._id, // vinicio - If I don't do this, the test will fail
          };
          return superagent.post(`${apiURL}`)
            .send(noteToPost)
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body._id).toBeTruthy();
              expect(response.body.timestamp).toBeTruthy();
              expect(response.body.category).toEqual(tempCategoryMock._id.toString());

              expect(response.body.title).toEqual(noteToPost.title);
              expect(response.body.content).toEqual(noteToPost.content);
            });
        });

    });

    test('should respond with a 404 if the category id is not present', () => {
      return superagent.post(apiURL)
        .send({
          title : 'cats',
          content : 'gregor and the hound',
          category : 'BAD_ID',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
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
      return noteMock.create()
        .then(mock => {
          return superagent.delete(`${apiURL}/${mock.note._id}`);
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

      return noteMock.create()
        .then(mock => {
          noteToUpdate = mock.note;
          return superagent.put(`${apiURL}/${mock.note._id}`)
            .send({title : 'Gregor and The Hound'});
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.title).toEqual('Gregor and The Hound');
          expect(response.body.content).toEqual(noteToUpdate.content);
          expect(response.body._id).toEqual(noteToUpdate._id.toString());
        });
    });
  });

  describe('GET /api/notes/', () => {
    test('should return 10 notes (where 10 is the size of the page by default)', () => {
      return noteMock.createMany(100)
        .then(tempNotes => {
          return superagent.get(`${apiURL}`);
        })
        .then(response => {
          // console.log(response.headers);
          // console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body.count).toEqual(100);
          expect(response.body.data.length).toEqual(10);
        });
    });
  });

  describe('GET /api/notes/:id', () => {
    test('should respond with 200 status code if there is no error', () => {
      let tempMock = null;

      return noteMock.create()
        .then(mock => {
          //vinicio - no error checking for now
          tempMock = mock;
          return superagent.get(`${apiURL}/${mock.note._id}`);
        })
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(tempMock.note._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.title).toEqual(tempMock.note.title);
          expect(response.body.content).toEqual(tempMock.note.content);
          //-------------------------------------------------------------
          expect(response.body.category._id).toEqual(tempMock.category._id.toString());
          expect(response.body.category.title).toEqual(tempMock.category.title);
          expect(JSON.stringify(response.body.category.keywords))
            .toEqual(JSON.stringify(tempMock.category.keywords));
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