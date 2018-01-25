'use strict'

const debug = require('debug')('http:storage')

// Example setup for promisifying the fs module (any callback based module/api)
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
// fs.readFile(path, callback)
// fs.readFileProm(path).then().catch()
fs.readDir

const storage = module.exports = {}
const memory = {}

// memory = {
//   'Notes': {
//     '1234.5678.9012': {
//       '_id': '1234.5678.9012',
//       'title': '',
//       'content': '',
//     },
//   },
//   'Categories': {
//     ...
//   },
// }

storage.create = function(schema, item) {
  debug('Created a new thing')

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot create a new item; Schema required'))

    if(!memory[schema]) memory[schema] = {}

    memory[schema][item._id] = item
    return resolve(memory[schema][item._id])
  })
}

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'))
    if(!itemId) return reject(new Error('400, Cannot find record. Item ID required.'))
    if(!memory[schema][itemId]) return reject(new Error('404, Cannot find record. Does not exist.'))

    return resolve(memory[schema][itemId])
  })
}

storage.fetchAll = function(schema) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'))
    if(!memory[schema]) return reject(new Error('404, Cannot complete request. No records match Schema.'))

    let ids = Object.keys(memory[schema])

    return resolve(ids)
  })
}

storage.update = function(schema, itemId, item) {

}

storage.delete = function(schema, itemId) {

}
