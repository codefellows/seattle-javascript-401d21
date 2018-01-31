'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let idHolder, api = `:${port}/api/v1/note`;

describe('Server module', () => {
  this.mockNote = { title: 'test', content: 'run' };
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());
  
  describe('GET /api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockNote);
    });
    describe('Valid Routes/Data', () => {
      beforeAll(() => {
        return superagent.get(api)
          .then(res => this.response = res);
      });
      it('Should respond with a status 200', () => {
        expect(this.response.status).toBe(200);
      });
      it('Should respond with all notes', () => {
        idHolder = this.response.body[0];
        expect(this.response.body).toBeTruthy();
      });
      it('Should respond with a single note', () => {
        return superagent.get(`${api}/${idHolder}`)
          .then(res => expect(res.body.title).toBe('test'));
      });
    });

    describe('Invalid Routes/Data', () => {
      it('Should respond a not found or path error when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.response.text).toMatch(/ENOENT/);
          });
      });
      it('Should respond a 404 bad path when given an incorrect path', () => {
        return superagent.get(`${api}/invalididparameter`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
      it('Should throw a 500 status error if the server fails to read a corrupted file', () => {
        return superagent.get(`${api}/Official500testfile`)
          .catch(err => {
            expect(err.status).toBe(500);
          });
      });
    });
  });
});