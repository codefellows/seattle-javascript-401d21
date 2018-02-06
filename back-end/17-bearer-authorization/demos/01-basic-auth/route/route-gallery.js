'use strict';

const Gallery = require('../model/gallery');
const bodyParser = require('body-parser').json();
const errorHandler = require('../lib/error-handler');
const bearerAuthMiddleware = require('../lib/bearer-auth-middleware');


module.exports = router => {
  
  router.route('/gallery/:id?')
    .post(bearerAuthMiddleware,bodyParser,(request,response) => {
      // vinicio - do I have a user in my request?
      // vinicio - TODO: Add error checking

      request.body.userId = request.user._id;

      return new Gallery(request.body).save()
        .then(createdGallery => response.status(201).json(createdGallery))
        .catch(error => errorHandler(error,response));
    })

    .get(bearerAuthMiddleware,(request,response) => {
      // vinicio - returns one gallery
      // vinicio - TODO: add extra checks
      if(request.params._id){
        return Gallery.findById(request.params._id)
          .then(gallery => response.status(200).json(gallery))
          .catch(error => errorHandler(error,response));
      }

      // vinicio - returns all the galleries
      return Gallery.find()
        .then(galleries => {
          let galleriesIds = galleries.map(gallery => gallery._id);

          response.status(200).json(galleriesIds);
        })
        .catch(error => errorHandler(error,response));
    });
  //vinicio - TODO : PUT and DELETE routes
};