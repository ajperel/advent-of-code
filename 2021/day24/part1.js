/**
 * Solutions for Advent of Code 2021, Day 24, Part 1.
 * Original problem: https://adventofcode.com/2021/day/24
 *
 * Pair programmed with jdoozer.
 */


let testInputs = [
  [
    'inp w',
    'mul x 0',
    'add x z',
    'mod x 26',
    'div z 1',
    'add x 12',
    'eql x w',
    'eql x 0',
    'mul y 0',
    'add y 25',
    'mul y x',
    'add y 1',
    'mul z y',
    'mul y 0',
    'add y w',
    'add y 1',
    'mul y x',
    'add z y',
    'inp w',
    'mul x 0',
    'add x z',
    'mod x 26',
    'div z 26',
    'add x -8',
    'eql x w',
    'eql x 0',
    'mul y 0',
    'add y 25',
    'mul y x',
    'add y 1',
    'mul z y',
    'mul y 0',
    'add y w',
    'add y 5',
    'mul y x',
    'add z y',
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let ops = input.map((line, i) => {
  parts = line.split(' ');

  return {
    run: Math.floor(i/18),
    op: parts[0],
    left: parts[1],
    right: isNaN(parts[2]) ? parts[2] : parseInt(parts[2])
  }
});

const DIV_INDEX = 4;
const SUB_INDEX = 5;
const ADD_INDEX = 15;

let stack = [];
let digits = new Array(14);

for (i = 0; i < ops.length; i+= 18) {
    if (ops[i + DIV_INDEX].right === 1) {
      stack.push(ops[i + ADD_INDEX]);
    } else {
      let op1 = stack.pop();
      let op2 = ops[i + SUB_INDEX];

      let diff = op1.right + op2.right;
      if (diff >= 0) {
        digits[op1.run] = 9 - diff;
        digits[op2.run] = 9;
      } else {
        digits[op1.run] = 9;
        digits[op2.run] = 9 + diff;
      }
    }
}

console.dir({
  // ops,
  modelNumber: digits.join('')
})