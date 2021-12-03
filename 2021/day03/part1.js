/**
 * Solutions for Advent of Code 2021, Day 3, Part 1.
 * Original problem: https://adventofcode.com/2021/day/3
 */


let testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(x => x.split('').map(x => parseInt(x, 10)));

let sums = input.reduce((sums, next) => {
  return sums.map((sum, i) => sum + next[i]);
});

let numReports = input.length;

let gammaRate = parseInt(sums.map(sum => sum > Math.ceil(numReports / 2) ? 1 : 0).join(''), 2);
let epislonRate = parseInt(sums.map(sum => sum < Math.ceil(numReports / 2) ? 1 : 0).join(''), 2);

let powerConsumption = gammaRate * epislonRate;

console.log({sums, gammaRate, epislonRate, powerConsumption});
