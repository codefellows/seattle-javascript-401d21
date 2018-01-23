'use strict'

// function concat(num, str) {
//   return new Promise((resolve, reject) => {
//     if(!num || !str) return reject(new Error('there be a problem!'))

//     return resolve(num + str)
//   })
// }

// console.log(concat(1, 'hello'))

const fs = require('fs')

let firstRead = fs.readFile(`${__dirname}/promise.js`, (err, data) => {
  return new Promise((resolve, reject) => {
    if(err) return reject(new Error('barf'))
    return resolve(data.toString())
  })
})

firstRead
  .then()
  .then()
  .then()
  .then()
  .then()
  .then()
  .catch()


fs.readFile(`${__dirname}/promise.js`, (err, data) => {
  if(err) throw new Error('barf')

  console.log(data.toString())
})