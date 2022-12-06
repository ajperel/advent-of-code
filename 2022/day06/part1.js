/**
 * Solutions for Advent of Code 2022, Day 6, Part 1.
 * Original problem: https://adventofcode.com/2022/day/6
 */


let testInputs = [
  ['mjqjpqmgbljsphdztnvjfqwrcgsmlb'],
  ['bvwbjplbgvbhsrlpgdmjqwftvncz'],
  ['nppdvjthqldpwncqszvftbrmjlhg'],
  ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg'],
  ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw']
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

const datastream = input[0];

for (let i = 4; i <= datastream.length; i++) {
  let s = new Set(datastream.substring(i - 4, i));
  if (s.size == 4) {
    console.dir({answer: i});
    break;
  }
}