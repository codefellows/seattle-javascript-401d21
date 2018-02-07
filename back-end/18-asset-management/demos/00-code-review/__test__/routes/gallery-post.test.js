'use strict'

const faker = require('faker')
const mocks = require('../lib/mocks')
const superagent = require('superagent')
const server = require('../../lib/server')
require('jest')

describe('POST /api/v1/gallery', function() {
  beforeAll(server.start)
  beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data))
  afterAll(server.stop)
  afterAll(mocks.auth.removeAll)
  afterAll(mocks.gallery.removeAll)

  describe('Valid request', () => {
    //------------------------------------------------------------------------------------------
    // vinicio - I added this code to show you how to use mocks in conjunction with bearer auth
    //------------------------------------------------------------------------------------------
    it('should return a 201 CREATED status code', () => {
      let galleryMock = null;
      return mocks.gallery.createOne()
        .then(mock => {
          galleryMock = mock;
          return superagent.post(`:${process.env.PORT}/api/v1/gallery`)
            .set('Authorization', `Bearer ${mock.token}`)
            .send({
              name: faker.lorem.word(),
              description: faker.lorem.words(4),
            });
        })
        .then(response => {
          // console.log(response.body);
          expect(response.status).toEqual(201);
          expect(response.body).toHaveProperty('name');
          expect(response.body).toHaveProperty('description');
          expect(response.body).toHaveProperty('_id');
          expect(response.body.userId).toEqual(galleryMock.gallery.userId.toString());
        });
    });
    //------------------------------------------------------------------------------------------
  });

  describe('Invalid request', () => {
    it('should return a 401 NOT AUTHORIZED given back token', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/gallery`)
      .set('Authorization', 'Bearer BADTOKEN')
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 400 BAD REQUEST on improperly formatted body', () => {
      return superagent.post(`:${process.env.PORT}/api/v1/gallery`)
      .set('Authorization', `Bearer ${this.mockUser.token}`)
      .send({})
      .catch(err => expect(err.status).toEqual(400))
    })
  })
})