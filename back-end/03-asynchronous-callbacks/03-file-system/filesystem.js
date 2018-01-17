'use strict'

const fs = require('fs')

fs.readFile(`${__dirname}/data/one.html`, (err, data) => {
  if(err) console.error(err)
  let buffer = data
  let fd = data.toString()
  let hex = data.toString('hex')
  let tim = hex * 3 // will return NaN

  // some manipulation or aggregation of the data, buffer or otherwise

  fs.writeFile(`${__dirname}/data/new.html`, tim, err => err ? console.error(err) : undefined)
})