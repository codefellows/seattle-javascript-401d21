'use strict'

const debug = require('debug')('http:storage')

// Example setup for promisifying the fs module (any callback based module/api)
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
// fs.readFile(path, callback)
// fs.readFileProm(path).then().catch()
// fs.readDir

const storage = module.exports = {}

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

    let jsonData = JSON.stringify(item)

    return fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, jsonData)
    .then(() => resolve(jsonData))
    .catch(reject)
  })
}

storage.fetchOne = function(schema, itemId) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'))
    if(!itemId) return reject(new Error('400, Cannot find record. Item ID required.'))

    return fs.readFileProm(`${__dirname}/../data/${schema}/${itemId}.json`)
    .then(data => resolve(data.toString()))
    .catch(reject)
  })
}

storage.fetchAll = function(schema) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('400, Cannot find record. Schema required.'))

    return fs.readdirProm(`${__dirname}/../data/${schema}`)
    .then(data => data.map(id => id.split('.')[0]))
    .then(ids => resolve(ids))
    .catch(reject)
  })
}

storage.update = function(schema, itemId, item) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Cannot update. Schema required.'))
    if(!itemId) return reject(new Error('Cannot update. Item ID required.'))
    if(!item) return reject(new Error('Cannot update. Item required.'))
    if(item._id !== itemId) return reject(new Error('Cannot update. Invalid ID'))

    return fs.readFileProm(`${__dirname}/../data/${schema}/${item._id}.json`)
    .then(data => data.toString())
    .then(json => JSON.parse(json))
    .then(oldData => {
      return {
        title: item.title || oldData.title,
        content: item.content || oldData.content,
        _id: oldData._id,
      }
    })
    .then(JSON.stringify)
    .then(json => fs.writeFileProm(`${__dirname}/../data/${schema}/${item._id}.json`, json))
    .then(resolve)
    .catch(reject)
  })
}

storage.delete = function(schema, itemId) {

}