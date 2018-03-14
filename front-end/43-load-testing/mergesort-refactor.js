// 'use strict';
//
// const mergeSort = items => {
//   let output = []; // Vinicio - this will hold a copy of the element
//
//   //TODO : Implement complete validation
//   _mergeSort(items,0,items.length -1);
// }
//
//
//   // Vinicio - Change items.
//   //return output;
// };
//
// const _mergeSort = (items,left,right) => {
//
//   const middlePoint = Math.floor(items.length / 2);
//
//   //----------------------------------------------------------------------
//   // Vinicio - is this the most optimal use of memory?
//   const leftSide = _mergeSort(items, 0,middlePoint));
//   const rightSide = _mergeSort(items, middlePoint,items.length -1);
//   //----------------------------------------------------------------------
// for(i = left; i < right; i++)
//     //--------------------------------------------------------------------
//     // Vinicio - Do we have all the elements on the left?
//     if(leftSide.length && !rightSide.length){
//       output = output.concat(leftSide); // Vinicio - memory?
//       break;
//     }
//     // Vinicio - Do we have all the elements on the right?
//     if(!leftSide.length && rightSide.length){
//       output = output.concat(rightSide); // Vinicio - memory?
//       break;
//     }
//     //--------------------------------------------------------------------
//     // Vinicio - We have elements on both sides
//     if(leftSide[0] <= rightSide[0])
//       output.push(leftSide.shift()); // Vinicio - memory?
//     else
//       output.push(rightSide.shift()); // Vinicio - memory
//   }
//
// };
//
// module.exports = mergeSort;
