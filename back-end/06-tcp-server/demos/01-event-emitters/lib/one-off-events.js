'use strict'

// const events = require('events')
// const EE = events.EventEmitter
// const ee = new EE()

const EE = require('events').EventEmitter
const ee = new EE()

// Defines a custom event and listener
ee.on('myEvent', function () {
  console.log('I ran "myEvent"')
})

// Manually triggers the event, which runs the defined callback
ee.emit('myEvent')

// My event now needs to receive data as arguments when emitted
ee.on('dataEvent', function (data) {
  console.log('Received data', data)
})


function runEvents() {
  ee.emit('myEvent')
  ee.emit('dataEvent', { data: 'data to send to the callback' })
}

runEvents()