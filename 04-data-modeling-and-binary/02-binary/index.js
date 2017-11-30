'use strict';

// let stringBuffer = Buffer('The Hound');

// console.log(`Buffer as a string: ${stringBuffer.toString()}`);
// console.log(`Buffer as hex`);
// console.log(stringBuffer);

// console.log('Extracting only one character');
// console.log(stringBuffer.readUInt8(0));
// //console.log(stringBuffer.readUInt16LE(0));

// console.log(stringBuffer.readUInt16LE(0));
// console.log(stringBuffer.readUInt32LE(0));

// console.log(stringBuffer.toString('hex'));
// console.log(stringBuffer.toString('base64',0,1));

// let fromBase64 = Buffer.from('VA==','base64');
// console.log(fromBase64.toString());

//vinicio - reading the first 16 bytes of a number

//stringBuffer.fill(97);

// stringBuffer.writeUInt8(97,2);// vinicio - 2 is not the size
// console.log(stringBuffer);
// console.log(stringBuffer.toString());

// stringBuffer.write('and');
// console.log(stringBuffer);
// console.log(stringBuffer.toString());

const bitmap = require('./lib/bitmap');
const fs = require('fs');

fs.readFile(`${__dirname}/assets/house.bmp`, (error,data) => {
  if(error)
  {
    console.error(error);
    return;
  }

  let parsedBitmap = bitmap.parseBitmap(data);
  console.log(parsedBitmap);
});