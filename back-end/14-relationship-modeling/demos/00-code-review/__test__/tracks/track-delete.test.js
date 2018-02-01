'use strict'

const faker = require('faker')
const superagent = require('superagent')
const Track = require('../../model/track')
const server = require('../../lib/server')
require('jest')

describe('DELETE /api/v1/track', function () {
  beforeAll(() => this.basePath = `:${process.env.PORT}/api/v1/track`)
  beforeAll(() => this.mockTrack = {
    title: faker.hacker.ingverb(),
    artist: faker.name.firstName(),
  })
  beforeAll(() => server.start())
  afterAll(() => server.stop())
  afterAll(() => Promise.all([Track.remove()]))

  describe('valid requests', () => {
    beforeAll(() => {
      return superagent.post(this.basePath)
        .send(this.mockTrack)
        .then(res => this.response = res)
    })


    it('should return a status code of 204 NO CONTENT', () => {
      return superagent.delete(`${this.basePath}/${this.response.body._id}`)
      .then(res => {
        expect(res.status).toBe(204)
      })
    })
    it('should return a 400 given malformed ID', () => {
      return superagent.delete(`${this.basePath}/1234`)
      .catch(err => expect(err.status).toEqual(400))
    })
    it('should return a 404 when trying to GET a deleted record', () => {
      return superagent.get(`${this.basePath}/${this.response.body._id}`)
      .catch(err => expect(err.status).toEqual(404))
    })
  })
  describe('invalid request', () => {

  })
})