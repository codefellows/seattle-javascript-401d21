'use strict';

const express = require('express');
const mongoose = require('mongoose');
const logger = require('./logger');

const app = express();
let isServerOn = false;
let httpServer = null;

mongoose.Promise = Promise;

app.use(require('./logger-middleware'));

app.use(require('../route/resume-route'));
app.use(require('../route/project-route'));


app.all('*', (request, response) => {
  logger.log('info', 'Returning a 404 from the catch all route');
  return response.sendStatus(404);
});

app.use(require('./error-middleware'));

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve,reject) => {
    if(isServerOn){
      logger.log('error','--->SERVER_ERROR<--- server is already on!');
      return reject(new Error('--->SERVER_ERROR<--- server is already on!'));
    }
    httpServer = app.listen(process.env.PORT, () => {
      isServerOn = true;
      console.log(`server is listening on port ${process.env.PORT}`);
      logger.log('info', `server is listening on port ${process.env.PORT}`);
      return resolve();
    });
  })
    .then(mongoose.connect(process.env.MONGODB_URI, {useMongoClient : true}));
};

server.stop = () => {
  return new Promise((resolve,reject) => {
    if(!isServerOn){
      logger.log('error', `--->SERVER_ERROR<--- server is already off`);
      return reject(new Error(`--->SERVER_ERROR<--- server is already off`));
    }
    if(!httpServer){
      logger.log('error', `--->SERVER_ERROR<--- there is no server to close`);
      return reject(new Error('--->SERVER_ERROR<---  there is no server to close'));
    }
    httpServer.close(() => {
      isServerOn = false;
      httpServer = null;
      logger.log('info', 'server off');
      return resolve();
    });
  })
    .then( () => mongoose.disconnect());
};