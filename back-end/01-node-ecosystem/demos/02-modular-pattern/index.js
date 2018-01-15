'use strict'

const pi = require('./lib/pi')
const randoms = require('./lib/randoms.js')
// randoms => function (min, max) {
//   return Math.random() * (max - min) + 1
// }

randoms(10, 100) // => some val between 10-100