'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const mock = require('../lib/mock.js');
require('jest');

describe('GET', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.rider.removeAll);
  afterAll(mock.bike.removeAll);

  describe('Valid req/res', () => {
    beforeAll(() => {
      return mock.rider.createMany(5)
        .then(res => this.riderData = res);
    });
    it('should return a status 200 given a valid ID', () => {
      return superagent.get(`:4000/api/v1/rider/${this.riderData[0]._id}`)
        .then(res => expect(res.status).toEqual(200));
    });
    it('should return a rider from the database', () => {
      return superagent.get(`:4000/api/v1/rider/${this.riderData[0]._id}`)
        .then(res => expect(res.body.name).toBe(this.riderData[0].name));
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 400 without schema', () => {
      return superagent.get(':4000/api/v1/bike')
        .send()
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
    it('should return a 404 given an incorrect path', () => {
      return superagent.get(':4000/api/v1/doesnotexist')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});