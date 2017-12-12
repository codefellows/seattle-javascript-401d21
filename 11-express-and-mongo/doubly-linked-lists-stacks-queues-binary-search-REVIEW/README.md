![cf](https://i.imgur.com/7v5ASc8.png) Lab 10: Doubly Linked List, Binary Search, Stacks, and Queues.
======

## Submission Instructions
* Work in a fork of this repository
* Work in a branch on your fork
* Write all of your code in a directory named `lab-` + `<your name>` **e.g.** `lab-susan`
* Open a pull request to this repository
* Submit on canvas a question and observation, how long you spent, and a link to your pull request

## Configuration 
Configure the root of your repository with the following files and directories. Thoughtfully name and organize any additional configuration or module files.
* **README.md** - contains documentation
* **.gitignore** - contains a [robust](http://gitignore.io) `.gitignore` file 
* **.eslintrc.json** - contains the course linter configuration
* **.eslintignore** - contains the course linter ignore configuration
* **package.json** - contains npm package config
* **model/** - contains module definitions
* **\_\_test\_\_/** - contains test modules

## Feature Tasks  
### Doubly Linked List
__Start with the `DoublyLinkedLinked` class created during class.__
* Add a `remove` method that removes a Node from a doubly linked list by reference
* Add a method of your choice to the constructor (use array methods for inspiration)

##### Tests
Unit test each method of your constructor. Consider 2 regular cases (one simple and one complex) and 2 edge cases. 

### Stack or Queue
Implement a Stack or a Queue using (internally) a Linked List.
* Implement the push/pop or dequeue/enqueue methods respectively.

##### Tests
Unit test each method of your constructor. Consider 2 regular cases (one simple and one complex) and 2 edge cases. 

### Binary Search
Implement a version of binary search that works with an array of objects instead of an array of numbers:

```javascript
let sampleArray = [
  {id: 10, name = 'Demi'},
  {id: 20, name = 'Sir Gregor'},
  {id: 30, name = 'The Hound'},
]

let binarySearch = (sortedObjectArray,id){

};

//Sample call
binarySearch(sampleArray,30);
```

##### Tests
Unit test the new version of binary search considering at least 2 regular cases and 2 edge cases.

## Documentation
In your README.md describe the exported values of each module you have defined. Every function description should include it's arity (expected number of parameters), the expected data for each parameter (data-type and limitations), and it's behavior (for both valid and invalid use). Feel free to write any additional information in your README.md.


## Bonus (2 Points)
Implement and test the Data Structure you didn't implement for the  "Stacks or Queue" section of the lab.
