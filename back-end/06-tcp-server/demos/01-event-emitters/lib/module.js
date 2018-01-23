'use strict'

module.exports = function(ee) {
  // some other data aggregation happens here before the function return is used
  let str = 'I got some data from somewhere else in the app!'

  return function(data) {
    ee.emit('someEvent', str + data)
  }
}