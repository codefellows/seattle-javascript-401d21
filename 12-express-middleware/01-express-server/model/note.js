'use strict';

// vinicio - mongoose is the ORM to connect to mongo
const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  title : {
    type : String,
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

// vinicio - internally, this becomes 'notes'
module.exports = mongoose.model('note',noteSchema);