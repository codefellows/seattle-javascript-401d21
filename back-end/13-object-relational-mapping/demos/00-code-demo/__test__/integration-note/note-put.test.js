'use strict';

// Testing Dependencies
const server = require('../../lib/server');
const superagent = require('superagent');
require('jest');

// Test Variables
let port = process.env.PORT;
let api = `:${port}/api/v1/note`;

describe('Route Testing', () => {
  this.mockNote = { title: 'test', content: 'run' };
  beforeAll(() => server.start(port, () => console.log(`listening on ${port}`)));
  afterAll(() => server.stop());

  describe('PUT /api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockNote)
        .then(res => this.response = res)
        .then(() => this.mockNote._id = this.response.body._id);
    });
  
    describe('Valid Routes/Data', () => {
      it('Should respond with a status 204', () => {
        this.mockNote.content = 'updated';
        return superagent.put(`${api}/${this.mockNote._id}`)
          .send(this.mockNote)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a single note', () => {
        return superagent.get(`${api}/${this.mockNote._id}`)
          .then(res => {
            expect(JSON.parse(res.text).content).toBe('updated');
          });
      });
    });
    describe('Invalid Routes/Data', () => {
      it('Should respond a validation error response if a file id does not match the id sent', () => {
        return superagent.put(`${api}/${this.mockNote._id.slice(0, -1)}9`)
          .send(this.mockNote)
          .catch(err => {
            expect(err.response.text).toMatch(/Validation/);
          });
      });
      it('Should return a status 400 if data is not sent with the put request', () => {
        return superagent.put(`${api}/${this.mockNote._id}`)
          .catch(err => expect(err.status).toBe(400));
      });
    });
  });
});