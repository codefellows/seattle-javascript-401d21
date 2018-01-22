'use strict'

module.exports = function(buffer) {
  this.allData = buffer
  this.sig = buffer.toString('utf-8', 0, 2)
  this.fileSize = buffer.readUInt32LE(2)
  this.offset = buffer.readUInt32LE(10)
  this.width = buffer.readUInt32LE(18)
  this.height = buffer.readUInt32LE(22)
  this.pixelArray = buffer.slice(54, this.offset)
  this.colorTable = buffer.slice(this.offset)
}