'use strict';

//const mergeSort = require('./mergesort');
const quicksort = require('./quicksort');

let numericArray = [8,7,5,4,3,6,1];

//let sortedArray = mergeSort(numericArray);
quicksort(numericArray);

console.log(numericArray);
