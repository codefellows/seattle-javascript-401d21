'use strict';

const logger = require('./logger');

module.exports = (request,response,next) => {
  logger.log('info', `processing : ${request.method} on ${request.url}`);
  console.log(`processing : ${request.method} on : ${request.url}`);
  return next();
};