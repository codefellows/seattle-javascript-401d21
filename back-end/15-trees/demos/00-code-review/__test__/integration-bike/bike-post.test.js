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

  beforeAll(() => {
    return mock.rider.createOne()
      .then(rider => this.rider = rider)
      .then(() => {
        this.fakeBike = {
          make: faker.hacker.noun(),
          category: faker.hacker.verb(),
          rider: this.rider._id,
        };
      });
  }); 
  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.post(':4000/api/v1/bike')
        .send(this.fakeBike)
        .then(res => this.response = res);
    });
    it('should post a new bike with make, and _id', () => {
      expect(this.response.body).toHaveProperty('make');
      // expect(this.resBike.body).toHaveProperty('year');
      expect(this.response.body).toHaveProperty('_id');
    });
    it('should respond with a status of 201', () => {
      expect(this.response.status).toBe(201);
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status 404 on bad path', () => {
      return superagent.post(':4000/api/v1/doesnotexist')
        .send(this.mockNote)
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