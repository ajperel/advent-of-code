/**
 * Solutions for Advent of Code 2020, Day 10, Part 1.
 * Original problem: https://adventofcode.com/2020/day/10
 */


let testInput1 = [
  '16',
  '10',
  '15',
  '5',
  '1',
  '11',
  '7',
  '19',
  '6',
  '12',
  '4',
];

let testInput2 = [
  '28',
  '33',
  '18',
  '42',
  '31',
  '14',
  '46',
  '20',
  '48',
  '47',
  '24',
  '23',
  '49',
  '45',
  '19',
  '38',
  '39',
  '11',
  '1',
  '32',
  '25',
  '35',
  '8',
  '17',
  '7',
  '9',
  '4',
  '2',
  '34',
  '10',
  '3',
];

// let input = testInput2;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(value => parseInt(value, 10)).sort((a, b) => a - b);

let {num1Diff, num3Diff} = input.reduce((answer, value, index, arr) => {
  if (index == 0 || value - arr[index - 1] == 1) {
    answer.num1Diff += 1;
  } else if (value - arr[index - 1] == 3) {
    answer.num3Diff += 1;
  }
  return answer;
}, {num1Diff: 0, num3Diff: 0});

// Account for built in adapter.
num3Diff += 1;

console.log('num1: ' + num1Diff + ', num3: ' + num3Diff + ', product: ' + num1Diff * num3Diff);
