'use strict';

const bitmap = module.exports = {};

function Bmp(buffer) {
  this.allData = buffer;
  this.sig = buffer.toString('utf-8', 0, 2);
  this.fileSize = buffer.readUInt32LE(2);
  this.offset = buffer.readUInt32LE(10);
  this.width = buffer.readUInt32LE(18);
  this.height = buffer.readUInt32LE(22);
  this.colorArray = buffer.slice(54, this.offset);
  this.pixelArray = buffer.slice(this.offset);
}



bitmap.parse = function(buffer, callback) {
  if(!buffer) return callback(`Error: buffer is ${buffer}`);
  let imgBuff;
  try {
    imgBuff = new Bmp(buffer);
  }
  catch(e){
    imgBuff = {sig:null};
  }
  if (imgBuff.sig !== 'BM') return callback('Error: is not a Windows format bitmap');
  callback(null, imgBuff);
};
