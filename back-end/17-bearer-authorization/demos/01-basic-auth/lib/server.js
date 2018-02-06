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

// Middleware
app.use(cors())
app.use('/api/v1', router)
require('../route/route-auth')(router)
require('../route/route-gallery')(router);
app.all('/{0,}', (req, res) => errorHandler(new Error('Path Error. Route does not exist.')))
// app.use((err, req, res) => errorHandler(err, res))

// Server Controls
const server = module.exports = {}
server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Server already running.'))
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
      server.isOn = true
      mongoose.connect(MONGODB_URI)
      return resolve(server)
    })
  })
}
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'))
    server.http.close(() => {
      server.isOn = false
      mongoose.disconnect()
      return resolve()
    })
  })
}