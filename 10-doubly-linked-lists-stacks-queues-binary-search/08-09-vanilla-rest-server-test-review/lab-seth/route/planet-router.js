'use strict';

const Planet = require('../model/planet');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

let sendStatus = (response,status,message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info',jsonData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('/api/planet', (request,response) => {
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'name not found');
    return;
  }
  if(!request.body.content){
    sendStatus(response,400,'content not found');
    return;
  }
  let planet = new Planet(request.body.name,request.body.content);
  storage.addItem(planet)
    .then(() => {
      sendJSON(response, 200, planet);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

router.get('/api/planet', (request,response) => {
  if(!request.url.query.id){
    storage.fetchAll()
      .then((planets) => {
        sendJSON(response, 200, planets);
      })
      .catch(error => {
        sendStatus(response, 500, error);
      });
  }else {
    storage.fetchItem(request.url.query.id)
      .then((planet) => {
        console.log('Specific Planet: ', planet);
        sendJSON(response, 200, planet);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });
  }
});

router.delete('/api/planet', (request, response) => {
  storage.deleteItem(request.url.query.id)
    .then((filteredPlanets) => {
      sendJSON(response, 204, filteredPlanets);
    })
    .catch(error => {
      sendStatus(response, 404, error);
    });
});