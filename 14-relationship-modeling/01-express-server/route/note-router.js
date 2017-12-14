'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const Note = require('../model/note');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const noteRouter = module.exports = new Router();

noteRouter.post('/api/notes',jsonParser, (request,response,next) => {
  if(!request.body.title || !request.body.content) {
    return next(httpErrors(400,'body and content are required'));
  }
  
  return new Note(request.body).save()
    .then(note => response.json(note))//vinicio-this sends a 200
    .catch(error => next(error));
});

noteRouter.get('/api/notes/', (request,response,next) => {
  const PAGE_SIZE = 10;

  let {page = '0'} = request.query;
  page = Number(page);

  if(isNaN(page))
    page = 0;
  
  page = page < 0 ? 0 : page;
  // TODO : more validation

  let allNotes = null;

  return Note.find({})
    .skip(page * PAGE_SIZE)
    .limit(PAGE_SIZE)
    .then(notes => {
      allNotes = notes;
      return Note.find({}).count();
    })
    .then(noteCount => {
      // Vinicio - inside this then I have no access to 'notes'
      let responseData = {
        count : noteCount,
        data : allNotes,
      };
      // Next Page / Previous Page / Last Page
      let lastPage = Math.floor(noteCount / PAGE_SIZE);

      response.links({
        next : `http://localhost:${process.env.PORT}/api/notes?page=${page === lastPage ? lastPage : page + 1}`,
        prev : `http://localhost:${process.env.PORT}/api/notes?page=${page < 1 ? 0 : page - 1}`,
        last : `http://localhost:${process.env.PORT}/api/notes?page=${lastPage}`,
      });
      response.json(responseData);
    });
});

noteRouter.get('/api/notes/:id',(request,response,next) => {
  return Note.findById(request.params.id)
    .populate('category')// vinicio - use this with care
    .then(note => {      // wit great power comes great responsibility
      if(!note){
        throw httpErrors(404,'note not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(note);
    }).catch(next);
});

noteRouter.delete('/api/notes/:id',(request,response,next) => {
  return Note.findByIdAndRemove(request.params.id)
    .then(note => {
      if(!note){
        throw httpErrors(404,'note not found');
      }
      logger.log('info', 'GET - Returning a 204 status code');
      return response.sendStatus(204);
    }).catch(next);
});

noteRouter.put('/api/notes/:id',jsonParser,(request,response,next) => {
  // vinicio - this configures mongo update behavior
  let options = {runValidators: true, new : true};
  
  // vinicio -  additional validation before updating ?
  return Note.findByIdAndUpdate(request.params.id,request.body,options)
    .then(note => {
      if(!note){
        throw httpErrors(404,'note not found');
      }
      logger.log('info', 'GET - Returning a 200 status code');
      return response.json(note);
    }).catch(next);
});