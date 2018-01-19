'use strict'

// function Node(val) {
//   this.val = val
//   this.next = null
// }

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

module.exports = Node
// const myNode = require('./nd') // Just refs for what the import/require will look like in another file
// myNode(...)
// export default Node


// module.exports = {...}
// const myNode = require('./nd')
// myNode.Node(...)
// export const Node