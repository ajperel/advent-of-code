/**
 * Solutions for Advent of Code 2020, Day 8, Part 1.
 * Original problem: https://adventofcode.com/2020/day/8
 */


 let testInput = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let accumulator = 0;
let instructionSeen = new Array(input.length);
let i = 0;

let INPUT_REGEX = /(acc|jmp|nop) ([+-]\d+)/;

while (i < input.length) {
  if (instructionSeen[i]) {
    break;
  }

  instructionSeen[i] = true;  

  let [,instruction, argument] = INPUT_REGEX.exec(input[i]);
  argument = parseInt(argument, 10);

  // console.log('i: ' + i);
  // console.log(input[i]);
  // console.log(instruction + ' ' + argument);

  if (instruction === 'acc') {
    accumulator += argument
    i += 1;
  } else if (instruction === 'jmp') {
    i += argument;
  } else if (instruction === 'nop') {
    i += 1;
  }
}

console.log(accumulator);