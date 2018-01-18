'use strict'

const fs = require('fs')
const reader = module.exports = {}


reader.read = function(paths, cb) {
  // let one = paths[0]
  // let two = paths[1]
  // let three = paths[2]
  // shorthand destructuring
  let [one, two, three] = paths
  let results = []

  fs.readFile(one, (err, data) => {
    if(err) {
      console.error(err)
      return cb(err)
    }

    results.push(data.toString())
    fs.readFile(two, (err, data) => {
      if(err) {
        console.error(err)
        return cb(err)
      }

      results.push(data.toString())
      fs.readFile(three, (err, data) => {
        if(err) {
          console.error(err)
          return cb(err)
        }

        results.push(data.toString())
        return cb(null, results)
      })
    })
  })
}


// Does not maintain the correct order of files read and file results
// reader.read = function(paths, cb) {
//   // let one = paths[0]
//   // let two = paths[1]
//   // let three = paths[2]
//   // shorthand destructuring
//   let [one, two, three] = paths
//   let results = []

//   fs.readFile(one, (err, data) => {
//     if(err) {
//       console.error(err)
//       return cb(err)
//     }

//     results.push(data.toString('utf-8', 0, 32))
//   })

//   fs.readFile(two, (err, data) => {
//     if(err) {
//       console.error(err)
//       return cb(err)
//     }

//     results.push(data.toString('utf-8', 0, 32))
//   })

//   fs.readFile(three, (err, data) => {
//     if(err) {
//       console.error(err)
//       return cb(err)
//     }

//     results.push(data.toString('utf-8', 0, 32))
//     return cb(null, results)
//   })
// }