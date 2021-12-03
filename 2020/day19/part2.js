/**
 * Solutions for Advent of Code 2020, Day 19, Part 2.
 * Original problem: https://adventofcode.com/2020/day/19
 */


let testInput = [
  // '0: 4 1 5\n1: 2 3 | 3 2\n2: 4 4 | 5 5\n3: 4 5 | 5 4\n4: "a"\n5: "b"',
  // 'ababbb\nbababa\nabbbab\naaabbb\naaaabbb',

  '42: 9 14 | 10 1\n9: 14 27 | 1 26\n10: 23 14 | 28 1\n1: "a"\n11: 42 31\n5: 1 14 | 15 1\n19: 14 1 | 14 14\n12: 24 14 | 19 1\n16: 15 1 | 14 14\n31: 14 17 | 1 13\n6: 14 14 | 1 14\n2: 1 24 | 14 4\n0: 8 11\n13: 14 3 | 1 12\n15: 1 | 14\n17: 14 2 | 1 7\n23: 25 1 | 22 14\n28: 16 1\n4: 1 1\n20: 14 14 | 1 15\n3: 5 14 | 16 1\n27: 1 6 | 14 18\n14: "b"\n21: 14 1 | 1 14\n25: 1 1 | 1 14\n22: 14 14\n8: 42\n26: 14 22 | 1 20\n18: 15 15\n7: 14 5 | 1 21\n24: 14 1',
  'abbbbbabbbaaaababbaabbbbabababbbabbbbbbabaaaa\nbbabbbbaabaabba\nbabbbbaabbbbbabbbbbbaabaaabaaa\naaabbbbbbaaaabaababaabababbabaaabbababababaaa\nbbbbbbbaaaabbbbaaabbabaaa\nbbbababbbbaaaaaaaabbababaaababaabab\nababaaaaaabaaab\nababaaaaabbbaba\nbaabbaaaabbaaaababbaababb\nabbbbabbbbaaaababbbbbbaaaababb\naaaaabbaabaaaaababaa\naaaabbaaaabbaaa\naaaabbaabbaaaaaaabbbabbbaaabbaabaaa\nbabaaabbbaaabaababbaabababaaab\naabbbbbaabbbaaaaaabbbbbababaaaaabbaaabba',
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

// New input = 8: 42 | 42 8
// This is effectively 42+
ruleMap.set('8', ['(', '(', '42', ')', '+', ')']);


// New intput = 11: 42 31 | 42 11 31
// This is close to 42+31+ but requires the same number of 42 & 31.
// Given that the group preceeding is also 42+ the real effect is that we must have more 42s than
// 31s.
// We capture both the base group & the full length of repeats so we can calculate how many times i
// repeats.
ruleMap.set('11', ['(', '(', '31', ')', '+', ')']);

function getRuleRegexString(ruleNumber) {
  let rule = ruleMap.get(ruleNumber);

  // console.log(ruleNumber + ':', ruleNumber, rule);

  let regexString = '';

  if (!Array.isArray(rule)) {
    regexString = rule;
  } else {
    regexString = rule.reduce((str, part) => {
      if (part === '|' || part === '+' || part === '(' || part === ')') {
        return str + part;
      } else {
        return str + getRuleRegexString(part);
      }
    }, regexString);
    regexString = '(?:' + regexString + ')'
  }

  if (regexString.includes('def')) {
    console.log(ruleNumber, rule, regexString);
    throw Error('e');
  }

  // console.log(ruleNumber + ':', ruleNumber, regexString);
  ruleMap.set(ruleNumber, regexString);
  return regexString;
}

let rule0Regex = new RegExp('^' + getRuleRegexString('0') + '$');

// console.log(ruleMap);
// console.log(rule0Regex);

let numMatchedMessages = messages.reduce(
    (sum, message) => {
      match = rule0Regex.exec(message);

      let result = sum;

      if (match) {
        // If there are more instances of 42+ than 31+
        if ((match[1].length / match[2].length) > (match[3].length / match[4].length)) {
          result = sum + 1;
        }
      }

      return result;

    },
    0);

console.log(numMatchedMessages);
