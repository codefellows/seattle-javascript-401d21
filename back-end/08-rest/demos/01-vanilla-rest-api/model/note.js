'use strict'

const uuid = require('uuid/v4')
const debug = require('debug')('http:note-constructor')

module.exports = function(title, content) {
  this.title = title
  this.content = content
  this._id = uuid()
  debug(`Created a note: ${this}`)
}