'use strict'

// Write a function that takes N as it's only argument
// and returns the sum total of 0 to N

function sumIterative(n) {
  let agg = 0
  let x = n

  for(n; n > 0; n--) {
    agg += n
  }

  return agg
}

function recurse() {
  if(count === 10) return
  count++
  recurse()
}


function sumRecursive(n) {
  if(!n) return 1
  return n + sumRecursive(n - 1)
}

let sumOneLineRecursive = n => n === 0 ? 0 : n + sumRecursive(n - 1)