'use strict'

// module.exports = {
//   makeBlue: function() {},
//   makeRed: function() {},
//   makeGreen: function() {},
//   makeOrange: function() {},
// }


// this is a common pattern
const colors = module.exports = {}
colors.makeBlue = function() {}

// module.exports = exports = {}
// exports = function() {} // This is bad, and overwrites what Node is trying to provide us

exports.makeBlue = function() {}
exports.makeRed = function() {}