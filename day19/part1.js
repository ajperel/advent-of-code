/**
 * Solutions for Advent of Code 2020, Day 19, Part 1.
 * Original problem: https://adventofcode.com/2020/day/19
 */

let testInput = [
  '0: 4 1 5\n1: 2 3 | 3 2\n2: 4 4 | 5 5\n3: 4 5 | 5 4\n4: "a"\n5: "b"',
  'ababbb\nbababa\nabbbab\naaabbb\naaaabbb',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let rules = input[0].split('\n');
let messages = input[1].split('\n');

let RULE_REGEX = /(?<rn>\d+): (?:"(?<char>[a-z])"|(?<nested>[\d\s|]+))/;

let ruleMap = new Map();
rules.reduce((map, rule) => {
  let match = RULE_REGEX.exec(rule);
  map.set(match.groups.rn, match.groups.char || match.groups.nested.split(' '));
  return map;
}, ruleMap);

function getRuleRegexString(ruleNumber) {
  let rule = ruleMap.get(ruleNumber);

  // console.log(ruleNumber + ':', ruleNumber, rule);

  let regexString = '';

  if (!Array.isArray(rule)) {
    regexString = rule;
  } else {
    regexString = rule.reduce((str, part) => {
      if (part === '|') {
        return str + part;
      } else {
        return str + getRuleRegexString(part);
      }
    }, regexString);
    regexString = '(' + regexString + ')'
  }

  // console.log(ruleNumber + ':', ruleNumber, regexString);
  ruleMap.set(ruleNumber, regexString);
  return regexString;
}

let rule0Regex = new RegExp('^' + getRuleRegexString('0') + '$');

// console.log(ruleMap);
console.log(rule0Regex);

let numMatchedMessages = messages.reduce(
    (sum, message) => rule0Regex.test(message) ? sum + 1 : sum,
    0);

console.log(numMatchedMessages);
