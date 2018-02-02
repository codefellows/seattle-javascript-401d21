'use strict';

const Bike = require('../model/bike.js');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler.js');

module.exports = function(router) {
  router.route('/bike/:_id?')
    .get((req, res) => {

      if(req.params._id) {
        return Bike.findById(req.params._id)
          .populate('rider')
          .then(bike => res.status(200).json(bike))
          .catch(err => errorHandler(err, res));
      }
      Bike.find()
        .then(bike => bike.map(bike => bike._id))
        .then(bike => res.status(200).json(bike))
        .catch(err => errorHandler(err, res));
    })
    .post(bodyParser, (req, res) => {
      new Bike(req.body).save()
        .then(bike => res.status(201).json(bike))
        .catch(err => errorHandler(err, res));
    })
    .put(bodyParser, (req, res) => {
      Bike.findOneAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));

    })
    .delete((req, res) => {
      Bike.findById(req.params._id)
        .then(bike => bike.remove())
        .then(() => res.sendStatus(204))
        .catch(err => errorHandler(err, res));

    });
};