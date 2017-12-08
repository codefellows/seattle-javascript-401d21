'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');

require('dotenv').config();
require('../route/planet-router');

const PORT = process.env.PORT;

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve,reject) => {
    if(isServerOn){
      logger.log('error','__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }
    if(!PORT){
      logger.log('error','__SERVER_ERROR__ PORT variable is not configured');
      return reject(new Error('__SERVER_ERROR__ PORT variable is not configured'));
    }
    app.listen(PORT, error => {
      if(error)
        return reject(error);

      isServerOn = true;
      logger.log('info',`Server is online on port ${PORT}`);
      console.log('info',`Server is online on port ${PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve,reject) => {
    if(!isServerOn){
      logger.log('error','__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }
    app.close(error => {
      if(error){
        logger.log('error',`__SERVER_ERROR__ server can't be shut down`);
        logger.log('error',error);

        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};