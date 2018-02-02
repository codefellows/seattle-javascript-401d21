'use strict';

const server = require('../../lib/server.js');
const superagent = require('superagent');
const mock = require('../lib/mock.js');
require('jest');

describe('PUT', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(mock.rider.removeAll);
  afterAll(mock.bike.removeAll);

  beforeAll(() => {
    return mock.bike.createOne()
      .then(bike => {
        this.bike = bike.bike;
        this.rider = bike.rider;
      });
  });

  describe('Valid req/res', () => {
    beforeAll(() => {
      return superagent.put(`:4000/api/v1/bike/${this.bike._id}`)
        .send({make: 'bianchi'})
        .then(res => this.res = res);
    });
    
    it('should return a status code 204 when complete', () => {
      expect(this.res.status).toBe(204);
    });
    it('should update the make to bianchi in the database', () => {
      return superagent.get(`:4000/api/v1/bike/${this.bike._id}`)
        .then(res => expect(res.body.make).toBe('bianchi'));
    });
    it('should have the same id', () => {
      return superagent.get(`:4000/api/v1/bike/${this.bike._id}`)
        .then(res => expect(res.body._id).toContain(this.bike._id));
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status code 404 without an item', () => {
      return superagent.put(':4000/api/v1/note')
        .send()
        .catch(err => {
          // console.log(err);
          expect(err.status).toBe(404);
        });
    });
    it('should return a 404 given an incorrect path', () => {
      return superagent.get(':4000/api/v1/not')
        .send({title: '', content: ''})
        .catch(err => {
          expect(err.status).toBe(404);
        });
    });
  });
});