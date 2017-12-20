'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Account = require('../model/account');
const httpErrors = require('http-errors');// vinicio - might refactor this to HttpErrors

const basicAuthMiddleware = require('../lib/basic-auth-middleware');


const authRouter = module.exports = new Router();

authRouter.post('/signup',jsonParser, (request,response,next) => {
  if(!request.body.username || !request.body.email || !request.body.password)
    return next(new httpErrors(400,'__ERROR__ username, email, and password required to create an account'));
  
  Account.create(request.body.username,request.body.email,
    request.body.password)
    .then(user => user.createToken())
    .then(token => response.json({token}))// vinicio - ES6 object creation shorthand
    .catch(next);
});

authRouter.get('/login',basicAuthMiddleware,(request,response,next) => {
  if(!request.account)
    return next(new httpErrors(404,'_ERROR_ not found'));
  
  return request.account.createToken()
    .then(token => response.json({token}))
    .catch(next);
});
