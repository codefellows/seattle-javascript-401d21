'use strict'

const HashTable = module.exports = function(size=1024) {
  this.size = size
  this.memory = [...Array(this.size)] // => [SLL, SLL, SLL]
}

HashTable.prototype.hashKey = function(key) {
  let hash = key.split('').reduce((a, b) => a + b.charCodeAt(0), 0) % this.size
  return hash
}

HashTable.prototype.set = function(key, value) {
  // Implement the collision detection and handle that through a SLL
  // Stretch goal => Implement with buckets as binary trees

  this.memory[this.hashKey(key)] = value
}

HashTable.prototype.get = function(key) {
  // Implement the lookup for your buckets and their respective data structures
  return this.memory[this.hashKey(key)]
}

HashTable.prototype.remove = function(key) {
  let address = this.hashKey(key)

  return this.memory[address] ? delete this.memory[address] : new Error('Invalid Key.')
}


