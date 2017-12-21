'use strict';

const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  bio : {type : String},
  avatar : {type : String},
  lastName : {type : String},
  firstName : {type : String},

  account : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    unique : true,
  },
});

module.exports = mongoose.model('profile', profileSchema);
