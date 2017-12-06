'use strict';

const Note = require('../model/note');
const router = require('../lib/router');
const logger = require('../lib/logger');

let notes = [];

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

//           URL           CALLBACK
router.post('/api/notes', (request,response) => {
  // Here, I know that my request has been pre-parsed
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.title){
    sendStatus(response,400,'title not found');
    return;
  }
  if(!request.body.content){
    sendStatus(response,400,'content not found');
    return;
  }
  // Here, I can create my note since all test pass
  let note = new Note(request.body.title,request.body.content);
  notes.push(note);
  sendJSON(response,200,note);
});
