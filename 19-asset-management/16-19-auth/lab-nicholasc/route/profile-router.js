'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Profile = require('../model/profile');
const httpErrors = require('http-errors');

const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');

const profileRouter = module.exports = new Router();

profileRouter.post('/profiles', bearerAuthMiddleware, jsonParser, (request, response, next) => {
  if(!request.account)
    return next(new httpErrors(404, '__ERROR__ not found'));
  return new Profile({
    ...request.body,
    account : request.account._id,
  }).save()
    .then(profile => response.json(profile))
    .catch(next);
});

profileRouter.get('/profiles/:id', bearerAuthMiddleware, (request, response, next) => {
  if(!request.account)
    return next(new httpErrors(404, '__ERROR__ not found'));
  
  // vinicio - this starts a promise chain
  return Profile.findById(request.params.id)
    .then(foundProfile => {
      //assert(foundProfile !== null);
      if(!foundProfile)
        throw new httpErrors(404, '__ERROR__ not found');

      return response.json(foundProfile)
    })
    .catch(next)
});
