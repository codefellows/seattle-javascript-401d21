'use strict';

//process.env will contain my .env variables
require('dotenv').config();

const server = require('./lib/server');

server.start(process.env.PORT,() => {
  console.log(`Server is running on port ${process.env.PORT}`);
});