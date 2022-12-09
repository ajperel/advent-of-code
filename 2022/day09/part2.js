/**
 * Solutions for Advent of Code 2022, Day 9, Part 2.
 * Original problem: https://adventofcode.com/2022/day/9
 */


let testInputs = [
  [
    'R 4',
    'U 4',
    'L 3',
    'D 1',
    'R 4',
    'D 1',
    'L 5',
    'R 2'
  ], [
    'R 5',
    'U 8',
    'L 8',
    'D 3',
    'R 17',
    'D 10',
    'L 25',
    'U 20'
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let motions = input.map(line => line.split(' ')).map(arr => [arr[0], parseInt(arr[1], 10)]);

let visited = new Set();
visited.add('0,0');

let positions = [...new Array(10)].map(() => [0, 0]);

motions.forEach(([dir, nSteps]) => {
  for (let i = 0; i < nSteps; i++) {
    switch (dir) {
      case 'R':
        positions[0][0] += 1;
        break;
      case 'U':
        positions[0][1] += 1;
        break;
      case 'L':
        positions[0][0] -= 1;
        break;
      case 'D':    
        positions[0][1] -= 1;
        break;
    }

    for (let i = 1; i < positions.length; i++) {
      let xdiff = positions[i - 1][0] - positions[i][0];
      let ydiff = positions[i - 1][1] - positions[i][1];

      if (Math.abs(xdiff) > 1 && ydiff != 0 ||
          Math.abs(ydiff) > 1 && xdiff != 0) {
        positions[i][0] += 1 * Math.sign(xdiff); 
        positions[i][1] += 1 * Math.sign(ydiff); 
      } else if (Math.abs(xdiff) > 1) {
        positions[i][0] += 1 * Math.sign(xdiff); 
      } else if (Math.abs(ydiff) > 1) {
        positions[i][1] += 1 * Math.sign(ydiff); 
      }
    }

    visited.add(`${positions[positions.length - 1][0]},${positions[positions.length - 1][1]}`);
  }
});

console.dir({
  // input,
  // motions,
  // positions,
  // visited,
  visitedNum: visited.size
}, {depth: null});