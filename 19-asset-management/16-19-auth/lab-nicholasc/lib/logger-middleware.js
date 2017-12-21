'use strict';

const logger = require('./logger');

module.exports = (request, response, next) => {
  logger.log('info', `Processing : ${request.method} on : ${request.url}`);
  console.log(`Processing : ${request.method} on : ${request.url}`);
  return next(); //if we do not call this, the chain breaks -return prevents async issues
};
