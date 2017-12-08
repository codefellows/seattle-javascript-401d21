'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const faker = require('faker');


describe('/api/planet',() => {
  beforeAll(server.start);
  afterAll(server.stop);
  //vinicio - consider using beforeEach to set up test data.
  //beforeEach

  let testId;
  let falseTestId = 31245;

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
        testId = response.body.id;
      });
  });

  test('POST should respond with 400 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/planet')
      .set('Content-Type','application/json')
      .send('{ broken: failedValue ')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should respond with 200 status code and an array of planets if there are no errors', () => {
    return superagent.get('http://localhost:3000/api/planet')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.length).not.toBe(0 || -1);
      });
  });

  test('GET should respond with 200 status code and  a specific planet if there are no errors', () => {
    return superagent.get(`http://localhost:3000/api/planet?id=${testId}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.id).toEqual(testId);
      });
  });

  test('GET should respond with 404 status code if there are no errors', () => {
    return superagent.get(`http://localhost:3000/api/planet?id=${falseTestId}`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with 204 status code if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/planet')
      .set('Content-Type','application/json')
      .send({
        name: testName,
        content: testContent,
      })
      .then(response => {
        expect(response.status).toEqual(200);
        superagent.delete(`http://localhost:3000/api/planet?id=${response.body.id}`)
          .then(response => {
            expect(response.status).toEqual(204);
            expect(response.body).toBe('');
          });
      });
  });

  test('DELETE should respond with 404 status code if there are no errors', () => {
    return superagent.delete(`http://localhost:3000/api/planet?id=$`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });
});