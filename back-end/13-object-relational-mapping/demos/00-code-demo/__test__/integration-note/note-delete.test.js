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

  describe('Delete /api/v1/note', () => {
    beforeAll(() => {
      return superagent.post(api)
        .send(this.mockNote)
        .then(res => this.response = res);
    });
    describe('DELETE /api/v1/note', () => {
      it('Should respond with a status 200', () => {
        return superagent.del(`${api}/${this.response.body._id}`)
          .then(res => {
            expect(res.status).toBe(204);
          });
      });
      it('Should respond with a 404 if the file does not exist', () => {
        return superagent.del(`${api}/${this.response.body._id.slice(0, -1)}9`)
          .catch(err => {
            expect(err.status).toBe(404);
          });
      });
    });
  });
});