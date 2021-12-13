/**
 * Solutions for Advent of Code 2021, Day 12, Part 2.
 * Original problem: https://adventofcode.com/2021/day/12
 */


let testInputs = [
  [
    'start-A',
    'start-b',
    'A-c',
    'A-b',
    'b-d',
    'A-end',
    'b-end'
  ],
  [
    'dc-end',
    'HN-start',
    'start-kj',
    'dc-start',
    'dc-HN',
    'LN-dc',
    'HN-end',
    'kj-sa',
    'kj-HN',
    'kj-dc'
  ],
  [
    'fs-end',
    'he-DX',
    'fs-he',
    'start-DX',
    'pj-DX',
    'end-zg',
    'zg-sl',
    'zg-pj',
    'pj-he',
    'RW-he',
    'fs-DX',
    'pj-RW',
    'zg-RW',
    'start-pj',
    'he-WI',
    'zg-he',
    'pj-fs',
    'start-RW'
  ]
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let edgeMap = new Map();

input.forEach(edge => {
  let [node1, node2] = edge.split('-');

  let destinations = edgeMap.get(node1) || [];
  destinations.push(node2);
  edgeMap.set(node1, destinations);

  destinations = edgeMap.get(node2) || [];
  destinations.push(node1);
  edgeMap.set(node2, destinations);
});

let isBigCave = (node => node.toUpperCase() === node);
let canVisit = ((node, path) => {
  if (isBigCave(node)) return true;
  if (node === 'start') return false;

  let wouldBeDuplicate = path.includes(node)

  if (!wouldBeDuplicate) return true;

  let nodeSet = new Set()
  let hasExistingSmallDuplicate = path.some(n => {
    if (isBigCave(n)) return false;

    if (nodeSet.has(n)) {
      return true;
    }

    nodeSet.add(n);
    return false;
  });

  return !hasExistingSmallDuplicate;
});

let partialPaths = [['start']];
let fullPaths = [];

while (partialPaths.length > 0) {
  let path = partialPaths.pop();
  let lastNode = path[path.length - 1];

  let destinations = edgeMap.get(lastNode).filter(node => canVisit(node, path));
  destinations.forEach(destination => {
    let nextPath = [...path, destination];

    if (destination == 'end') {
      fullPaths.push(nextPath);
    } else {
      partialPaths.push(nextPath);
    }
  });
}

console.log({
  input,
  edgeMap,
  fullPaths,
  answer: fullPaths.length
});
