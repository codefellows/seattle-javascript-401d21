'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const mock = require('../lib/mock.js');
const faker = require('faker');

require('jest');

describe('POST', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.rider.removeAll);
  afterAll(mock.bike.removeAll);

  describe('Valid req/res', () => {
    beforeAll(() => {
      this.rider = {name: faker.name.firstName()};
      return superagent.post(':4000/api/v1/rider')
        .send(this.rider)
        .then(res => this.res = res);
    });
    it('should post a new rider object with a name and bike property', () => {
      expect(this.res.body.name).toBe(this.rider.name);
      expect(this.res.body).toHaveProperty('bikes');
    });
    it('should respond with a status of 201', () => {
      expect(this.res.status).toBe(201);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesnotexist')
        .send(this.rider)
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.response.text).toMatch(/path error/i);
        });
    });
    it('should return a status 400 on a bad request body', () => {
      return superagent.post(':4000/api/v1/bike')
        .send({})
        .catch(err => expect(err.status).toBe(400));
    });
  });
});