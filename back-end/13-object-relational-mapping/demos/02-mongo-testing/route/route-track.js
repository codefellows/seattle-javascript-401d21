'use strict'

const Track = require('../model/track')
const bodyParser = require('body-parser').json()
const errorHandler = require('../lib/error-handler')

module.exports = function(router) {
  // router.get()
  // router.post()

  // Below is another example of mounting route methods to the router
  router.route('/track/:_id?')
  .get((req, res) => {
    // debug(`${req.method}: ${req.url}`)

    if(req.params._id) {
      return Track.findById(req.params._id)
      .then(track => res.status(200).json(track))
      .catch(err => errorHandler(err, res))
    }

    // otherwise handle the case of no ID

  })
  .post(bodyParser, (req, res) => {
    new Track(req.body).save()
    .then(track => res.status(201).json(track))
    .catch(err => errorHandler(err, res))
  })
  .put(bodyParser, (req, res) => {

  })
  .delete((req, res) => {

  })
}