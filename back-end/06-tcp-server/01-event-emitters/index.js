'use strict'

const events = require('./lib/events')
const mod = require('./lib/module')

let eventIWantToRunAnytimeIWant = mod(events)

eventIWantToRunAnytimeIWant('data from somewhere else, Tim.')

