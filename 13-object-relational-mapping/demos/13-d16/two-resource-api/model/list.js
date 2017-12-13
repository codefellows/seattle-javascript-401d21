'use strict'

const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
  title: {type: String, required: true, unique: true}, 
  tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'task'}],
})

module.exports = mongoose.model('list', listSchema)
