Write a function that will intersect two arrays

```javascript
'use strict'

let intersect = (a, b) => {
  let result = []
  let found = {} 
  for(let i=0; i<a.length; i++)
    found[a[i]] = true
  for(let i=0; i<b.length; i++)
    if(found[b[i]])
      result.push(b[i])
  return result
}

// better version
let betterIntersect = (a, b) => {
  let found = new Set(a)
  return b.reduce((result, value) => {
    return found.has(value) ? [...result, value] : result
  }, [])
}
```

//Write a function that takes a function as its only argument and returns a new function.
//This new function can be called an infinite amount of times, but it will only execute the original function on the first call

``` Javascript
let once = (fn) =>  {
  let done = false
  return (...args) => {
    if(done) return
    done = true
    return fn(...args)
  }
}
```
