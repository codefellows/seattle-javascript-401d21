'use strict'

const createError = require('http-errors')
const debug = require('debug')('http:error-middleware')

module.exports = function(err, req, res) {
  if(err.status) {
    switch (true) {
      case err.message.toLowerCase().includes('validation failed'):
        debug('validation failed')
        res.status(400).send(err.name)
        break
      
      case err.message.toLowerCase().includes('duplicate key'):
        debug('duplicate key')
        res.status(409).send(err.name)
        break

      case err.message.toLowerCase().includes('objectid failed'):
        debug('objectId failed')
        res.status(404).send(err.name)
        break

      default:
        debug('default err status')
        res.status(err.status).send(err.name)
        break
    }
    return
  }

  debug('server error')
  err = createError(500, err.message)
  res.status(err.status).send(err.name)
}