'use strict'

const mongoose = require('mongoose')

const Album = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  tracks: [{type: mongoose.Schema.Types.ObjectId, ref: 'track'}]
})

module.exports = mongoose.model('album', Album)