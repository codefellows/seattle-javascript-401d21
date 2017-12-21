'use strict';
// NOTE:fixed apiUrl- still failing elsewhere
require('./lib/setup');
const superagent = require('superagent');
const server = require('../lib/server');
const accountMockFactory = require('./lib/account-mock-factory'); 

const apiUrl =`http://localhost:${process.env.PORT}`;

describe('auth router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(accountMockFactory.remove);

  describe('POST', () => {
    test('post creating account should respond 200 and token if no errors', () => {
      return superagent.post(`${apiUrl}/signup`)
        .send({
          username : 'nicholas',
          email : 'nick.carignan@sbcglobal.net',
          password : 'password',
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });
    test('POST /signup should return a 400 if incomplete request', () => {
      return superagent.post(`${apiUrl}/signup`)
        .send({
          username : 'nicholas',
          email : 'nick.carignan@sbcglobal.net',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });


  describe('GET /login', () => {
    test('GET login should get 200 if there are no errors', () =>{
      return accountMockFactory.create()
        .then(mock => {
          return superagent.get(`${apiUrl}/login`)
            .auth(mock.request.username, mock.request.password);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });
  });
});
