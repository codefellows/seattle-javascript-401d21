'use strict'

const Note = require('../model/note')
const storage = require('../lib/storage')
const debug = require('debug')('http:route-note')


module.exports = function(router) {
  router.post('/api/v1/note', (req, res) => {
    debug('POST /api/v1/note')
    let newNote

    try {
      newNote = new Note(req.body.title, req.body.content)
    } catch(err) {
      debug(`There was a bad request: ${err}`)

      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write(err.message)
      res.end()
      return
    }

    storage.create('Note', newNote)
    .then(storedNote => {
      res.writeHead(201, {'Content-Type': 'application/json'})
      res.write(storedNote)
      res.end()
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write(err.message)
      res.end()
    })
  })

  router.get('/api/v1/note', (req, res) => {
    if(req.url.query._id) {
      storage.fetchOne('Note', req.url.query._id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(note)
        res.end()
      })
      .catch(err => {
        if(err.message.startsWith('400')) {
          res.writeHead(400, {'Content-Type': 'text/plain'})
          res.write(err.message)
          res.end()
          return
        }

        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write(err.message)
        res.end()
      })
      return
    }

    storage.fetchAll('Note')
    .then(ids => {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(JSON.stringify(ids))
      res.end()
    })
    .catch(err => {
      if(err.message.startsWith('400')) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.write(err.message)
        res.end()
        return
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.write(err.message)
      res.end()
    })
  })

  router.put('/api/v1/note', (req, res) => {
    if(req.url.query._id) {
      storage.update('Note', req.url.query._id, req.body)
      .then(() => {
        res.writeHead(204)
        res.write('I won')
        res.end()
      })
      .catch(err => {
        res.writeHead(400, {'Content-Type': 'text/plain'})
        res.write(err.message)
        res.end()
      })
      return
    }

    res.writeHead(400, {'Content-Type': 'text/plain'})
    res.write(err.message)
    res.end()
  })

  router.delete('/api/v1/note', (req, res) => {
    // Refer to Heath.
  })
}
