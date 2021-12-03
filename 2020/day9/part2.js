/**
 * Solutions for Advent of Code 2020, Day 9, Part 2.
 * Original problem: https://adventofcode.com/2020/day/9
 */


let testInput = [
  '35',
  '20',
  '15',
  '25',
  '47',
  '40',
  '62',
  '55',
  '65',
  '95',
  '102',
  '117',
  '150',
  '182',
  '127',
  '219',
  '299',
  '277',
  '309',
  '576',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map((val) => parseInt(val, 10));

const PREAMBLE_LENGTH = input == testInput ? 5 : 25;

function checkValid(index) {
  let preambleStart = index - PREAMBLE_LENGTH;
  let currentPreamble = new Set(input.slice(preambleStart, preambleStart + PREAMBLE_LENGTH));
  let value = input[index];
  
  for (let i = preambleStart; i < preambleStart + PREAMBLE_LENGTH; i++) {
    if (currentPreamble.has(value - input[i])) {
      return true;
    }
  }

  return false;
}

let firstBadNumber = input.find(
    (value, index) => index >= PREAMBLE_LENGTH && !checkValid(index));


function findEncryptionWeakness(firstBadNumber) {
  let sumIndexStart = 0;
  let sumIndexEnd = 0;
  let contiguousSum = input[0];

  for (let i = 1; i < input.length; i++) {
    sumIndexEnd = i;
    contiguousSum += input[sumIndexEnd];

    while (contiguousSum >= firstBadNumber && sumIndexEnd > sumIndexStart + 1) {
      // console.log('start: ' + sumIndexStart + ' end: ' + sumIndexEnd +' sum: ' + contiguousSum);
      if (contiguousSum == firstBadNumber) {
        let slice = input.slice(sumIndexStart, sumIndexEnd + 1);
        return Math.max(...slice) + Math.min(...slice);
      }
      contiguousSum -= input[sumIndexStart];
      sumIndexStart++;
    }
  }
}

console.log(findEncryptionWeakness(firstBadNumber));
