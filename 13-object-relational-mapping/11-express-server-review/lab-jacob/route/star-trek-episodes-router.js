'use strict';

const {Router} = require('express');
const jsonParser = require('body-parser').json();

const EpisodesModel = require('../model/star-trek-episodes');
const logger = require('../lib/logger');
const httpErrors = require('http-errors');

const starTrekEpisodesRouter = module.exports = new Router();


starTrekEpisodesRouter.get('/api/star-trek-episodes/', (request,response,next) => {
  const SEASON_SIZE = 10;

  let {episode = '0'} = request.query;
  episode = Number(episode);

  if(isNaN(episode))
    episode = 0;
  
  episode = episode < 0 ? 0 : episode;


  let allEpisodes = null;

  return EpisodesModel.find({})
    .skip(episode * SEASON_SIZE)
    .limit(SEASON_SIZE)
    .then(episode => {
      allEpisodes = episode;
      return EpisodesModel.find({}).count();
    })
    .then(episodeAmount => {// vinicio - TODO : refactor 'episodeAmount' name
      let responseData = {
        count : episodeAmount,
        data : allEpisodes,
      };
      let lastEpisode = Math.floor(episodeAmount / SEASON_SIZE);

      response.links({
        next : `http://localhost:${process.env.PORT}/api/star-trek-episodes?episode=${episode === lastEpisode ? lastEpisode : episode + 1}`,
        prev : `http://localhost:${process.env.PORT}/api/star-trek-episodes?episode=${episode < 1 ? 0 : episode - 1}`,
        last : `http://localhost:${process.env.PORT}/api/star-trek-episodes?episode=${lastEpisode}`,
      });
      response.json(responseData);
    });
});

starTrekEpisodesRouter.post('/api/star-trek-episodes',jsonParser, (request, response, next)=>{
  if(!request.body.title || !request.body.content){
    return next(httpErrors(400, 'body and content are required'));
  }
  return new EpisodesModel(request.body).save()
    .then(episode => response.json(episode))
    .catch(next);
});

starTrekEpisodesRouter.get('/api/star-trek-episodes/:id', (request, response, next) => {
  return EpisodesModel.findById(request.params.id)
    .then(episode => {
      if(!episode){
        throw httpErrors(404,('Episode not found'));
      }
      return response.json(episode);   
    }).catch(next);
});


starTrekEpisodesRouter.get('/api/star-trek-episodes/', (request, response, next) => {
  return EpisodesModel.find({})
    .then(episodes => {
      if(!episodes){
        throw httpErrors(404, ('Episodes Not Found'));
      }
      return response.json(episodes);
    }).catch(next)
});


starTrekEpisodesRouter.delete('/api/star-trek-episodes/:id', (request, response, next) => {
  return EpisodesModel.findByIdAndRemove(request.params.id)
    .then(episode => {
      if(!episode){
        throw httpErrors(404, 'episode not found');
      }
      return response.sendStatus(204);
    }).catch(next);
});

//PUT METHOD
starTrekEpisodesRouter.put('/api/star-trek-episodes/:id',jsonParser,(request,response,next) => {
  let options = {runValidators: true, new : true};
  
  return EpisodesModel.findByIdAndUpdate(request.params.id,request.body,options)
    .then(episode => {
      if(!episode){
        throw httpErrors(404,'episode not found');
      }
      return response.json(episode);
    }).catch(next);
});