'use strict';

const Note = require('../model/note');
const debug = require('debug')('http:route-note');
const bodyParser = require('body-parser').json();
const storage = require('../lib/storage');
const errorHandler = require('../lib/error-handler');

module.exports = function (router) {

  router.post('/note', bodyParser, (req, res) => {
    debug('Begin Post');
    new Note(req.body.title, req.body.content)   // O(1) Normal Operation (Best Case)
      .then(note => storage.create('Note', note))
      .then(item => res.status(201).json(item))
      .catch(err => errorHandler(err, res));

  });

  router.get('/note/:_id', (req, res) => {
    debug('Begin Get One');
    storage.fetchOne('Note', req.params._id)   // O(1) Normal Operation (Best Case)
      .then(buffer => buffer.toString())
      .then(json => JSON.parse(json))
      .then(note => res.status(200).json(note))
      .catch(err => errorHandler(err, res));

  });

  router.get('/note', (req, res) => {
    debug('Begin Get All');
    storage.fetch('Note')   // O(n) Normal Operation (Best Case)
      .then(files => res.status(200).json(files))
      .catch(err => errorHandler(err, res));
  });

  router.put('/note/:_id', bodyParser, (req, res) => {
    debug('Begin Put');
    storage.update('Note', req.params._id, req.body) // O(1) Normal Operation (Best Case)
      .then(() => res.status(204).send())
      .catch(err => errorHandler(err, res));
  });

  router.delete('/note/:_id', (req, res) => {
    debug('Begin Delete');
    storage.destroy('Note', req.params._id)   // O(1) Normal Operation (Best Case)
      .then(() => res.status(204).send())
      .catch(err => errorHandler(err, res));

  });

};