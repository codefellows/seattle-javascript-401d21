'use strict'

module.exports = function (err, res) {
  let msg = err.message.toLowerCase()

  switch(true) {
    case msg.includes('validation'): return res.status(400).send(`${err.name}: ${err.message}`)
    case msg.includes('enoent'): return res.status(404).send(`${err.name}: ${err.message}`)
    case msg.includes('path error'): return res.status(404).send(`${err.name}: ${err.message}`)
    case msg.includes('objectid failed'): return res.status(404).send(`${err.name}: ${err.message}`)
    case msg.includes('duplicate key'): return res.status(409).send(`${err.name}: ${err.message}`)
    default: return res.status(500).send(`${err.name}: ${err.message}`)
  }
}