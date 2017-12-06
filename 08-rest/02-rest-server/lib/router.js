'use strict';

const requestParser = require('./request-parser');
const logger = require('./logger');

let routeHandlers = {
  POST :{},
  GET :{},
  DELETE :{},
  PUT :{},
  // vinicio - more methods could be added
};

const router = module.exports = {};

let logUrlAndCallback = (httpMethod,url,callback) => {
  logger.log('info',`Adding a ${httpMethod} url and callback`);
  logger.log('info',url);
  logger.log('info',callback.toString());
};

// url will be something like 'api/notes'
// callback will be a function with the signature (request,response) =>
router.get = (url,callback) => {
  logUrlAndCallback('GET',url,callback);
  routeHandlers.GET[url] = callback;
};

router.post = (url,callback) => {
  logUrlAndCallback('POST',url,callback);
  routeHandlers.POST[url] = callback;
};

router.put = (url,callback) => {
  logUrlAndCallback('PUT',url,callback);
  routeHandlers.PUT[url] = callback;
};

router.delete = (url,callback) => {
  logUrlAndCallback('DELETE',url,callback);
  routeHandlers.DELETE[url] = callback;
};

router.route = (request,response) => {
  logger.log('info','Routing a Request');

  requestParser.parse(request)
    .then(request => {
      // vinicio - in this line, the request has been parsed
      let handlerFound = routeHandlers[request.method][request.url.pathname];
      // vinicio - error checking could be expanded here
      logger.log('info', 'Found the following handler');
      logger.log('info', handlerFound.toString());
      if(handlerFound)
        return handlerFound(request,response);
      else{
        response.writeHead(404);
        response.end();
        return;
      }
    })
    .catch(error => {
      logger.log('info', '__REQUEST_ERROR');
      logger.log('info', error);

      response.writeHead(400);
      response.end();
      return;
    });
};