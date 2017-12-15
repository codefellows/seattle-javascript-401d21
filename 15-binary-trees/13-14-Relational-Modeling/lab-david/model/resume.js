'use strict';

const mongoose = require('mongoose');


const resumeSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  age : {
    type : Number,
  },
  timeStamp : {type : Date,
    default : () => new Date() },
  projects : [{type: mongoose.Schema.Types.ObjectId,
    ref : 'project'}],
},{
  usePushEach : true,
});

module.exports = mongoose.model('resume', resumeSchema);