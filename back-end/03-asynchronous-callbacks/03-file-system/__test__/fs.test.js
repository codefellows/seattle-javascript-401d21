'use strict'

const myFs = require('../filesystem')
require('jest')

describe('File System Lib', function() {
  it('should do a thing asyncronously', (done) => {
    // When testing async code:

    // Using the done keyword
    myFs.doAThingAsyn(data, (err, fd) => {
      if(err) console.log(err)
      expect(fd).toBe(true)
      done()
    })

    // Without the done keyword (don't need the done param in the IT block)
    return myFs.doAThingAsyn(data, (err, fd) => {
      if(err) console.log(err)
      expect(fd).toBe(true)
    })
  })
})