Part 1
* Represent a Singly Linked list using an object literal.

Part 2
* Write a function `const traverse = (list) => {...` to traverse a linked list printing each node's value.


```javascript
// let data = {
//   value: 3, 
//   next: {
//     value: 8, 
//     next: {
//       value: 11, 
//       next: null,
//     },
//   },
// }

// Vinicio - All these answers are O(n), if you see anyone using an iterative approach, make sure it's not O(n^2).
const traverse = (list) => {
  while(list){
    console.log(list.value);
    list = list.next;
  }
};

// Vinicio -  Other solution
const traverse = (list) => {
  if(!list) return;
  console.log(list.value);
  traverse(list.next);
};
```
