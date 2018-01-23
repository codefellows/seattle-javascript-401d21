'use strict'

let net = require('net')
let server = require('../server')
let superagent = require('superagent')
require('jest')

describe('all the tests', function() {
  afterAll(() => server.close())

  it('should connect clients', done => {
    let client = net.connect({port: 3000})
    client.on('data', data => {
      expect(data.toString()).toMatch(/has joined the game/)
      client.end()
      done()
    })
  })

  it('should notify other users that a user written a message', done => {
    let client1, client2

    client1 = net.connect({port: 3000}, () => {
      client2 = net.connect({port: 3000}, () => {
        client1.write('Hello client2')

        client2.on('data', data => {
          expect(data.toString()).toMatch(/Hello client2/)
          // expect(data.toString()).toMatch(/BOOGIE NIGHT/)
          client1.end()
          done()
        })
      })
    })
  })
})