'use strict';

module.exports = class Graph{
  constructor(){
    this._adjacencyList = new Map();
  }
  
  addNode(node){
    this._adjacencyList.set(node,[]);
  }

  // Vinicio - this will make an edge from start to end
  addEdge(startNode,endNode,weight = 0){
    if(!this._adjacencyList.has(startNode) || 
    !this._adjacencyList.has(endNode))
      throw new Error('__ERROR__ invalid nodes');
    
      // Vinicio - getting a reference to the internal array
      let adjacencies = this._adjacencyList.get(startNode);


      // Vinicio - optionally, you can make an Edge class
      adjacencies.push({
        node:endNode,
        weight,
      });

      // Vinicio - we would do something like this to make a bidirectional edge
      // let endAdjacencies = this._adjacencyList.get(endNode);

      // endAdjacencies.push({
      //   node:startNode,
      //   weight,
      // })
  }

  getNeighbors(node){
    if(!this._adjacencyList.has(node))
      throw new Error('__ERROR__ invalid node');
    
    return [...this._adjacencyList.get(node)];
  }
}