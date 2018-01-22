'use strict'

const EE = require('events').EventEmitter
const ee = module.exports = new EE()

ee.on('someEvent', function (data) {
  console.log('ran the thing!', data)
})