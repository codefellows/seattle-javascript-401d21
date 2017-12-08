'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const faker = require('faker');

describe('/api/planet',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  let fakeDatabaseLength = 5;

  for (let i = 0; i < fakeDatabaseLength; i++) {

    let testName = `K-${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}${faker.random.alphaNumeric()}`;
    let testContent = `Longitude: ${faker.address.longitude()}`;
    
    test('POST should respond with 200 status code and a body if there are no errors', () => {
      return superagent.post('http://localhost:3000/api/planet')
        .set('Content-Type','application/json')
        .send({
          name: testName,
          content: testContent,
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual(testName);
          expect(response.body.content).toEqual(testContent);
          expect(response.body.discoverDate).toBeTruthy();
          expect(response.body.id).toBeTruthy();
        });
    });
  }
});