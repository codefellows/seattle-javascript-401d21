'use strict';

const jsonWebToken = require('jsonwebtoken');
const httpErrors = require('http-errors');

const Account = require('../model/account');

const promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (error, data) => {
      if(error)
        return reject(error);
      return resolve(data);
    });
  });
};

module.exports = (request, response, next) => {
  if(!request.headers.authorization)
    return next(new httpErrors(400, '__ERROR__ authorization header required'));
  const token = request.headers.authorization.split('Bearer ' )[1];

  if (!token)
    return next(new httpErrors(404, '__ERROR__ token required'));

  return promisify(jsonWebToken.verify)(token, process.env.CAT_CLOUD_SECRET)
    .catch(error => Promise.reject(new httpErrors(401, error))) //TODO: refactor for homework -put this all into the error middleware
    .then(decryptedData => {
      return Account.findOne({tokenSeed : decryptedData.tokenSeed});
    })
    .then(account => {
      if(!account)
        throw new httpErrors(404, '__ERROR__ not found');
      request.account = account;
      return next();
    })
    .catch(next);

};
