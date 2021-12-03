/**
 * Solutions for Advent of Code 2020, Day 2, Part 1.
 * Original problem: https://adventofcode.com/2020/day/2
 */


let testInput = [
  '1-3 a: abcde',
  '1-3 b: cdefg',
  '2-9 c: ccccccccc'
];

// let input = testInput;
let input = require('../lib/get-input').getInput();


let inputMatcher = /(\d+)-(\d+)\s+([a-z]):\s+([a-z]+)/
let numValid = 0;

for (line of input) {
  let [_, minCount, maxCount, policyCharacter, password] = inputMatcher.exec(line);

  let characterCount = (password.match(new RegExp(policyCharacter, 'g')) || []).length;
    
    if (characterCount >= minCount && characterCount <= maxCount) {
      numValid++;
    }
}

console.log(numValid);
