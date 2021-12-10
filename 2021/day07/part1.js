/**
 * Solutions for Advent of Code 2021, Day 7, Part 1.
 * Original problem: https://adventofcode.com/2021/day/7
 */


let testInput = [
  '16,1,2,0,4,2,7,1,2,14'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input[0].split(',').map(n => parseInt(n, 10)).sort((a, b) => a - b);

function calculateMedian(numbers) {
  let length = numbers.length;
  let half = Math.floor(length / 2);

  return (length % 2 == 0) ?
      (input[half - 1] + input[half]) / 2 :
      input[half];
}

function calculateFuelCost(positions, point) {
  return positions.reduce((sum, current, i) => sum + Math.abs(positions[i] - point), 0);
}

let median = calculateMedian(input);
let cost = calculateFuelCost(input, median);

console.log({
  input,
  median,
  cost
});
