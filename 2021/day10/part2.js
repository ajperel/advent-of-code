/**
 * Solutions for Advent of Code 2021, Day 10, Part 2.
 * Original problem: https://adventofcode.com/2021/day/10
 */


let testInput = [
  '[({(<(())[]>[[{[]{<()<>>',
  '[(()[<>])]({[<{<<[]>>(',
  '{([(<{}[<>[]}>{[]{[(<()>',
  '(((({<>}<{<{<>}{[]{[]{}',
  '[[<[([]))<([[{}[[()]]]',
  '[{[{({}]{}}([{[{{{}}([]',
  '{<[[]]>}<{[{[{[]{()[[[]',
  '[<(<(<(<{}))><([]([]()',
  '<{([([[(<>()){}]>(<<{{',
  '<{([{{}}[<[[[<>{}]]]>[]]'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});


const OPENING_CHAR_SET = new Set(['(', '[', '{', '<']);
const OPEN_TO_CLOSE_MAP = new Map([['(', ')'], ['[', ']'], ['{', '}'], ['<', '>']]);
const CHAR_TO_SCORE_MAP = new Map([[')', 1], [']', 2], ['}', 3], ['>', 4]]);

// Map input to autocomplete scores, corrupt lines have a score of -1 and shouldn't be counted.
let autocompleteScores = input.map(line => {
  let stack = [];

  // Build our stack to the end of the line to complete it, or exit early with a score of -1 for the
  // line for corrupt lines.
  for (let char of line) {
    if (OPENING_CHAR_SET.has(char)) {
      stack.push(char);
    } else {
      pairedChar = stack.pop();

      if (OPEN_TO_CLOSE_MAP.get(pairedChar) != char) {
        return -1;
      }
    }
  }

  let lineScore = 0;

  while (stack.length > 0) {
    let openChar = stack.pop();

    lineScore = lineScore * 5 + CHAR_TO_SCORE_MAP.get(OPEN_TO_CLOSE_MAP.get(openChar));
  }

  return lineScore;
});

// Filter out corrupted lines.
autocompleteScores = autocompleteScores.filter(n => n > -1).sort((a, b) => a - b);

let answer = autocompleteScores[(autocompleteScores.length - 1) / 2];

console.log({
  // input,
  // OPENING_CHAR_SET,
  // OPEN_TO_CLOSE_MAP,
  // CHAR_TO_SCORE_MAP,
  autocompleteScores,
  answer
});
