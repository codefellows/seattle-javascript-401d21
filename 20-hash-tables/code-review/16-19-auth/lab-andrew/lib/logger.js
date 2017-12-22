'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
  levels: {error: 0, warn: 1, info: 2, verbose: 3, debug: 4},
  transports : [
    new (winston.transports.File)({
      filename : 'log.json',
      level : 'verbose',
    }),
  ],
});

module.exports = logger;
