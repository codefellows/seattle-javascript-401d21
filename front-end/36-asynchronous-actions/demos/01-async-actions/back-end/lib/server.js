'use strict'

// Application Dependencies
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const debug = require('debug')('http:server')
const errorHandler = require('./error-handler')

// Application Setup
const PORT = process.env.PORT
const router = express.Router()
const app = express()
const MONGODB_URI = process.env.MONGODB_URI

// Middleware
require('../route/route-track')(router)
require('../route/route-album')(router)
app.use(cors())
app.use('/api/v1', router)

// 404 Error Handler
app.all('/*', (req, res) => errorHandler(new Error('PATH ERROR. Route does not exist'), res))

// Server Controls
let server = module.exports = {}
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject('shit hit the fan')

    server.http = app.listen(PORT, () => {
      console.log('server up', PORT)
      mongoose.connect(MONGODB_URI)
      server.isOn = true
      return resolve(server)
    })
  })
}

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject()

    server.http.close(() => {
      console.log('server down')
      mongoose.disconnect()
      server.isOn = false
      return resolve()
    })
  })
}
