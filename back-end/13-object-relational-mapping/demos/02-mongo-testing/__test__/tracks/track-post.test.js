'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
require('jest')

describe('POST /api/v1/track', function() {
  beforeAll(() => this.mockTrack = {title: 'shark in the dark', artist: 'slug'})
  beforeAll(() => server.start())
  afterAll(() => server.stop())

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(`:${process.env.PORT}/api/v1/track`)
      .send(this.mockTrack)
      .then(res => this.response = res)
    })


    it('should return a status code of 201 CREATED', () => {
      expect(this.response.status).toBe(201)
    })
  })
  describe('invalid request', () => {

  })
})