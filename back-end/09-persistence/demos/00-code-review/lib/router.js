'use strict'

const debug = require('debug')('http:Router')
const bodyParser = require('./body-parser')
const urlParser = require('./url-parser')

const Router = module.exports = function() {
  this.routes = {
    GET: {
      // Just a hard-coded example
      // '/api/v1/note': (req, res) => {},
      // '/api/v1/note/:id': (req, res) => {},
    },
    POST: {},
    PUT: {},
    DELETE: {},
  }
}

// ['get', 'post', 'put', 'delete'].map(method => {
//   Router.prototype[method] = function(endpoint, callback) {
//     this.routes[method.toUpperCase()][endpoint] = callback
//   }
// })

Router.prototype.get = function(endpoint, callback) {
  // debug(`Router: GET ${endpoint} mounted`)
  this.routes.GET[endpoint] = callback
}

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback
}

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback
}

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback
}

Router.prototype.route = function() {
  return (req, res) => {
    Promise.all([
      urlParser(req),
      bodyParser(req),
    ])
    .then(() => {
      debug('Successfully parsed the Body and URL')

      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res)
        return
      }

      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('Not Found')
      res.end()
      return
    })
    .catch(err => {
      debug(`There was an error parsing the URL or Body: ${err}`)

      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('Bad Request')
      res.end()
      return
    })
  }
}