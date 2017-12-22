'use strict';

class MinHeap{
  constructor(){
    this._data = [];
  }

  _getParentIndex(index){
    if(index === 0)
      return null;
    
    return Math.floor((index - 1) / 2);
  }

  _getLeftIndex(index){
    return (2 * index) + 1;
  }

  _getRightIndex(index){
    return (2 * index) + 2;
  }
  
  _swapValues(indexA,indexB){
    let tempSwapValue = this._data[indexA];

    this._data[indexA] = this._data[indexB];
    this._data[indexB] = tempSwapValue;
  }

  _bubbleUp(index){
    let parentIndex = this._getParentIndex(index);

    if(parentIndex === null)
      return;
    
    // vinicio - checking for min-heap property
    //           parents should ALWAYS be smaller
    if(this._data[parentIndex] > this._data[index]){
      this._swapValues(parentIndex,index);
      this._bubbleUp(parentIndex);
    }
  }

  insert(value){
    if(typeof value !== 'number')
      throw new TypeError('__ERROR__ value should be numeric');

    this._data.push(value);
    this._bubbleUp(this._data.length - 1);
  }

  _bubbleDown(rootIndex){// vinicio - rootIndex is the root
    let minIndex = rootIndex;
    let leftIndex = this._getLeftIndex(rootIndex);
    let rightIndex = this._getRightIndex(rootIndex);

    if(leftIndex <= this._data.length - 1){
      if(this._data[minIndex] > this._data[leftIndex])
        minIndex = leftIndex;
    }

    if(rightIndex <= this._data.length - 1){
      if(this._data[minIndex] > this._data[rightIndex])
        minIndex = rightIndex;
    }

    if(minIndex !== rootIndex){
      this._swapValues(rootIndex,minIndex);
      this._bubbleDown(minIndex);
    }
  }

  extractMinimum(){
    if(this._data.length <= 0)
      return null;
    
    let min = this._data[0];
    let lastValue = this._data.pop();

    this._data[0] = lastValue;
    this._bubbleDown(0);
    return min;
  }

  peek(){
    return this._data[0];
  }
}

module.exports = MinHeap;