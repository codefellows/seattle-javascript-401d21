'use strict';

const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },// htt://s3.amazon....
  createdOn: { type: Date, default: () => new Date() },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model('song', songSchema);