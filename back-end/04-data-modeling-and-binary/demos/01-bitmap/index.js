'use strict'

const fs = require('fs')
const Bmp = require('./lib/bitmap')

// console.log(process.argv[2])

fs.readFile('./assets/bitmap.bmp', (err, data) => {
  let bmp = new Bmp(data)
  console.log(bmp)

  // console.log(bmp.pixelArray.length)
  // console.log(bmp.colorTable[0], bmp.colorTable[1], bmp.colorTable[2], bmp.colorTable[3])
  for(let i = 0; i < bmp.pixelArray.length; i+4) {
    let gray = (bmp.pixelArray[i] + bmp.pixelArray[i + 1] + bmp.pixelArray[i + 2]) / 3

    bmp.pixelArray[i] = gray
    bmp.pixelArray[i+1] = gray
    bmp.pixelArray[i+2] = gray
  }

  fs.writeFile(`${__dirname}/assets/new.bmp`, bmp.allData, (err, data) => {
    if(err) throw new Error(err)
    console.log('made it')
  })
})