'use strict';

// npm modules
const jsonParser = require('body-parser').json()
const listRouter = module.exports = new require('express').Router()

// app modules
const List = require('../model/list.js')

// module logic
listRouter.post('/api/lists', jsonParser, (req, res, next) => {
  console.log('hit POST /api/lists')
  new List(req.body)
  .save()
  .then(list => res.json(list))
  .catch(next)
})

listRouter.get('/api/lists/:id', (req, res, next) => {
  console.log('hit GET /api/lists/:id')

  List.findById(req.params.id)
  //.populate('tasks')
  .then(list => res.json(list))
  .catch(next)
})


listRouter.get('/api/lists', (req, res, next) => {
  console.log('hit /api/lists')

  let pageNumber = Number(req.query.page)
  if(!pageNumber || pageNumber < 1) pageNumber = 1;
  pageNumber--;

  List.find({})
  .sort({title: 'asc'})
  .skip(pageNumber * 50)
  .limit(50)
  .then(lists => res.json(lists))
  .catch(next)
})























