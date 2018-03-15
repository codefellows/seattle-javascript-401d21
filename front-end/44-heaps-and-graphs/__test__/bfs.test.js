'use strict';

const Graph = require('../src/graph');
const Node = require('../src/node');
const BFS = require('../src/bfs');
require('jest');

describe('BFS Search',() => {
  test('Simple Search',() => {
    let graph = new Graph();

    //--------------------------------------------------------------
    // Vinicio - Setting a Test Graph
    //--------------------------------------------------------------
    let node5 = new Node(5);
    let node10 = new Node(10);
    let node15 = new Node(15);
    let node20 = new Node(20);
    let node25 = new Node(25);
    let node30 = new Node(30);
    let node35 = new Node(35);
    let node40 = new Node(40);
    let node45 = new Node(45);
    let node50 = new Node(50);
    let node100 = new Node(100);

    graph.addNode(node5);
    graph.addNode(node10);
    graph.addNode(node15);
    graph.addNode(node20);
    graph.addNode(node25);
    graph.addNode(node30);
    graph.addNode(node35);
    graph.addNode(node40);
    graph.addNode(node45);
    graph.addNode(node50);
    //--------------------------------------------------------------
    graph.addEdge(node5,node45);
    graph.addEdge(node5,node35);
    graph.addEdge(node5,node30);
    graph.addEdge(node5,node20);
    graph.addEdge(node5,node10);

    graph.addEdge(node10,node20);
    graph.addEdge(node30,node20);
    graph.addEdge(node30,node40);
    graph.addEdge(node40,node50);

    graph.addEdge(node10,node15);
    graph.addEdge(node20,node25);
    graph.addEdge(node15,node25);
    //--------------------------------------------------------------

    let paths = BFS(graph,node5,node25);
    console.log(paths);
    expect(paths).not.toBeNull();
    expect(paths.has(node25)).toBeTruthy();

    let nonExistentPaths = BFS(graph,node5,node100);
    expect(nonExistentPaths).toBeNull();
  });
});