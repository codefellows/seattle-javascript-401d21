![cf](http://i.imgur.com/7v5ASc8.png) 15: Stacks and Queues
===

# Learning Objectives
* Students will be able to implement a stack
* Students will be able to identify use cases for a stack
* Students will be able to implement a queue
* Students will be able to identify use cases for a queue

## Resources
* Watch [stacks and queues](https://www.youtube.com/watch?v=wjI1WNcIntg)
* Read [stack wiki](https://en.wikipedia.org/wiki/Stack_(abstract_data_type))
* Skim [queue wiki](https://en.wikipedia.org/wiki/Queue_(abstract_data_type))

#### Stacks
  * stacks are a data structure that serve as a collection of elements
  * these elements are *stacked* in a last in, first out sequence **aka: (LIFO - last in first out)**
  * **helper:** it may help to think about a stack as a collection of plates and the way that you add and remove them
  * stacks are often used for:
    * history capability with undo functionality
    * call stack management
  * `pop` removes the most recent element from the stack
  * `push` adds a new element to the stack

#### Queues
  * queues are also a data structure that serve as a collection of elements
  * elements in a queue are added in a first in, first out sequence **aka: FIFO - first in first out**
  * **helper:** it may help to think about a queue as a bunch of people standing in line at a concert - the first person in line is the first person in the venue
  * `enqueue` is used to add an element to the end of a queue
  * `dequeue` is used to retrieve and remove an element from the beginning of a queue

#### Whiteboard Exercise (Groups of 2)
  * implement a stack
    * implement `push` and `pop` prototype methods
  * implement a queue
    * implement `enqueue` and `dequeue` prototype methods
