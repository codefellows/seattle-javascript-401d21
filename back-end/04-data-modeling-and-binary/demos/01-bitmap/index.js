'use strict'

const fs = require('fs')
const Bmp = require('./lib/bitmap')

console.log(process.argv[2])

fs.readFile('./assets/bitmap.bmp', (err, data) => {
  let bmp = new Bmp(data)
  console.log(bmp)

  console.log(bmp.pixelArray.length)
})