/**
 * Solutions for Advent of Code 2021, Day 7, Part 2.
 * Original problem: https://adventofcode.com/2021/day/7
 */


let testInput = [
  '16,1,2,0,4,2,7,1,2,14'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input[0].split(',').map(n => parseInt(n, 10)).sort((a, b) => a - b);

function calculateMean(numbers) {
  return numbers.reduce((sum, current) => sum + current) / numbers.length;
}

function calculateFuelCost(positions, point) {
  return positions.reduce((sum, current, i) => {
    let distance = Math.abs(point - current);
    let cost = (distance * (distance + 1)) / 2;
    return sum + cost;
  }, 0);
}

let mean = calculateMean(input);
let cost = Math.min(
    calculateFuelCost(input, Math.floor(mean)),
    calculateFuelCost(input, Math.ceil(mean)));

console.log({
  input,
  mean,
  cost
});
