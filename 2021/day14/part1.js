/**
 * Solutions for Advent of Code 2021, Day 14, Part 1.
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

let state = template.split('');

for (let i = 0; i < 10; i++) {
  let nextState = [state[0]];

  for (let j = 1; j < state.length; j++) {
    let pair = state[j - 1] + state[j];
    let inserted = rules.get(pair) || '';
    nextState.push(inserted);
    nextState.push(state[j]);
  }

  state = nextState;
}

let charCounts = state.reduce((counts, char) => {
    counts.set(char, (counts.get(char) || 0) + 1);
    return counts;
}, new Map());

let values = Array.from(charCounts.values());
let min = Math.min(...values);
let max = Math.max(...values);

console.log({
  template,
  rules,
  state: state.join(''),
  charCounts,
  values,
  max,
  min,
  answer: max - min
});
