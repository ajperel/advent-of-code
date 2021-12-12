/**
 * Solutions for Advent of Code 2021, Day 10, Part 1.
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
const CHAR_TO_SCORE_MAP = new Map([[')', 3], [']', 57], ['}', 1197], ['>', 25137]]);

let syntaxCheckerScore = input.reduce((checkerScore, line) => {
  let stack = [];

  for (let char of line) {
    if (OPENING_CHAR_SET.has(char)) {
      stack.push(char);
    } else {
      pairedChar = stack.pop();

      if (OPEN_TO_CLOSE_MAP.get(pairedChar) != char) {
        return checkerScore + CHAR_TO_SCORE_MAP.get(char);
      }
    }
  }

  return checkerScore;
}, 0);

console.log({
  // input,
  // OPENING_CHAR_SET,
  // OPEN_TO_CLOSE_MAP,
  // CHAR_TO_SCORE_MAP,
  syntaxCheckerScore
});
