'use strict';

//----------------------------------------------------
// ROUTER
//----------------------------------------------------
const {Router} = require('express');
const httpErrors = require('http-errors');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');
const Sound = require('../model/sound');
//----------------------------------------------------
// UPLOAD
//----------------------------------------------------
const multer = require('multer');
const upload = multer({dest: `${__dirname}/../temp`});
const s3 = require( '../lib/s3');
//----------------------------------------------------

const soundRouter = module.exports = new Router();

soundRouter.post('/sounds',bearerAuthMiddleware,upload.any(),(request,response,next) => {
  if(!request.account)
    return next(new httpErrors(404,'_ERROR_ not found'));

  if(!request.body.title || request.files.length > 1 ||
  request.files[0].fieldname !== 'sound')
    return next(new httpErrors(400,'__ERROR__ invalid request'));
  
  let file = request.files[0];
  let key = `${file.filename}.${file.originalname}`;
  //let key = `${file.filename}`;

  return s3.upload(file.path,key)
    .then(url => {
      return new Sound({
        title : request.body.title,
        account : request.account._id,
        url,
      }).save();
    })
    .then(sound => response.json(sound))
    .catch(next);
});