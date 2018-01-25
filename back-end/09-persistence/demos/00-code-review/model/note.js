'use strict'

const uuid = require('uuid/v4')
const debug = require('debug')('http:note-constructor')

module.exports = function(title, content) {
  if(!title) return new Error('Title required to create new Note')
  if(!content) return new Error('Content required to create new Note')

  this.title = title
  this.content = content
  this._id = uuid()
  debug(`Created a note: ${this}`)
}


// new Note(undefined) => {title: 'No title', content: undefined}
// module.exports = function(title, content='No Content') {
//   // if(!title) return new Error('Title required to create new Note')
//   // if(!content) return new Error('Content required to create new Note')

//   this.title = title || 'No title'
//   this.content = content
//   this._id = uuid()
//   debug(`Created a note: ${this}`)
// }