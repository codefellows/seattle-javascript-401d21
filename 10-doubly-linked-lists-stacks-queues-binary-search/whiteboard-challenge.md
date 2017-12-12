```javascript
// Write a recursive function called loop that 
// has the function signature (count, callback) => undefined
// it should call the callback count times (count is expected to be > 0)
const loop = (count, callback) => {
  if(count < 1) return
  callback()
  loop(count - 1, callback)
}

// usage:
// loop(3, () => console.log('hello loop'))


//Write a function that takes a function as its only argument and returns a new function.
//This new function can be called an infinite amount of times, but it will only execute the original function on the first call

let once = (fn) =>  {
  let done = false
  return (...args) => {
    if(done) return
    done = true
    return fn(...args)
  }
}
```
