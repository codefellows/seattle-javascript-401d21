'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/note`;

describe('Route Testing', () => {
  this.mockNote = {title: 'test', content: 'run'};
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('POST /api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockNote)
        .then(res => this.response = res);
    });
    describe('Valid Routes/Data', () => {
      it('Should respond with a status of 201', () => {
        expect(this.response.status).toBe(201);
      });
      it('Should post a single note and return it', () => {
        expect(this.response.body).toHaveProperty('title');
        expect(this.response.body).toHaveProperty('content');
        expect(this.response.body).toHaveProperty('_id');
      });
      it('Should respond with a correct title and content', () => {
        expect(this.response.body.title).toBe('test');
        expect(this.response.body.content).toBe('run');
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should return a 404 for an invalid path', () => {
        return superagent.post(':4000/api/v1/node')
          .catch(err => {
            expect(err.status).toBe(404);
            expect(err.response.text).toMatch(/Path/);
          });
      });
      it('Should respond with a bad request if bad data is sent', () => {
        return superagent.post(api)
          .catch(err => {
            expect(err.status).toBe(400);
          });
      });
    });
  });
});
