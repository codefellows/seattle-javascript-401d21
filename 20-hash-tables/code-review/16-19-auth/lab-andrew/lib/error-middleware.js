'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => { //eslint-disable-line

  logger.log('info', '__ERROR_MIDDLEWARE__');
  logger.log('info',error);

  if(error.status){
    logger.log('info', `Responding with a ${error.status} status and message: ${error.message}`);
    return response.sendStatus(error.status);
  }

  let message = error.message.toLowerCase();


  if(message.includes('validation failed')){
    logger.log('info', 'Responding with a 400 status code');
    return response.sendStatus(400);
  }

  if(message.includes('objectid failed')){
    logger.log('info', 'Responding with a 404 status code');
    return response.sendStatus(404);
  }

  if(message.includes('duplicate key error collection')){
    logger.log('info', 'Responding with a 409 status code');
    return response.sendStatus(409);
  }

  if(message.includes('unauthorized')){
    logger.log('info', 'Responding with a 401 status code');
    return response.sendStatus(401);
  }

  if(message.includes('jwt malformed')){
    logger.log('info', 'Responding with a 401 status code');
    return response.sendStatus(401);
  }

  logger.log('info', 'Responding with a 500 status code');
  logger.log('info',error);
  return response.sendStatus(500);
};
