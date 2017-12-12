'use strict';

const {Router} = require('express');
const JSONPARSER = require('body-parser').json();

const MOUNTAIN = require('../model/mountain');
const LOGGER = require('../lib/logger');

const MOUNTAINROUTER = module.exports = new Router();

MOUNTAINROUTER.post('/api/mountains', JSONPARSER, (request,response) => {
  LOGGER.log('info', 'POST - processing that request');
  //LOGGER.log('info', request);
  

  if(!request.body.name || !request.body.state || !request.body.range) {
    LOGGER.log('info', 'POST - responding with a 400 code');
    return response.sendStatus(400);
  }

  // vinicio - here I added a return
  return new MOUNTAIN(request.body).save()
    .then(MOUNTAIN => {
      LOGGER.log('info','Returning with a 200 status and a mountain');
      return response.json(MOUNTAIN);
    })
    .catch(error => {
      LOGGER.log('error', '--->SERVER_ERROR<---');
      LOGGER.log('error', error);

      return response.sendStatus(500);
    });
});

MOUNTAINROUTER.get('/api/mountains/:id', (request,response,next) => {
  console.log('-----------------------------------------');
  LOGGER.log('info', 'GET - processing a request for a specific id');

  return MOUNTAIN.findById(request.params.id)
    .then(MOUNTAIN => {
      if(!MOUNTAIN){
        LOGGER.log('info', 'GET - returning a 404 status code');
        return response.sendStatus(404);
      }
      LOGGER.log('info', 'GET - returning a 200 status code');
      LOGGER.log('info',MOUNTAIN);
      return response.json(MOUNTAIN);
    }).catch(error => {
      console.log('--------------',error.message);
      if(error.message.toLowerCase().includes('cast to objectid failed')){
        LOGGER.log('info', 'GET - returning a 404 status code. could not parse the id');
        return response.sendStatus(404);
      }
      LOGGER.log('error', 'GET - returning a 500 code');
      LOGGER.log('error', error);
      return response.sendStatus(500);
    });
});

MOUNTAINROUTER.get('/api/mountains/', (request,response) => {
  LOGGER.log('info', 'GET - processing for a non-ID specfic request');

  MOUNTAIN.find({})
    .then(MOUNTAIN => {
      if(!MOUNTAIN){
        LOGGER.log('info', 'GET - returning a 404 status code');
        return response.sendStatus(404);
      }
      LOGGER.log('info', 'GET - returning a 200 status code');
      LOGGER.log('info',MOUNTAIN);
      return response.json(MOUNTAIN);
    }).catch(error => {
      if(error.message.indexOf('Cast to ObjectId failed') > -1){
        LOGGER.log('info', 'GET - returning a 404 status code. could not parse the id');
        return response.sendStatus(404);
      }
      LOGGER.log('error', 'GET - returning a 500 code');
      LOGGER.log('error', error);
      return response.sendStatus(500);
    });
});

MOUNTAINROUTER.delete('api/mountains/:id', (request,response) => {
  LOGGER.log('info', 'DELETE - processing a delete request for a specific id');

  return MOUNTAIN.findById(request.params.id)
    .then(MOUNTAIN => {
      if(!MOUNTAIN){
        LOGGER.log('info', 'DELETE - returning a 404 status code');
        return response.sendStatus(404);
      }
      LOGGER.log('info', 'DELETE - returning a 200 status code');
      LOGGER.log('info',MOUNTAIN);

      response.json(MOUNTAIN).delete();
      return response.json(MOUNTAIN);

    }).catch(error => {
      if(error.message.indexOf('Cast to ObjectId failed') > -1){
        LOGGER.log('info', 'DELETE - returning a 404 status code. could not parse the id');
        return response.sendStatus(404);
      }
      LOGGER.log('error', 'DELETE - returning a 500 code');
      LOGGER.log('error', error);
      return response.sendStatus(500);
    });
});