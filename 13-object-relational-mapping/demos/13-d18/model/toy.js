'use strict'

const debug = require('debug')('http:model-toy')
const mongoose = require('mongoose')

const Toy = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  desc: {type: String, required: true}
}, { timestamps: true })

module.exports = mongoose.model('toy', Toy)