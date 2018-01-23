'use strict'

const server = require('../server')
const net = require('net')
require('jest')

describe('Server module', function() {
  afterAll(() => server.close())

  describe('setting up a connection to the server', () => {
    it('should connect and notify me that I joined the channel', done => {
      let socket = net.connect({port: 3000})
      // console.log(socket)
      socket.on('data', data => {
        expect(data.toString()).toMatch(/has joined the chat/)
        // expect(data.toString()).not.toMatch(/BOOGIE NIGHTS/)
        socket.end()
        done()
      })
    })
  })


  // SCOTT WILL FIX THIS ONE
  // describe('testing facepalm command', () => {
  //   it('should facepalm', done => {
  //     let messages = []

  //     let socket = net.connect({port: 3000})


  //     socket.write('@facepalm', () => {
  //       socket.on('data', data => {
  //         console.log('data', data.toString())
  //         messages.push(data.toString())
  //         socket.end(null, () => {
  //           console.log(messages)
  //           expect(messages[0]).toMatch(/is disappointed/)
  //           done()
  //         })
  //       })
  //     })
  //   })
  })
})