'use strict'

const reader = require('../lib/reader')
require('jest')

describe('Reader Module', function() {
  describe('#read', () => {
    let paths = [`${__dirname}/data/one.txt`, `${__dirname}/data/two.txt`, `${__dirname}/data/three.txt`]

    describe('Valid inputs', () => {
      it('should return the file data in the same order passed; one, two, three', (done) => {
        let expected = 'Short.Long.Medium.'
        reader.read(paths, (err, results) => {
          let arr = [results[0].split(' ')[0], results[1].split(' ')[0], results[2].split(' ')[0]].join('')

          expect(expected).toEqual()
          done()
        })
      })


      it('should accept an array of file paths and return a null argument for err', (done) => {
        reader.read(paths, (err, results) => {
          // console.log('err', err)
          expect(err).toBeNull()
          done()
        })
      })

      it('should accept an array of file paths and return an array of results', (done) => {
        reader.read(paths, (err, results) => {
          expect(results).toBeInstanceOf(Array)
          done()
        })
      })
      it('should accept an array of file paths and return something', (done) => {
        reader.read(paths, (err, results) => {
          expect(results).not.toBeNull()
          done()
        })
      })
      it('should return an array with the length of 3', (done) =>{
        reader.read(paths, (err, results) => {
          expect(results.length).toBe(3)
          done()
        })
      })
    })

    // describe('Invalid inputs', () => {
    //   it('should return an error given invalid file paths', () => {

    //   })
    // })

  })
  // describe('#writer', () => {
  //   it('should ...', () => {})
  //   it('should ...', () => {})
  //   it('should ...', () => {})
  // })
})
