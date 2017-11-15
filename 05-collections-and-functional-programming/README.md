![cf](http://i.imgur.com/7v5ASc8.png) 05: Collections and Functional Programming
=====================================

# Learning Objectives
* students will be able to determine and describe the runtime complexity of an algorithm
* students will understand the difference between a constructor function and a factory function
* students will be able to identify and explain the qualities of imperative and functional code
* students will be able to implement a functional array-like list with map, filter, reduce, and forEach methods

# Resources
* Read [simple wiki big o]
* Watch [hacker rank big o video]
* Skim at [big o cheat sheet]
* Watch [funfunfunction functional programming video series]
* Read [what is functional programming]
* Read [Why functional programming](https://github.com/getify/Functional-Light-JS/blob/master/ch1.md)
* Skim [functional programming jargon]

## Big O
* big-o is a way of describing the speed and memory usage of an algorithm
* algorithms can run faster or slower given a specific input thus we only use big-o to describe the worst case
* the letter "n" is used to describe the number of items/calculations an algorithm is operating on
* if an algorithm only makes single statements in the worst case, it is said that the algorithm runs with an "O(1)" runtime
  * "O(1)" runtime is also called constant time
* if an algorithm recursively cuts its iteration in half from "n" until 1, it is said that the algorithm runs with an "O(log(n))" runtime
  * "O(log(n))" runtime is also called logarithmic
* if an algorithm runs through every item, it is said that the algorithm runs with an "O(n)" runtime
  * "O(n)" runtime is also called linear time
* if an algorithm runs through a list of "n" items "n" times it is said that the algorithm runs with an "O(n^2)" runtime.
  * "O(n^2)" runtime is also called quadratic time


## Functional Programing
* in order to understand functional programing you must understand what a side-effect is
  * a side effect is when a function alters state defined outside its scope
* a program with no side effects at all is not very useful
  * no side effects means no input or output from or to devices and the user
* because a program with no-side effects is not useful, functional programers try two write their code as functional as possible
  * they do this by creating as few functions and with as few side effects as possible
  * they also have design patterns for wrapping functions with side effects so they act like pure functions
  * functional programmers use a powerful technique called function composition that allows them to create functions out of function combinations
* pros of functional programming:
  * easy to test
  * when done correctly it's more readable
  * by isolating the the code with the most potential for bugs (code with side effects) to as few places as possible, you reduce the time it takes to track down bugs
  * encourages modularization
* cons of functional programming
  * looks more complex at first
  * functions may contain more arguments

## Imperative vs Functional
* imperative code is hard to read because you have to figure out what is happening on each line - loops are a great example of this as they are generally harder to read the more compex they get

## Factory Functions
* a factory function is a pure function that acts like a constructor but without the new keyword
  * you can think of this as a single object builder, not constructor

# Whiteboard Exercise (Groups of 3-4)
* implement a `List` constructor
* implement `pop()` as a method of your list data structure
* implement `map()` as a method of your list data structure
* implement `filter()` as a method of your list data structure
* **bonus:** implement `reduce()` as a method of your list data structure


[simple wiki big o]: https://simple.wikipedia.org/wiki/Big_O_notation
[hacker rank big o video]: https://www.youtube.com/watch?v=v4cd1O4zkGw
[funfunfunction functional programming video series]: https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
[functional programming jargon]: https://github.com/hemanth/functional-programming-jargon#functional-programming-jargon
[what is functional programming]: http://blog.jenkster.com/2015/12/what-is-functional-programming.html
[functional-Light JS Book]: https://github.com/getify/Functional-Light-JS
[Big O Cheat Sheet]: http://bigocheatsheet.com/
