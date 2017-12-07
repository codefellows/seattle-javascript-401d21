'use strict';

const reqParser = require('./req-parser');
const logger = require('./logger');

let routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
};

let logUrlAndCallback = (httpMethod, url, callback) => {
  logger.log('info', `Adding a ${httpMethod} url and callback.`);
  logger.log('info', url);
  logger.log('info', callback.toString());
};

const router = module.exports = {};

router.post = (url, callback) => {
  routeHandlers.POST[url] = callback;
  logUrlAndCallback('POST', url, callback);
};

router.get = (url, callback) => {
  routeHandlers.GET[url] = callback;
  logUrlAndCallback('GET', url, callback);
};

router.put = (url, callback) => {
  routeHandlers.PUT[url] = callback;
  logUrlAndCallback('PUT', url, callback);
};

router.delete = (url, callback) => {
  routeHandlers.DELETE[url] = callback;
  logUrlAndCallback('DELETE', url, callback);
};

// vinicio - finding and calling routes
router.route = (req, res) => {
  logger.log('info', 'Routing a request.');
  reqParser.parse(req)// vinicio - this returns a promise
    .then(req => {
      let handlerFound = routeHandlers[req.method][req.url.pathname];
      if(handlerFound) {
        logger.log('info', 'Found the following handler:');
        logger.log('info', handlerFound.toString());
        return handlerFound(req, res);
      } else {
        logger.log('info', 'Bad endpoint hit. 404.');
        res.writeHead(404);
        res.end();
        return;
      }
    })
    .catch(err => {
      logger.log('info', '__REQUEST_ERROR__');
      logger.log('info', err);
      res.writeHead(400, {
        'Content-Type': 'application/json',
      });
      res.write(JSON.stringify({error: 'bad request, no object sent.'}));
      res.end();
      return;
    });
};