'use strict';

const mergeSort = items => {
  let output = []; // Vinicio - this will hold a copy of the element

  //TODO : Implement complete validation

  if(items.length < 2)
      return items;

  if(items.length === 2){
    // Vinicio - Extra memory!
    return items[0] < items[1] ? items : items.reverse();
  }

  const middlePoint = Math.floor(items.length / 2);

  //----------------------------------------------------------------------
  // Vinicio - is this the most optimal use of memory?
  const leftSide = mergeSort(items.slice(0,middlePoint));
  const rightSide = mergeSort(items.slice(middlePoint));
  //----------------------------------------------------------------------

  while(leftSide.length || rightSide.length){
    //--------------------------------------------------------------------
    // Vinicio - Do we have all the elements on the left?
    if(leftSide.length && !rightSide.length){
      output = output.concat(leftSide); // Vinicio - memory?
      break;
    }
    // Vinicio - Do we have all the elements on the right?
    if(!leftSide.length && rightSide.length){
      output = output.concat(rightSide); // Vinicio - memory?
      break;
    }
    //--------------------------------------------------------------------
    // Vinicio - We have elements on both sides
    if(leftSide[0] <= rightSide[0])
      output.push(leftSide.shift()); // Vinicio - memory?
    else
      output.push(rightSide.shift()); // Vinicio - memory
  }
  return output;
};

module.exports = mergeSort;
















