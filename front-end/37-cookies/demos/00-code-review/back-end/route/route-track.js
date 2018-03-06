'use strict'

const Track = require('../model/track')
const bodyParser = require('body-parser').json()
const debug = require('debug')('http:route-track')
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  router.route('/track/:_id?')
  .get((req, res) => {
    debug(`${req.method}: ${req.url}`)

    if(req.params._id) {
      return Track.findById(req.params._id)
      .populate('album')
      .then(track => res.status(200).json(track))
      .catch(err => errorHandler(err, res))
    }

    Track.find()
    .then(tracks => tracks.map(t => t._id))
    .then(ids => res.status(200).json(ids))
    .catch(err => errorHandler(err, res))
  })
  .post(bodyParser, (req, res) => {
    debug(`${req.method}: ${req.url}`)

    new Track(req.body).save()
    .then(track => res.status(201).json(track))
    .catch(err => errorHandler(err, res))
  })
  .put(bodyParser, (req, res) => {
    debug(`${req.method}: ${req.url}`)

    Track.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true })
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
  .delete((req, res) => {
    debug(`${req.method}: ${req.url}`)

    Track.findByIdAndRemove(req.params._id)
    .then(() => res.sendStatus(204))
    .catch(err => errorHandler(err, res))
  })
}