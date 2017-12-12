'use strict';

const mongoose = require('mongoose');

const mountainSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
  state : {
    type : String,
    required : true,
  },
  range : {
    type : String,
    required : true,
  },
  timestamp : {
    type : Date,
    default : () => new Date(),
  },
});

module.exports = mongoose.model('mountain', mountainSchema);