const Queue = require('./lib/queue');

class KAryTree{
  constructor(value){
    this.value = value;
    this._children = [];// vinicio - you could sort this
  }

  appendChild(tree){
    if(!(tree instanceof KAryTree))
      throw new TypeError('must insert a k-ary tree');

    this._children.push(tree);
  }

  breathFirstSearch(){
    let queue = new Queue();
    queue.enqueue(this);

    let current = null;

    while(queue.getLength() > 0){
      current = queue.dequeue();

      console.log(`Visiting ${current.value}`);

      for(let child of current._children)
        queue.enqueue(child);
    }
  }
}

let one = new KAryTree(1);
let two = new KAryTree(2);
let three = new KAryTree(3);
let four = new KAryTree(4);
let five = new KAryTree(5);
let six = new KAryTree(6);
let seven = new KAryTree(7);
let eight = new KAryTree(8);

one.appendChild(two);
one.appendChild(three);
one.appendChild(four);

three.appendChild(five);
three.appendChild(six);
three.appendChild(seven);

six.appendChild(eight);

one.breathFirstSearch();