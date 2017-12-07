'use strict';

const server = require('./lib/server');
const logger = require('./lib/logger');

server.start()
  .catch(err => {
    console.log(err);
    logger.log('error', err);
  });


