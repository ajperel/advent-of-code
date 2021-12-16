/**
 * Solutions for Advent of Code 2021, Day 14, Part 2.
 * Original problem: https://adventofcode.com/2021/day/14
 */


let testInputs = [
  [
    'NNCB',
    '',
    'CH -> B',
    'HH -> N',
    'CB -> H',
    'NH -> C',
    'HB -> C',
    'HC -> B',
    'HN -> C',
    'NN -> C',
    'BH -> H',
    'NC -> B',
    'NB -> B',
    'BN -> B',
    'BB -> N',
    'BC -> B',
    'CC -> N',
    'CN -> C',
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let template = input[0];
let rules = input.slice(2).reduce((map, line) => {
  parts = line.split(' -> ');
  map.set(parts[0], parts[1]);
  return map;
}, new Map());

let initialState = template.split('');

let firstChar = initialState[0];
let lastChar = initialState[initialState.length - 1];

let pairCounts = new Map();
for (let i = 1; i < initialState.length; i++) {
  let pair = initialState[i - 1] + initialState[i];
  pairCounts.set(pair, (pairCounts.get(pair) || 0) + 1);
}

for (let i = 0; i < 40; i++) {
  let nextCounts = new Map();
  pairCounts.forEach((count, pair) => {
    let inserted = rules.get(pair);
    let parts = pair.split('');

    let np1 = parts[0] + inserted;
    let np2 = inserted + parts[1];

    nextCounts.set(np1, (nextCounts.get(np1) || 0) + count);
    nextCounts.set(np2, (nextCounts.get(np2) || 0) + count);
  });
  pairCounts = nextCounts;
}

// Count characters. Every character is double counted in the pair counts except for the first and
// last. So we'll double count them and divide everything in half.
let charCounts = new Map();
pairCounts.forEach((count, pair) => {
  let parts = pair.split('');
  charCounts.set(parts[0], (charCounts.get(parts[0]) || 0) + count);
  charCounts.set(parts[1], (charCounts.get(parts[1]) || 0) + count);
});
charCounts.set(firstChar, charCounts.get(firstChar) + 1);
charCounts.set(lastChar, charCounts.get(lastChar) + 1);

let values = Array.from(charCounts.values()).map(n => n/2);

let min = Math.min(...values);
let max = Math.max(...values);

console.log({
  template,
  rules,
  pairCounts,
  firstChar,
  lastChar,
  charCounts,
  values,
  max,
  min,
  answer: max - min
});
