Write code to intersect two linked lists.
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
}

LinkedList.intersect = (listA, listB) => {
  let encountered = {}
  let result = new LinkedList(null)
  while(listA){
    encountered[listA.value] = true
    listA = listA.next
  }
  while(listB){
    if(encountered[listB.value])
      result.append(new LinkedList(listB.value))
    listB = listB.next
  }
  return result.next
}


let a = new LinkedList(3).append(new LinkedList(4)).append(new LinkedList(5))
let b = new LinkedList(3).append(new LinkedList(4)).append(new LinkedList(6))

let c = LinkedList.intersect(a, b)
```
