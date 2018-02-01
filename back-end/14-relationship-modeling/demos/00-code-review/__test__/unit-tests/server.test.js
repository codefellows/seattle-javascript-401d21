'use strict'

const server = require('../../lib/server')
require('jest')

describe('Server Unit Test', () => {
  beforeEach(server.start)
  afterEach(server.stop)

  it('should return a promise rejection if the server is already running when started', () => {
    server.start()
    .catch(err => expect(err.message).toMatch(/Server running/i))
  })
  // TODO: Find a fix for this!
  // it('should return a promise rejection if the server is stopped when stopped', () => {
  //   server.stop()
  //   .then(server.stop)
  //   .catch(err => expect(err.message).toMatch(/gnarf/i))
  // })
})