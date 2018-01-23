'use strict'

const urlParser = require('url')
const queryString = require('querystring')

module.exports = function(request) {
  return new Promise((resolve, reject) => {
    request.url = urlParser.parse(request.url)
    request.url.query = queryString.parse(request.url.query)

    if(request.method !== 'POST' && request.method !== 'PUT')  return resolve(request)

    let message = ''

    request.on('data', data => {
      message += data.toString()
    })

    request.on('end', () => {
      try {
        request.body = JSON.parse(message)
        return resolve(request)
      } catch(err) {
        return reject(err)
      }
    })

    request.on('error', err => {
      return reject(err)
    })
  })
}