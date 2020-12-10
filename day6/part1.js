/**
 * Solutions for Advent of Code 2020, Day 6, Part 1.
 * Original problem: https://adventofcode.com/2020/day/6
 */


let testInput = [
  'abc',
  'a\nb\nc',
  'ab\nac',
  'a\na\na\na',
  'b'
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let numYes = input.reduce((numYesInGroup, group) => {
  return numYesInGroup + new Set(group.replaceAll(/\n/g, '').split('')).size;
}, 0);

console.log(numYes);