/**
 * Solutions for Advent of Code 2020, Day 14, Part 2.
 * Original problem: https://adventofcode.com/2020/day/14
 */


let testInput = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});


let INPUT_REGEX = /(?<op>mask|mem)(?:\[(?<to>\d+)\])? = (?<value>[0-9X]+)/;

input = input.map(item => {
  let match = INPUT_REGEX.exec(item);

  if (match.groups.op === 'mask') {
    let maskXIndicies = match.groups.value.split('').
          map((val, index) => val === 'X' ? index : -1).
          filter(val => val > -1);
    let xFlipMasks = maskXIndicies.map(value => BigInt(1) << BigInt(35 - value));

    return {
      op: match.groups.op,
      mask: match.groups.value,
      set1Mask: BigInt(parseInt(match.groups.value.replaceAll('X', '0'), 2)),
      // maskXIndicies,
      xFlipMasks,
      // value: match.groups.value,
      // set1MaskBin: parseInt(match.groups.value.replaceAll('X', '0'), 2).toString(2),
      // maskSet0Bin: parseInt(match.groups.value.replaceAll('X', '1'), 2).toString(2)
    };
  } else {
    return {
      op: match.groups.op,
      address: BigInt(parseInt(match.groups.to)),
      value: parseInt(match.groups.value, 10)
    };
  }
});

function* subsets(array, offset = 0) {
  while (offset < array.length) {
    let first = array[offset++];
    for (let subset of subsets(array, offset)) {
      subset.push(first);
      yield subset;
    }
  }
  yield [];
}

let currentMask;
let memory = {};
for (item of input) {
  if (item.op === 'mask') {
    currentMask = item;
  } else {
    // Set 1s from mask.
    let startAddress = (item.address | currentMask.set1Mask);
    let toAddress;

    // Write every possible combination of X values.
    for (let maskList of subsets(currentMask.xFlipMasks)) {
      toAddress = startAddress ^ maskList.reduce((finalMask, piece) => finalMask + piece, BigInt(0));
      memory[toAddress] = item.value;
    }
  }
}

// console.log(input);
// console.log(memory);
console.log(Object.values(memory).reduce((sum, val) => sum + val));
