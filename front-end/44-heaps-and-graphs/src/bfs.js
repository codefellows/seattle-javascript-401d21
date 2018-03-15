'use strict';

module.exports = (graph,startNode,goalNode) => {

  if(startNode === goalNode)
    throw new Error('__ERROR__ invalid path');

  let queue = [];
  let visitedNodes = new Set();
  let parentMap = new Map(); // Vinicio - this has all the paths
  
  // equeue startNode into the queue (1)
  // while the queue is not empty do... (2)
  //  dequeue one value (3)
  //  check if we are at end Node? (4)
  //        either return parentMap OR continue looking
  //  take ALL the neigboors and put them in thequeue // (5)
  //  keep looking // (6)

  queue.unshift(startNode); // (1)
  visitedNodes.add(startNode);

  while(queue.length > 0){ // (2) and (6)
    let currentNode = queue.pop(); // (3)

    if(currentNode === goalNode) {
      queue = [];
      return parentMap;
    }// (4)
    
    // Vinicio - this is actually getting al the edges
    let neighbors = graph.getNeighbors(currentNode);
    for(let neighbor of neighbors){
      // Vinicio - neighbor is something like - {node,0}
      let neighborNode = neighbor.node;
      
      if(visitedNodes.has(neighborNode))
        continue;
      else
        visitedNodes.add(neighborNode); 
      
      // Vinicio - I'm at current node, and the next one
      //           in the path is neighborNode
      parentMap.set(neighborNode,currentNode);
      queue.unshift(neighborNode); // (5)
    }
  }
  return null;
};