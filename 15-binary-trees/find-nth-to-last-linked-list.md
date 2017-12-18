return the nth from last node in a linked list

```javascript

// Bash Master Duncan Marsh
let nthFromLast = (node, num) => {
  let offset = node;
  for(var i = 0; i< num && offset; i++)
    offset = offset.next;
  if(i < num)
    return null;
  while(offset){
    node = node.next;
    offset = offset.next;
  }
  return node;
}

// Matthew Parkers' solution
const node = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: null
    }
  }
}

const nthFromLast = (head, n) => {
  let p1 = head, p2 = head;

  for (let i = 0; i < n; i++) {
    p2 = p2.next;
    if(!p2) return null
  }

  while(p2.next){
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
}


nthFromLast(node, 2) // will print { value: 1, next: { value: 2, next: { value: 3, next: null } } }
nthFromLast(node, 1) // will print { value: 2, next: { value: 3, next: null } }
nthFromLast(node, 0) // will print { value: 3, next: null }
