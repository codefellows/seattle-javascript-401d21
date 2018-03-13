'use strict';

// Vinicio - Optimized implementation in-place

const quicksort = items => {
  _quicksortHelper(items,0,items.length - 1);
};

const _quicksortHelper = (items,leftIndex,rightIndex) => {
  // Vinicio - base case is leftIndex > rightIndex
  if(rightIndex > leftIndex){
    let pivotIndex = _partition(items,leftIndex,rightIndex);

    _quicksortHelper(items,leftIndex,pivotIndex - 1);
    _quicksortHelper(items,pivotIndex + 1,rightIndex);
  }
};

const _partition = (items,leftIndex,rightIndex) => {
  // TODO : Selecet a pivot / Create first High / Update Array
  let pivotIndex = rightIndex;
  let firstHighIndex = leftIndex;

  for(let i = leftIndex; i < rightIndex; i++){
    // Vinicio - Checking the new element against the pivot
    if(items[i] < items[pivotIndex]){
      // Vinicio - we need to swap
      _swap(items,i,firstHighIndex);
      firstHighIndex++;
    }
  }
  _swap(items,pivotIndex,firstHighIndex);
  return firstHighIndex;
};

const _swap = (items,indexA,indexB) => {
  let helper = items[indexA]; // Vinicio - O(1);

  items[indexA] = items[indexB];
  items[indexB] = helper;
};

module.exports = quicksort;














