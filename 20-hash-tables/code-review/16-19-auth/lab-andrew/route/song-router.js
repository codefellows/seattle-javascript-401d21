'use strict';

const {Router} = require('express');

const multer = require('multer');
const upload = multer({dest: `${__dirname}/../temp`});
const s3 = require('../lib/s3');

const httpErrors = require('http-errors');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const Song = require('../model/song');

const songRouter = module.exports = new Router();

songRouter.post('/songs', bearerAuthMiddleware, upload.any(), (request, response, next) => {
  if (!request.account){
    return next(new httpErrors(404, '__ERROR__ not found'));
  }

  if (!request.body.title || request.files.length > 1 || request.files[0].fieldname !== 'song'){
    return next(new httpErrors(400, '__ERROR__ invalid request'));
  }
  
  let file = request.files[0];
  let key = `${file.filename}.${file.originalname}`;

  return s3.upload(file.path, key)
    .then(url => {
      return new Song({
        title: request.body.title,
        account: request.account._id,
        url,
      }).save();
    })
    .then(song => response.json(song))
    .catch(next);
});

songRouter.get('/songs/:id', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return new httpErrors(404, '__ERROR__ not found');
  }
  return Song.findById(request.params.id)
    .then(song => response.json(song))
    .catch(next);
});

songRouter.delete('/songs/:id', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) {
    return new httpErrors(404, '__ERROR__ not found');
  }
  return Song.findById(request.params.id)
    .then(song => {
      let urlArray = song.url.split('/');
      let key = urlArray[urlArray.length - 1];
      // vinicio - removing from amazon
      return s3.remove(key) // Amazon
        .then(() => {
          // vinicio - removing from mongoose
          return Song.findByIdAndRemove(request.params.id)// Mongo
            .then(() => {
              response.sendStatus(204);
            });
        });
    })
    .catch(error => {
      return Song.findByIdAndRemove(request.params.id)
      .then(() => Promise.reject(error))
      .catch(next);
    });
});