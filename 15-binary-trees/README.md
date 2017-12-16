![cf](http://i.imgur.com/7v5ASc8.png) 15: Career Coaching - Day 1
===

## Learning Objectives
* Students will learn about the tree data structure

## What is a Tree?

Trees are a widely used data structure that simulate a hierarchical "tree" structure. These data structures contain a **root**, which may or may not contain a series of child sub-trees. They can also be defined recursively as a collection of nodes, which starts at the root node and each node is a data structure consisting of a value and an array of references to any child nodes. Trees are also considered to be a directed, acyclic, connected graph.

## Breaking Down A Tree
  * **root:** - the top node in a tree
  * **child:** - a node that's a direct sub-tree of another node
  * **siblings:** - a group of nodes with the same parent
  * **leaf:** - a node with node children

## Tree Traversals
### Pre-order
* Check if the current node is empty / null.
* Display the data part of the root (or current node).
* Traverse the left subtree by recursively calling the pre-order function.
* Traverse the right subtree by recursively calling the pre-order function.

### Post-Order
* Check if the current node is empty / null.
* Traverse the left subtree by recursively calling the post-order function.
* Traverse the right subtree by recursively calling the post-order function.
* Display the data part of the root (or current node).

### In-Order
* Check if the current node is empty / null.
* Traverse the left subtree by recursively calling the in-order function.
* Display the data part of the root (or current node).
* Traverse the right subtree by recursively calling the in-order function.

## Useful Implementations of Trees**
  * the DOM
  * a computer file system
  * sorting and searching
