'use strict';
const logger = require('./logger');

module.exports = (request,response,next) => {
  logger.log('info',`Processing : ${request.method} on : ${request.url}`);
  console.log(`Processing : ${request.method} on : ${request.url}`);
  return next();// vinicio - we need to call next at the end or the middleware chain will break
};