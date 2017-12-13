'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Date, required: true }
});

module.exports = mongoose.model('list', listSchema);
