'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();
const Project = require('../model/project');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const projectRoute = module.exports = new Router();

projectRoute.post('/api/projects', jsonParser, (request,response,next) => {
  if(!request.body.year || !request.body.title) {
    return next(httpErrors(400, 'year and title are required'));
  }

  return new Project(request.body).save()
    .then(project => response.json(project))
    .catch(error => next(error));
});

projectRoute.get('/api/projects/:id', (request,response,next) => {
  return Project.findById(request.params.id)
    .populate('resume')
    .then(project => {
      if(!project){
        throw httpErrors(404,`project not found`);
      }
      logger.log('info', 'GET - returning a 200 status');
      return response.json(project);
    })
    .catch(next);
});

projectRoute.delete('/api/projects/:id',(request,response,next) => {
  return Project.findByIdAndRemove(request.params.id)
    .then(project => {
      if(!project){
        throw httpErrors(404,`project was not found. go back to start, do not collect $200.`);
      }
      logger.log('info', 'GET -> returning a 204 status');
      return response.sendStatus(204);
    }).catch(next);
});

projectRoute.put('/api/projects/:id', jsonParser,(request,response,next) => {
  let options = {runValidators : true, new : true};

  return Project.findByIdAndUpdate(request.params.id,request.body,options)
    .then(project => {
      if(!project){
        throw httpErrors(404, 'project was not found');    
      }
      logger.log('info', 'PUT -> returning a 200 status code'); 
      return response.json(project);
    })
    .catch(next);
});
