'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const httpErrors = require('http-errors');
const Cat = require('../model/cat');

const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const catRouter = module.exports = new Router();

catRouter.post('/cats', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if (!request.account){
    return new httpErrors(404, '__ERROR__ not found');
  }
  return new Cat({
    ...request.body, 
    account : request.account._id,
  }).save()
    .then(cat => response.json(cat))
    .catch(next);
});

catRouter.get('/cats/:id', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return new httpErrors(404, '__ERROR__ not found');
  }
  return Cat.findById(request.params.id)
    .then(cat => response.json(cat))
    .catch(next);
});