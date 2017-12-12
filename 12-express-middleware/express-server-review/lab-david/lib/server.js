'use strict';

const EXPRESS = require('express');
const MONGOOSE = require('mongoose');
const LOGGER = require('./logger');

const app = EXPRESS();
let isServerOn = false;
let httpServer = null;

MONGOOSE.Promise = Promise;
app.use(require('../route/mountain-route'));

app.all('*', (request, response) => {
  LOGGER.log('info', 'Returning a 404 from the catch all route');
  return response.sendStatus(404);
});

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve,reject) => {
    if(isServerOn){
      LOGGER.log('error','--->SERVER_ERROR<--- server is already on!');
      return reject(new Error('--->SERVER_ERROR<--- server is already on!'));
    }
    httpServer = app.listen(process.env.PORT, () => {
      isServerOn = true;
      console.log(`server is listening on port ${process.env.PORT}`);
      LOGGER.log('info', `server is listening on port ${process.env.PORT}`);
      return resolve();
    });
  })
    .then(() => MONGOOSE.connect(process.env.MONGODB_URI,{useMongoClient : true}));
};

server.stop = () => {
  return new Promise((resolve,reject) => {
    if(!isServerOn){
      LOGGER.log('error', `--->SERVER_ERROR<--- server is already off`);
      return reject(new Error(`--->SERVER_ERROR<--- server is already off`));
    }
    if(!httpServer){
      LOGGER.log('error', `--->SERVER_ERROR<--- there is no server to close`);
      return reject(new Error('--->SERVER_ERROR<---  there is no server to close'));
    }
    httpServer.close(() => {
      isServerOn = false;
      httpServer = null;
      LOGGER.log('info', 'server off');
      return resolve();
    });
  })
    .then(() => MONGOOSE.disconnect());
};