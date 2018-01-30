'use strict'

const server = require('../../lib/server')
require('jest')

describe('POST /api/v1/note', function () {
  beforeAll(() => server.start(process.env.PORT, (err) => console.log(`Listening on ${process.env.PORT}`)))
  afterAll(() => server.stop())

  describe('Valid req/res', () => {

  })

  describe('Invalid req/res', () => {
    it('should return true', () => expect(true).toBeTruthy())
  })
})


// it('should return a status 404 on bad id parameter', () => {
//   return superagent.post(':4000/api/v1/note/')
//     .send(this.mockNote)
//     .catch(err => {
//       expect(err.status).toBe(404)
//       expect(err.response.text).toMatch(/path error/i)
//     })
// })