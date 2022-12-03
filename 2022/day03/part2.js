/**
 * Solutions for Advent of Code 2022, Day 3, Part 2.
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

let data = input.map(x => [x.split(''), new Set(x.split(''))]);

let badges = [];
for (let i = 0; i < data.length; i += 3) {
  let [chars1, set1] = data[i];
  let [chars2, set2] = data[i + 1];
  let [chars3, set3] = data[i + 2];

  let intersection = new Set(chars2.filter(x => set1.has(x)));
  intersection = new Set(chars3.filter(x => intersection.has(x)));

  badges.push([...intersection][0]);
} 

let prioritySum = badges.reduce((sum, char) => {
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
  prioritySum
});