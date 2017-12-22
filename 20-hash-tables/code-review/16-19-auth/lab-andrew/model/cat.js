'use strict';

const mongoose = require('mongoose');

const catSchema = mongoose.Schema({
  says : {type : String},
  catPic : {type : String},
  lastName : {type : String},
  firstName : {type : String},
  account : {
    type : mongoose.Schema.Types.ObjectId,
    required : true,
    unique : true,
  },
});

module.exports = mongoose.model('cat', catSchema);