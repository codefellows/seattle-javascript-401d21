'use strict';

const mongoose = require('mongoose');

const soundSchema = mongoose.Schema({
  title : { type : String, required : true},
  url : { type : String, required : true},
  createdOn : { type : Date, default : () => new Date()},

  account : {
    type : mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('sound',soundSchema);