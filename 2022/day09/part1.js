/**
 * Solutions for Advent of Code 2022, Day 9, Part 1.
 * Original problem: https://adventofcode.com/2022/day/9
 */


let testInput = [
  'R 4',
  'U 4',
  'L 3',
  'D 1',
  'R 4',
  'D 1',
  'L 5',
  'R 2'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let motions = input.map(line => line.split(' ')).map(arr => [arr[0], parseInt(arr[1], 10)]);

let visited = new Set();
visited.add('0,0');
let hPos = [0, 0];
let tPos = [0, 0];

motions.forEach(([dir, nSteps]) => {
  for (let i = 0; i < nSteps; i++) {
    switch (dir) {
      case 'R':
        hPos[0] += 1;
        break;
      case 'U':
        hPos[1] += 1;
        break;
      case 'L':
        hPos[0] -= 1;
        break;
      case 'D':    
        hPos[1] -= 1;
        break;
    }

    let xdiff = hPos[0] - tPos[0];
    let ydiff = hPos[1] - tPos[1];

    if (Math.abs(xdiff) > 1 && ydiff != 0 ||
        Math.abs(ydiff) > 1 && xdiff != 0) {
      tPos[0] += 1 * Math.sign(xdiff); 
      tPos[1] += 1 * Math.sign(ydiff); 
    } else if (Math.abs(xdiff) > 1) {
      tPos[0] += 1 * Math.sign(xdiff); 
    } else if (Math.abs(ydiff) > 1) {
      tPos[1] += 1 * Math.sign(ydiff); 
    }

    visited.add(`${tPos[0]},${tPos[1]}`);
  }
});


console.dir({
  // input,
  // motions,
  // visited,
  visitedNum: visited.size
}, {depth: null});