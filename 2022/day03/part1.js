/**
 * Solutions for Advent of Code 2022, Day 3, Part 1.
 * Original problem: https://adventofcode.com/2022/day/3
 */


let testInput = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let pairs = input.map(line => {
  let half = line.length / 2;
  return [line.slice(0, half).split(''), line.slice(half).split('')];
});

let intersections = pairs.map(([p1, p2]) => {
  let set = new Set(p1);
  let intersections = p2.filter(x => set.has(x));
  return intersections[0];
});

let prioritySum = intersections.reduce((sum, char) => {
  let n = char.charCodeAt(0);

  if (n <= 90) {
    // ASCII codes 65-90 => 27-52
    sum += n - 38;
  } else {
    // ASCII codes 97-122 => 1-26
    sum += n - 96;
  }

  return sum;
}, 0);

console.dir({
  // pairs,
  // intersections,
  prioritySum
});