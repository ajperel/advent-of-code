/**
 * Solutions for Advent of Code 2020, Day 14, Part 1.
 * Original problem: https://adventofcode.com/2020/day/14
 */


let testInput = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});


let INPUT_REGEX = /(?<op>mask|mem)(?:\[(?<to>\d+)\])? = (?<value>[0-9X]+)/;

input = input.map(item => {
  let match = INPUT_REGEX.exec(item);

  if (match.groups.op === 'mask') {
    return {
      op: match.groups.op,
      set1Mask: BigInt(parseInt(match.groups.value.replaceAll('X', '0'), 2)),
      set0Mask: BigInt(parseInt(match.groups.value.replaceAll('X', '1'), 2)),
      // value: match.groups.value,
      // set1MaskBin: parseInt(match.groups.value.replaceAll('X', '0'), 2).toString(2),
      // set0MaskBin: parseInt(match.groups.value.replaceAll('X', '1'), 2).toString(2)
    };
  } else {
    return {
      op: match.groups.op,
      to: match.groups.to,
      value: parseInt(match.groups.value, 10)
    };
  }
});

let currentMask;
let memory = {};
for (item of input) {
  if (item.op === 'mask') {
    currentMask = item;
  } else {
    memory[item.to] = (BigInt(item.value) | currentMask.set1Mask) & currentMask.set0Mask;
  }
}

// console.log(input);
// console.log(memory);
console.log(Object.values(memory).reduce((sum, val) => sum + val));
