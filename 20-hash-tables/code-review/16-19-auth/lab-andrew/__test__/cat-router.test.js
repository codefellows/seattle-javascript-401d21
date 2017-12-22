'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const accountMock = require('./lib/account-mock');
const catMock = require('./lib/cat-mock');

const __API_URL__ = `http://localhost:${process.env.PORT}`;

describe('Cat router', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(catMock.remove);

  describe('POST /cats', () => {
    test('Should return a 200 and a cat if there are no errors', () => {
      let acctMock = null;

      return accountMock.create()
        .then(mock => {
          acctMock = mock;
          return superagent.post(`${__API_URL__}/cats`)
            .set('Authorization', `Bearer ${acctMock.token}`)
            .send({
              says : 'Meowmeow meooow',
              firstName : 'Kitty',
              lastName : 'Bloom',
            });
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.account).toEqual(acctMock.account._id.toString());
          expect(response.body.firstName).toEqual('Kitty');
          expect(response.body.lastName).toEqual('Bloom');
          expect(response.body.says).toEqual('Meowmeow meooow');
        });
    });

    test('Should return a 400 if it is a bad request', () => {
      let acctMock = null;

      return accountMock.create()
        .then(mock => {
          acctMock = mock;
          return superagent.post(`${__API_URL__}/cats`)
            .set('Authorization', `Bearer ${acctMock.token}`)
            .send({
              says: {says: 'Meow'},
              firstName: 'Kitty',
              lastName: 'Bloom',
            });
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('Should return a 401 if the authorization is invalid', () => {
      return superagent.post(`${__API_URL__}/cats`)
        .set('Authorization', 'Bearer fakeToken')
        .send({
          says: 'Meowmeow meooow',
          firstName: 'Kitty',
          lastName: 'Bloom',
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(401);
        });
    });
  });

  describe('GET /cats/:id', () => {
    test('GET /cats/:id should return a 200 and a cat if there are no errors', () => {
      let resultObj = null;

      return catMock.create()
        .then(mock => {
          resultObj = mock;
          return superagent.get(`${__API_URL__}/cats/${resultObj.cat._id}`)
            .set('Authorization', `Bearer ${resultObj.accountMock.token}`);
        })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.account).toEqual(resultObj.accountMock.account._id.toString());
          expect(response.body.firstName).toEqual(resultObj.cat.firstName);
          expect(response.body.lastName).toEqual(resultObj.cat.lastName);
          expect(response.body.says).toEqual(resultObj.cat.says);
        });
    });

    test('GET /cats/:id should return a 400 if authentication is not sent', () => {
      let resultObj = null;

      return catMock.create()
        .then(mock => {
          resultObj = mock;
          return superagent.get(`${__API_URL__}/cats/${resultObj.cat._id}`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });

    test('GET /cats/:id should return a 404 if user does not exist', () => {
      let resultObj = null;

      return catMock.create()
        .then(mock => {
          resultObj = mock;
          return superagent.get(`${__API_URL__}/cats/badId`)
            .set('Authorization', `Bearer ${resultObj.accountMock.token}`);
        })
        .then(Promise.reject)
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});