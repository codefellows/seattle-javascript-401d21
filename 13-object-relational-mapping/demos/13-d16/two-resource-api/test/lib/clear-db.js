'use strict'

const List = require('../../model/list.js');

module.exports = () => {
  return Promise.all([
    List.remove({}),
  ])
}
