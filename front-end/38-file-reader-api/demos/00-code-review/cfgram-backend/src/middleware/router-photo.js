import {Router} from 'express'
import {bearerAuth} from './parser-auth.js'
import parserBody from './parser-body.js'
import Photo from '../model/photo.js'

export default new Router()
.post('/photos', bearerAuth, parserBody, (req, res, next) => {
  Photo.create(req)
  .then(res.json)
  .catch(next)
})
.get('/photos', (req, res, next) => {
  Photo.fetch(req)
  .then(res.page)
  .catch(next)
})
.get('/photos/me', bearerAuth, (req, res, next) => {
  Photo.fetch(req, {username: req.user.usrename})
  .then(res.page)
  .catch(next)
})
.get('/photos/:id', (req, res, next) => {
  Photo.fetchOne(req)
  .then(res.json)
  .catch(next)
})
.put('/photos/:id', bearerAuth, parserBody, (req, res, next) => {
  Photo.update(req)
  .then(res.json)
  .catch(next)
})
.delete('/photos/:id', bearerAuth, (req, res, next) => {
  Photo.delete(req)
  .then(() => res.sendStatus(204))
  .catch(next)
})
