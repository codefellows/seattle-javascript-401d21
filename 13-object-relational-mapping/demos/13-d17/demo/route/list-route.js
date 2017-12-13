'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('note:list-router');
const List = require('../model/list.js');
const listRouter = module.exports = new Router();

listRouter.post('/api/list', jsonParser, function(req, res, next) {
  debug('POST: /api/list');

  req.body.timestamp = new Date();
  new List(req.body).save()
  .then( list => res.json(list))
  .catch(next);
});

listRouter.get('/api/list/:id', function(req, res, next) {
  debug('GET: /api/list');

  List.findById(req.params.id)
  .then( list => res.json(list))
  .catch(next);
});
