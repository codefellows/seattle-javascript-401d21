'use strict';

const urlModule = require('url');
const logger = require('./logger');

const requestParser = module.exports = {};

requestParser.parse = (request) => {
  return new Promise((resolve,reject) => {

    logger.log('info', `Original URL: ${JSON.stringify(request.url)}`);
    request.url = urlModule.parse(request.url,true);
    logger.log('info', `Parsed URL: ${JSON.stringify(request.url)}`);

    if(request.method !== 'POST' && request.method !== 'PUT')
      return resolve(request);

    let sentText = '';
    request.on('data',(buffer) => {
      sentText += buffer.toString();
    });

    request.on('end',() => {
      try{
        if(request.headers['content-type'].indexOf('application/json') > -1){
          request.body = JSON.parse(sentText);
          return resolve(request);
        }else{
          return reject(request);
        }
      }catch(error){
        return reject(error);
      }
    });
  });
};