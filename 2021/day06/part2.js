/**
 * Solutions for Advent of Code 2021, Day 6, Part 2.
 * Original problem: https://adventofcode.com/2021/day/6
 */


let testInput = [
  '3,4,3,1,2'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input[0].split(',').map(x => parseInt(x, 10));

let state = new Array(9).fill(0);

input.forEach(n => state[n] += 1);

for (let i = 0; i < 256; i++) {
  let num0 = state[0];
  for (let j = 0; j < state.length - 1; j++) {
    state[j] = state[j + 1];
  }

  state[6] += num0;
  state[8] = num0;
}

console.log({
  input,
  state,
  numFish: state.reduce((sum, cur) => sum + cur)
});
