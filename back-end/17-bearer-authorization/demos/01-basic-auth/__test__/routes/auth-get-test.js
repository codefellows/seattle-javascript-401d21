'use strict'

const server = require('../../lib/server')
const superagent = require('superagent')
const mocks = require('../lib/mocks')
const faker = require('faker')
require('jest')

describe('GET /api/v1/signin', function () {
  beforeAll(server.start)
  afterAll(server.stop)
  afterAll(mocks.auth.removeAll)

  describe('Valid Requests', () => {
    beforeAll(() =>
      mocks.auth.createOne().then(data => this.mockData = data))
    beforeAll(() => {
      let encoded = Buffer.from(`${this.mockData.user.username}:${this.mockData.password}`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', `Basic ${encoded}`)
      .then(res => this.res = res)
      .catch(console.log);
    })

    it('should return a 200 OK on valid signin', () => {
      expect(this.res.status).toEqual(200)
    })
    it('should return a JSON Web Token as the response body', () => {
      let tokenParts = this.res.body.split('.')
      let signature = JSON.parse(Buffer.from(tokenParts[0], 'base64').toString())
      let token = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString())

      expect(signature.typ).toEqual('JWT')
      expect(token).toHaveProperty('token')
    })
  })

  describe('Invalid Requests', () => {
    it('should return a 401 NOT AUTHORIZED given invalid username', () => {
      let encoded = Buffer.from(`${'BADUSERNAME'}:${this.mockData.password}`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', `Basic ${encoded}`)
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 401 NOT AUTHORIZED given invalid password', () => {
      let encoded = Buffer.from(`${this.mockData.user.username}:${'INVALIDPASSWORD'}`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', `Basic ${encoded}`)
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 401 NOT AUTHORIZED given missing username', () => {
      let encoded = Buffer.from(`:${'INVALIDPASSWORD'}`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', `Basic ${encoded}`)
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 401 NOT AUTHORIZED given missing password', () => {
      let encoded = Buffer.from(`${this.mockData.user.username}:`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', `Basic ${encoded}`)
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 401 NOT AUTHORIZED given malformed auth headers', () => {
      let encoded = Buffer.from(`${this.mockData.user.username}:`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .set('Authorization', 'Basic')
      .catch(err => expect(err.status).toEqual(401))
    })
    it('should return a 401 NOT AUTHORIZED given missing auth headers', () => {
      let encoded = Buffer.from(`${this.mockData.user.username}:`).toString('base64')

      return superagent.get(`:${process.env.PORT}/api/v1/signin`)
      .catch(err => expect(err.status).toEqual(401))
    })
  })
})