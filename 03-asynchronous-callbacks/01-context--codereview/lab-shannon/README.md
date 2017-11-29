The program contains custom .map, .filter, .slice, and .reduce functions.

.map: The .map function takes two parameters- a callback function and an array of values. It returns a new array containing elements altered from the initial array according to the callback function provided. If the argument provided for the callback is not a function a Type Error is thrown. If one of the elements in the collection is of the wrong type for the callback function provided (i.e. trying to add a string to numbers) a Type Error will be thrown.

.filter: The .filter function takes two parameters- a callback function and an array of values. It returns a new array containing only the elements which fit the criteria provided in the callback function. If the argument provided for the callback is not a function a Type Error is thrown.

.slice: The .slice function takes three parameters- a starting position (number), a ending position (number), and an array of data. It returns a new array of elements from the starting point to the ending point (not inclusive) in the collection provided. If one of the elements in the collection is of the wrong type for the callback function provided (i.e. trying to slice a string instead of elements in an array) a Type Error will be thrown.


.reduce: The .reduce function takes three parameters- a callback function, an array of data, and an initial value. It returns a single value resulting from adding each value in the collection onto the initial value provided. If the argument provided for the callback is not a function a Type Error is thrown. If one of the elements in the collection is of the wrong type for the callback function provided (i.e. trying to add a string to numbers) a Type Error will be thrown.
TODO:
* Add comments about accepted input values