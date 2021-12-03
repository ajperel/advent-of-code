/**
 * Solutions for Advent of Code 2021, Day 1, Part 1.
 * Original problem: https://adventofcode.com/2021/day/1
 */


let testInput = [
  199,
  200,
  208,
  210,
  200,
  207,
  240,
  269,
  260,
  263
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map((val) => parseInt(val, 10));

let numIncreases = 0;

for (let i = 1; i < input.length; i++) {
  if (input[i] > input[i - 1]) {
    numIncreases += 1;
  }
}

console.log('Number of increases: ', numIncreases);
