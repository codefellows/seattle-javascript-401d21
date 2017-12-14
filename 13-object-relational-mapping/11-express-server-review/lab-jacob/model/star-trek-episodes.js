'use strict';

const mongoose = require('mongoose');

const episodeSchema = mongoose.Schema({
  title : {
    type : String,
    required : true,
    unique : true,
  },
  episode : {
    type : Number,
    required : true,
    unique : true,
  },
  content : {
    type : String,
    required : true,
    minlength : 10,
  },
  timestamp : {
    type : Date,
    default : () => new Date(),
  },
});

module.exports = mongoose.model('episode',episodeSchema);