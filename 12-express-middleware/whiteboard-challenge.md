# LinkedList Intersection
Write code to intersect two linked lists. Assume the two LinkedLists are sorted.

Given the following two lists the result only contains the values `2` and `4`
because those are the only values that appear in both lists.

```
list 1: 0 2 3 4 5
list 2: 1 2 4 6
result: 2 4
```

You may assume you have the following `LinkedList` class:

```javascript
class LinkedList {
  constructor(value){
    this.value = value
    this.next = null
  }
  append(node){
    if(!(node instanceof LinkedList))
      throw new TypeError('append requires a linked list')
    if(!this.next){
      this.next = node
      return this
    }
    this.next.append(node)
    return this
  }
  
  toString() {
    var str = "";
    var current = this;
    while (current) {
      str += current.value + " ";
      current = current.next;
    }
    return str;
  }
}
```

## Solutions
* ![Marking values as "seen" with a HashMap](./whiteboard-solution-1.js)
* ![Walking through two lists simultaneously](./whiteboard-solution-2.js)
