'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');

require('dotenv').config();
require('../route/trials-bike-router');// vinicio - this is a good refactor point

const PORT = process.env.PORT;

// vinicio - this lite sets up the event handler
const app = http.createServer(router.route);

let serverOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(serverOn) {
      logger.log('error', '__SERVER_ERROR__ Server is already running.');
      return reject(new Error('__SERVER_ERROR__ Server is already running.'));
    }

    if(!PORT) {
      logger.log('error', '__SERVER_ERROR__ PORT variable is not configured.');
      return reject(new Error('__SERVER_ERROR__ PORT variable is not configured.'));
    }

    // vinicio - now we are listening for request in a given PORT
    app.listen(PORT, err => {
      if(err)
        return reject(err);
      serverOn = true;
      logger.log('info', `Server is up on port ${PORT}.`);
      console.log(`Server is up on port ${PORT}.`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!serverOn) {
      logger.log('error', '__SERVER_ERROR__ Server is not running, cannot stop.');
      return reject(new Error('__SERVER_ERROR__ Server is not running, cannot stop.'));
    }

    app.close(err => {
      if(err) {
        logger.log('error', '__SERVER_ERROR__ Server can\'t be shut down.');
        logger.log('error', err);
        return reject(err);
      }

      serverOn = false;
      return resolve();
    });
  });
};