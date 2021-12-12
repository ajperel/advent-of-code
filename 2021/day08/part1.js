/**
 * Solutions for Advent of Code 2021, Day 8, Part 1.
 * Original problem: https://adventofcode.com/2021/day/8
 */


let testInput = [
  'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
  'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
  'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
  'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
  'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
  'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
  'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
  'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
  'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
  'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(line => {
  parts = line.split(' | ');
  return {
    signalPatterns: parts[0].split(' '),
    outputValue: parts[1].split(' ')
  }
});

// let digitToNumSegments = {
//   0: 6,
//   1: 2,
//   2: 5,
//   3: 5,
//   4: 4,
//   5: 5,
//   6: 6,
//   7: 3,
//   8: 7,
//   9: 6,
// };

let numSegmentsToDigits = {
  2: [1],
  3: [7],
  4: [4],
  5: [2, 3, 5],
  6: [0, 6, 9],
  7: [8]
}

let answer = input.reduce((num1478, entry) => {
  return num1478 + entry.outputValue.filter(str => numSegmentsToDigits[str.length].length == 1).length;
}, 0);

console.log({
  input,
  answer
});
