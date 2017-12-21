'use strict';

const winston = require('winston');
const winstonLevels = {error: 0, warn : 1, info : 2, verbose : 3, debug : 4};

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'log.json',
      levels : winstonLevels,
    }),
  ],
});

module.exports = logger;
