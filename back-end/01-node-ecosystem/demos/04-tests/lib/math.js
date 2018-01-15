'use strict'

const math = module.exports = {}

math.floor = function(num) {
  if(typeof num !== 'number') return new Error('barf')
  return Math.floor(num)
}

// math.ceiling = function(num) {
//   return Math.ceil(num)
// }

// math.absolute = function(num) {
//   return Math.abs(num)
// }