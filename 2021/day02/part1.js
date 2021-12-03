/**
 * Solutions for Advent of Code 2021, Day 2, Part 1.
 * Original problem: https://adventofcode.com/2021/day/2
 */


let testInput = [
  'forward 5',
  'down 5',
  'forward 8',
  'up 3',
  'down 8',
  'forward 2',
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(x => {
  var pieces = x.split(' ');

  return {
    command: pieces[0],
    val: parseInt(pieces[1], 10)
  }
});

let zPos = 0;
let xPos = 0;

input.forEach(operation => {
  switch(operation.command) {
    case 'forward':
      xPos += operation.val;
      break;
    case 'down':
      zPos += operation.val;
      break;
    case 'up':
      zPos -= operation.val;
      break;
  };
})

const answer = xPos * zPos;

console.log({xPos, zPos, answer});
