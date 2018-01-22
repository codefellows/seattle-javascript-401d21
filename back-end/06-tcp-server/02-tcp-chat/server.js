'use strict'

// Application dependencies
const net = require('net')
const Client = require('./model/client')
const cmd = require('./lib/cmd')

// Application setup
const server = module.exports = net.createServer()
const PORT = process.env.PORT || 3000
const clientPool = []

// Server instance setup
server.on('connection', function(socket) {
  let client = new Client(socket)
  clientPool.push(client)
  clientPool.map(c => c.socket.write(`\t${client.nick} has joined the game\n`))

  socket.on('data', function(data) {
    // This is where you will abstract away to your command parser module...

    // console.log('socket data', data)
    let message = data.toString()
    clientPool.filter(
      c => c.user !== client.user).map(
        c => c.socket.write(`${client.nick}: ${message}\n`))
  })

  socket.on('close', function() {
    clientPool = clientPool.filter(c => c.user !== client.user)
    clientPool.map(c => c.socket.write(`\t${client.nick} has left the channel\n`))
  })

  socket.on('error', function(err) {
    console.error(err)
  })
})

server.listen(PORT, () => console.log(`Listening on ${PORT}`))