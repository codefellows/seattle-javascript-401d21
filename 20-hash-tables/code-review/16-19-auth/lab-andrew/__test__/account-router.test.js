'use strict';

require('./lib/setup');
const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock');

const __API_URL__ = `http://localhost:${process.env.PORT}`;

describe('AUTH Router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(accountMock.remove);

  describe('POST /signup', () => {

    test('POST creating an account should respond with 200 and a token if there are no errors', () => {
      return superagent.post(`${__API_URL__}/signup`)
        .send({
          username : 'kitty',
          email : 'kitty@cats.com',
          password : 'catsrule',
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });
    
    test('POST /signup - an incomplete request should return a 400', () => {
      return superagent.post(`${__API_URL__}/signup`)
        .send({
          username: 'kitty',
          email: 'kitty@cats.com',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
    
    test('POST /signup - a duplicate request should return a 409', () => {
      return superagent.post(`${__API_URL__}/signup`)
        .send({
          username: 'kitty',
          email: 'kitty@cats.com',
          password: 'catsrule',
        })
        .then(() => {
          return superagent.post(`${__API_URL__}/signup`)
            .send({
              username: 'kitty',
              email: 'kitty@cats.com',
              password: 'catsrule',
            })
            .then(Promise.reject)
            .catch(response => {
              expect(response.status).toEqual(409);
            });
        
        });
    });
  });
  
  describe('GET /login', () => {
    test('GET /login should get a 200 status code and a token if there are no errors', () => {
      return accountMock.create()
        .then(mock => {
          return superagent.get(`${__API_URL__}/login`)
            .auth(mock.request.username, mock.request.password);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.token).toBeTruthy();
        });
    });

    test('GET /login should get a 400 status if authentication is not sent', () => {
      return accountMock.create()
        .then(() => {
          return superagent.get(`${__API_URL__}/login`);
        })
        .then(Promise.reject)
        .catch(response => { 
          expect(response.status).toEqual(400);
        });
    });

    test('GET /login should get a 404 status if user does not exist', () => {
      return accountMock.create()
        .then(() => {
          return superagent.get(`${__API_URL__}/login`)
            .auth('fakeUser', 'fakePassword');
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
    
});