![cf](http://i.imgur.com/7v5ASc8.png) 05: Collections and Functional Programming
=====================================

# Learning Objectives
* Students will be able to determine and describe the runtime complexity of an algorithm
* Students will understand the difference between a constructor function and a factory function
* Students will be able to identify and explain the qualities of imperative and functional code
* Students will be able to implement a functional array-like list with `map`, `filter`, `reduce`, and `forEach` methods

# Resources
* Read [simple wiki big o]
* Watch [hacker rank big o video]
* Skim at [big o cheat sheet]
* Watch [funfunfunction functional programming video series]
* Read [what is functional programming]
* Read [Why functional programming](https://github.com/getify/Functional-Light-JS/blob/master/ch1.md)
* Skim [functional programming jargon]

## Big O
Big-o is a way of describing the speed and memory usage of an algorithm. Algorithms can run faster or slower given a specific input, thus we only use big-o to describe the worst case scenario. The letter "n" is used to describe the number of items/calculations an algorithm is operating on.

If an algorithm only makes single statements in the worst case, it is said that the algorithm runs with an "O(1)" runtime.  This runtime is also called constant time.

If an algorithm recursively cuts it's iteration in half from "n" until 1, it is said that the algorithm runs with an "O(log(n))" runtime. This runtime is also called logarithmic time.

If an algorithm runs through every item, it is said that the algorithm runs with an "O(n)" runtime. This runtime is also called linear time.

If an algorithm runs through a list of "n" items "n" times it is said that the algorithm runs with an "O(n^2)" runtime. This runtime is also called quadratic time.

## Functional Programing
In order to understand functional programing, you must understand what a side-effect is. A side effect is when a function alters state defined outside of it's scope. A program with no side effects at all is not very useful. This means no input or output from or to devices and the user. Since a program with no-side effects is not useful, functional programers try two write their code as functional as possible. They do this by creating as few functions and with as few side effects as possible. They also have design patterns for wrapping functions with side effects so they act like pure functions. Functional programmers use a powerful technique called function composition that allows them to create functions out of function combinations.

* Pros of functional programming:
  * easy to test
  * when done correctly it's more readable
  * by isolating the the code with the most potential for bugs (code with side effects) to as few places as possible, you reduce the time it takes to track down bugs
  * encourages modularization
* Cons of functional programming:
  * looks more complex at first
  * functions may contain more arguments

## Imperative vs Functional
* Imperative code is hard to read because you have to figure out what is happening on each line. Loops are a great example of this as they are generally harder to read the more complex that they get.

## Factory Functions
A factory function is a pure function that acts like a constructor but without the new keyword. You can almost think of this as a single object builder, not a constructor that requires instantiation.

[simple wiki big o]: https://simple.wikipedia.org/wiki/Big_O_notation
[hacker rank big o video]: https://www.youtube.com/watch?v=v4cd1O4zkGw
[funfunfunction functional programming video series]: https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84
[functional programming jargon]: https://github.com/hemanth/functional-programming-jargon#functional-programming-jargon
[what is functional programming]: http://blog.jenkster.com/2015/12/what-is-functional-programming.html
[functional-Light JS Book]: https://github.com/getify/Functional-Light-JS
[Big O Cheat Sheet]: http://bigocheatsheet.com/
