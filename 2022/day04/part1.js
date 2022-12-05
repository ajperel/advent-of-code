/**
 * Solutions for Advent of Code 2022, Day 4, Part 1.
 * Original problem: https://adventofcode.com/2022/day/4
 */


let testInput = [
  '2-4,6-8',
  '2-3,4-5',
  '5-7,7-9',
  '2-8,3-7',
  '6-6,4-6',
  '2-6,4-8'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let pairs = input.map(x => x.split(/[-,]/).map(n => parseInt(n, 10)));

let numFullyContained = pairs.reduce((result, pair) => {
  if ((pair[0] <= pair[2] && pair[1] >= pair[3]) ||
      (pair[0] >= pair[2] && pair[1] <= pair[3])) {
        return result + 1;
  }

  return result; 
}, 0);


console.dir({
  // input,
  // pairs,
  numFullyContained
});