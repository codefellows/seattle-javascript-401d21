'use strict'

const faker = require('faker')
const mocks = require('../lib/mocks')
const superagent = require('superagent')
const server = require('../../lib/server')
require('jest')

describe('PUT /api/v1/gallery', function () {
  beforeAll(server.start)
  // beforeAll(() => mocks.auth.createOne().then(data => this.mockUser = data))
  beforeAll(() => mocks.gallery.createOne().then(data => this.mockData = data))
  afterAll(server.stop)
  afterAll(mocks.auth.removeAll)
  afterAll(mocks.gallery.removeAll)

  describe('Valid request', () => {

    it('should update an existing record', () => {
      // console.log(this.mockData)
      let updated = {
        name: 'pajamas',
        description: 'fire trucks'
      }

      return superagent.put(`:${process.env.PORT}/api/v1/gallery/${this.mockData.gallery._id}`)
      .set('Authorization', `Bearer ${this.mockData.token}`)
      .send(updated)
      .then(res => expect(res.status).toEqual(204))
    })
  });

  describe('Invalid request', () => {

  })
})