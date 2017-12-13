'use strict'

const Toy = require('../model/toy')
const createError = require('http-errors')
const debug = require('debug')('http:route-toy')

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST')

    return new Toy(req.body).save()
    .then(toy => res.status(201).json(toy))
    .catch(err => next(createError(400, err.message)))
  })

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET')

    return Toy.findById(req.params._id)
    .then(toy => res.json(toy))
    .catch(err => next(createError(400, err.message)))
  })

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET')

    return Toy.find()
    .then(ids => res.json(ids.map(obj => obj._id)))
    .catch(err => next(createError(404, err.message)))
  })

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT')

    return Toy.findByIdAndUpdate(req.params._id, req.body)
    .then(() => res.sendStatus(204))
    .catch(err => next(createError(400, err.message)))
  })

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE')

    return Toy.findByIdAndRemove(req.params._id)
    .then(() => res.sendStatus(204))
    .catch(err => next(createError(404, err.message)))
  })
}