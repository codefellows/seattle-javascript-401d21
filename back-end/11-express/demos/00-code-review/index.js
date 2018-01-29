'use strict'

// implement a queue example
class Node {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

module.exports = class Queue {
  constructor() {
    this.front = null
    this.back = null
  }

  enqueue(val) {
    let node = new Node(val)

    // if(!this.back && !this.front) {
    //   this.front = this.back = node
    //   return this
    // }

    // this.back.next = node
    // this.back = node
    // return this


    this.back ? this.back.next = node : this.front = node
    this.back = node
    return this
  }

  dequeue() {
    if(!this.front && !this.back) throw new Error('Queue is empty.')
    // if(this.front === this.back) {
    //   let temp = this.front
    //   this.front = this.back = null
    //   return temp
    // }

    // let temp = this.front
    // this.front = this.front.next
    // temp.next = null

    // return temp


    let temp = this.front
    this.front = this.front.next
    if(!this.front) this.back = null
    temp.next = null
    return temp
  }
}