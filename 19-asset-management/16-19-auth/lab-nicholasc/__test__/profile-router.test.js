'use strict';

require('./lib/setup');

const superagent = require('superagent');
const server = require('../lib/server');
const accountMockFactory = require('./lib/account-mock-factory');
const profileMockFactory = require('./lib/profile-mock-factory');

const apiUrl =`http://localhost:${process.env.PORT}`;

describe('POST /profiles', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  afterEach(accountMockFactory.remove);

  test('POST should return 200 and profile if no errors', () => {
    let accountMock = null;

    return accountMockFactory.create()
      .then(mock => {
        accountMock = mock;
        return superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${accountMock.token}`)
          .send({
            bio : 'I am a nicholas',
            firstName : 'Nicholas',
            lastName : 'Carignan',
          });
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.account).toEqual(accountMock.account._id.toString());
        expect(response.body.firstName).toEqual('Nicholas');
      });
  });

  test('GET should return 200 and profile with id if no errors', () => {
    let tempProfileMock = null;// vinicio - maybe refactor name
    return profileMockFactory.create()
      .then(profile => {
        tempProfileMock = profile;
        return superagent.get(`${apiUrl}/profiles/${profile.profile._id}`)
          .set('Authorization', `Bearer ${profile.accountMock.token}`);
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.firstName).toEqual(tempProfileMock.profile.firstName);
        expect(response.body._id).toEqual(tempProfileMock.profile._id.toString());
      });


  });
});
