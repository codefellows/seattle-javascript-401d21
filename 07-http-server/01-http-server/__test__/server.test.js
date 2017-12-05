'use strict';

const superagent = require('superagent');
const server = require('../lib/server');

describe('server.test.js',() => {
  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = { cat : 'Gregor'};
    return superagent.post('http://localhost:3000/echo')
      .send(bodyToTest) // vinicio - send returns a promise
      .then(response => {
        // vinicio - here is where I can actually use expect
        expect(response.status).toEqual(200);
        // vinicio - in your homework, you'll change the next line
        expect(response.body).toEqual(bodyToTest);
      });
  });
  test('POST should respond with at 400 status code if there is any error', () => {
    return superagent.post('http://localhost:3000/echo')
      .set({'Content-Type' : 'application/json'})
      .send('{')// vinicio - this is what returns a promise 
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});