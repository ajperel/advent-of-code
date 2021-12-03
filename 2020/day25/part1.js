/**
 * Solutions for Advent of Code 2020, Day 25, Part 1.
 * Original problem: https://adventofcode.com/2020/day/25
 */


let testInput = [
  '5764801',
  '17807724'
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

const CARD_PUBLIC_KEY = parseInt(input[0], 10);
const DOOR_PUBLIC_KEY = parseInt(input[1], 10);
const PUBLIC_KEY_SUBJECT_NUMBER = 7;

function transform(subjectNumber, loopSize) {
  value = 1;

  for (let i = 0; i < loopSize; i++) {
    value *= subjectNumber;
    value %= 20201227;
  }

  return value;
}

function findLoopNumber(publicKey) {
  let loopNumber = 0;
  let value = 1;

  while (value != publicKey) {
    loopNumber += 1;
    value *= PUBLIC_KEY_SUBJECT_NUMBER;
    value %= 20201227;
  }

  return loopNumber;
}

const CARD_LOOP_NUMBER = findLoopNumber(CARD_PUBLIC_KEY);
const DOOR_LOOP_NUMBER = findLoopNumber(DOOR_PUBLIC_KEY);

console.log(transform(CARD_PUBLIC_KEY, DOOR_LOOP_NUMBER));
console.log(transform(DOOR_PUBLIC_KEY, CARD_LOOP_NUMBER));


