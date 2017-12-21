'use strict';

const logger = require('./logger');

module.exports = (error, request, response, next) => {
  logger.log('info', '__ERROR_MIDDLEWARE__');
  logger.log('info', error);

  if(error.status){ //all http errors have a status property
    logger.log('info', `responding with a ${error.status} status and message: ${error.message}`);
    return response.sendStatus(error.status);
  }

  let message = error.message.toLowerCase();
  //Nicholas - this if needs to execute brfore ''validation failed' or else we will get a different error sent that we are not expecting
  if(message.includes('object id failed')){
    logger.og('info', 'Responding with a 404 status code');
    return response.sendStatus(404);
  }
  if(message.includes('validation failed')){
    logger.og('info', 'Responding with a 400 status code');
    return response.sendStatus(400);
  }
  if(message.includes('duplicate key')){
    logger.og('info', 'Responding with a 409 status code');
    return response.sendStatus(409);
  }
  if(message.includes('unauthorized')){
    logger.og('info', 'Responding with a 401 status code');
    return response.sendStatus(401);
  }
  logger.log('info', 'Responding with a 500 status code');
  logger.log('info', error);
  return response.sendStatus(500);

};
