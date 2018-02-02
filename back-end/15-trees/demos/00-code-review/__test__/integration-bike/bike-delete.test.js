'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const mock = require('../lib/mock.js');
require('jest');

describe('DELETE', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.rider.removeAll);
  afterAll(mock.bike.removeAll);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return mock.bike.createOne()
        .then(res => {
          this.bike = res.bike;
          this.rider = res.rider;
        });
    });
    beforeAll(() => {
      return superagent.delete(`:4000/api/v1/bike/${this.bike._id}`)
        .then(res => this.res = res);
    });

    it('should return a status code 204', () => {
      expect(this.res.status).toBe(204);
    });
    it('should remove the bike from the database', () => {
      return superagent.get(`:4000/api/rider/${this.bike._id}`)
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 404 with a bad schema', () => {
      return superagent.delete(':4000/api/v1/doesnotexist')
        .send()
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.message).toMatch(/not found/i);
        });
    });
    it('should return a status code 404 with a bad request', () => {
      return superagent.delete(':4000/api/v1/note')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});