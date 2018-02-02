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
    return mock.rider.createOne()
      .then(res => this.rider = res);
  });

  describe('Valid req/res', () => {
    it('should return a 204 status', () => {
      return superagent.put(`:4000/api/v1/rider/${this.rider._id}`)
        .send({ name: 'new' })
        .then(res => expect(res.status).toBe(204));
    });
    it('should update the name to new in the database', () => {
      return superagent.get(`:4000/api/v1/rider/${this.rider._id}`)
        .then(res => expect(res.body.name).toBe('new'));
    });

    it('should have the same id', () => {
      return superagent.get(`:4000/api/v1/rider/${this.rider._id}`)
        .then(res => expect(res.body._id).toContain(this.rider._id));
    });
  });

  describe('Invalid req/res', () => {
    it('should return a status of 400 given improperly formatted body', () => {
      return superagent.put(`:4000/api/v1/rider/${this.rider._id}`)
      .send({name: 25})
      .catch(err => {
        expect(err.status).toBe(404);
      });
    })
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