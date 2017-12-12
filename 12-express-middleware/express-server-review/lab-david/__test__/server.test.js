'use strict';

process.env.PORT = 7000;
process.env.MONGODB_URI = 'mongodb://localhost/testing';

const FAKER = require('faker');
const SUPERAGENT = require('superagent');
const MOUNTAIN = require('../model/mountain');
const SERVER = require('../lib/server');

const APIURL = `http://localhost:${process.env.PORT}/api/mountains`;

const mountainMockupCreator = () => {
  return new MOUNTAIN({
    name : FAKER.address.county(2),
    state  : FAKER.address.state(1),
    range : FAKER.address.county(2),
  }).save();
};

describe('api/mountains', () => {
  beforeAll(SERVER.start);
  afterAll(SERVER.stop);
  beforeEach(() => MOUNTAIN.remove({}));

  describe('POST /api/mountains', () => {
    test('should respond with a mountain and a 200 status code if there is no error', () => {
      let mountainToPost = {
        name : FAKER.address.county(2),
        state : FAKER.address.state(1),
        range : FAKER.address.county(2),
      };
      return SUPERAGENT.post(`${APIURL}`)
        .send(mountainToPost)
        .then(response => {
          console.log(response.body);
          expect(response.status).toEqual(200);
          expect(response.body._id).toBeTruthy();
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.name).toEqual(mountainToPost.name);
          expect(response.body.state).toEqual(mountainToPost.state);
          expect(response.body.range).toEqual(mountainToPost.range);
        });
    });
    test('should respond with a 400 code if we send an incomplete mountain', () => {
      let mountainToPost = {
        name : FAKER.company.bsNoun(2),
      };
      return SUPERAGENT.post(`${APIURL}`)
        .send(mountainToPost)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });

  describe('GET /api/mountains', () => {
    test('should respond with a 200 status code if there is no error', () => {
      let mountainToTest = null;

      return mountainMockupCreator()
        .then(mountain => {
          mountainToTest = mountain;
          return SUPERAGENT.get(`${APIURL}/${mountain._id}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(response.body._id).toEqual(mountainToTest._id.toString());
          expect(response.body.timestamp).toBeTruthy();

          expect(response.body.name).toEqual(mountainToTest.name);
          expect(response.body.state).toEqual(mountainToTest.state);
          expect(response.body.range).toEqual(mountainToTest.range);
          
        });
    });
    test('should respond with a 404 status code if the id is incorrect', () => {
      return SUPERAGENT.get(`${APIURL}/mario`)
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});