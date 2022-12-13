/**
 * Solutions for Advent of Code 2022, Day 13, Part 2.
 * Original problem: https://adventofcode.com/2022/day/13
 */


let testInput = [
  '[1,1,3,1,1]\n' +
  '[1,1,5,1,1]',
  '[[1],[2,3,4]]\n' +
  '[[1],4]',
  '[9]\n' +
  '[[8,7,6]]',
  '[[4,4],4,4]\n' +
  '[[4,4],4,4,4]',
  '[7,7,7,7]\n' +
  '[7,7,7]',
  '[]\n' +
  '[3]',
  '[[[]]]\n' +
  '[[]]',
  '[1,[2,[3,[4,[5,6,7]]]],8,9]\n' +
  '[1,[2,[3,[4,[5,6,0]]]],8,9]'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n\n'});


let packets = input.join('\n').split('\n').map(str => JSON.parse(str)).concat([[[2]], [[6]]]);

function isPairInOrder(left, right) {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) return true;
    if (left > right) return false;
    return null;
  }

  // If not both nubmers, coerce both inputs to be arrays if necessary. 
  if (!Array.isArray(left)) {
    left = [left];
  } else if (!Array.isArray(right)) {
    right = [right];
  }

  for (let i = 0; i < Math.min(left.length, right.length); i++) {
    let subResult = isPairInOrder(left[i], right[i]);
    
    if (subResult !== null) {
      return subResult
    }
  }

  // All results matched until one list ran out of items.
  if (left.length < right.length) return true;
  if (left.length > right.length) return false;
  return null;
}

packets.sort((left, right) => {
  let inOrder = isPairInOrder(left, right);
  return inOrder ? -1 : 1
});

let packetStrings = packets.map(packet => JSON.stringify(packet));

let answer =  (1 + packetStrings.indexOf('[[2]]')) * (1 + packetStrings.indexOf('[[6]]'));

console.dir({
  // packets,
  answer
}, {depth: null});


