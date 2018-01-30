'use strict'

const Note = require('../model/note')
const storage = require('../lib/storage')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.post('/', bodyParser, (req, res) => {
    let newNote

    new Note(req.body.title, req.body.content)
    .then(note => newNote = note)
    .then(note => JSON.stringify(note))
    .then(json => storage.create('note', newNote._id, json))
    .then(() => res.status(201).json(newNote))
    .catch(err => errorHandler(err, res))
  })
  router.get('/:_id', (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(note => res.status(200).json(note))
    .catch(err => errorHandler(err, res))
  })
  router.get('/', (req, res) => {
    storage.fetchAll('note')
    .then(paths => {
      console.log('paths', paths)
      return paths.map(p => p.split('.')[0])
    })
    .then(ids => {
      console.log('ids', ids)
      res.status(200).json(ids)
    })
    .catch(err => errorHandler(err, res))
  })
  router.delete('/:_id', (req, res) => {
    storage.destroy('note', req.params._id)
    // .then(() => res.status(200).send('some message'))
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
  router.put('/:_id', bodyParser, (req, res) => {
    storage.fetchOne('note', req.params._id)
    .then(buffer => buffer.toString())
    .then(json => JSON.parse(json))
    .then(note => ({
      _id: req.params._id,
      title: req.body.title || note.title,
      content: req.body.content || note.content
    }))
    .then(note => JSON.stringify(note))
    .then(json => storage.update('note', req.params._id, json))
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
}