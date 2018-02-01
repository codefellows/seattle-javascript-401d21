'use strict'

// Application Dependencies
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./error-handler')

// Application Setup
const app = express()
const PORT = process.env.PORT
const router = express.Router()
const MONGODB_URI = process.env.MONGODB_URI
const mongoConnection = mongoose.connect(MONGODB_URI)

// Middleware
app.use(cors())
app.use('/api/v1', router)
require('../route/route-track')(router)
app.use('/{0,}', (req, res) => errorHandler(new Error('Path error. Route not found.'), res))

// Server Controls
const server = module.exports = {}
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server running. Cannot start server again'))

    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
      server.isOn = true
      return resolve(server)
    })
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server not running. Cannot shut server down'))

    server.http.close(() => {
      console.log('Shutting down server')
      mongoose.disconnect()
      server.isOn = false
      return resolve(server)
    })
  })
}