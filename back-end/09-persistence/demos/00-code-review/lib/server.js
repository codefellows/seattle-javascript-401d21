'use strict'

// Application dependencies
const http = require('http')
const Router = require('./router')

// Router setup
const router = new Router()
require('../route/route-note')(router)

// Application setup
const app = http.createServer(router.route())

// Server controls
const server = module.exports = {}
server.start = (port, cb) => app.listen(port, cb)
server.stop = (cb) => app.close(cb)