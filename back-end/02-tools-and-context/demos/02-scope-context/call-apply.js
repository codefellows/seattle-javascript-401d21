'use strict'

// Apply example
var arr = [23, 4, 55, 62, 9, 12, 36, 97, 87, 65];

function stats(array) {
  return {
    //min: Math.min(...array), // Math.min(23, 4, 55, 62, 9, 12, 36, 97, 87, 65)
    min: Math.min.apply(null, array),
    max: Math.max.apply(null, array),
    avg: array.reduce(a, b => a + b) / array.length,
  }
}

// Call example
function User(name, password, age) {
  this.name = name
  this.password = password
  this.age = age
}

let someUser = new User('sally', 'monster', 33)

// function SuperUser(name, password) {
//   User.call(this, name, password)
//   this.isAdmin = true
// }

// let superU = new SuperUser('dan', 'smelly-cat')

let copyOfSally = Object.assign({}, someUser)
let SuperUser = Object.create(User, {name: 'Super', password: 'Duper'})

