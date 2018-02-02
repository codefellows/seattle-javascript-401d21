'use strict';

const mongoose = require('mongoose');

const Rider = module.exports = mongoose.Schema({
  name: {type: String, max: 32},
  bikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'bikes'}],
});

Rider.pre('save', function(next) {
  this.validate((err) => {
    if(err) next(() => console.error(err))
    next()
  })
})

module.exports = mongoose.model('riders', Rider);