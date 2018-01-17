'use strict'

const fs = require('fs')


fs.readFile('somePathToAmazing', function(err, data) {
  if(err) console.error(err)
  // do a thing with data.toString()
})

fs.readFileSync