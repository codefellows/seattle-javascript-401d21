'use strict'

const Note = require('../model/note')
const storage = require('../lib/storage')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.post('/note', bodyParser, (req, res) => {
    new Note(req.body.title, req.body.content)
    .then(note => storage.create('note', note))
    .then(item => res.status(201).json(item))
    .catch(err => errorHandler(err, res))
  })
  router.get('/note/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(note => res.status(200).json(note))
    .catch(err => errorHandler(err, res))
  })
  // router.get()
  // router.put()
  // router.delete()

}