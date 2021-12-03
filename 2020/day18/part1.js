/**
 * Solutions for Advent of Code 2020, Day 18, Part 1.
 * Original problem: https://adventofcode.com/2020/day/18
 */

let testInput = [
  '1 + 2 * 3 + 4 * 5 + 6',
  '1 + (2 * 3) + (4 * (5 + 6))',
  '2 * 3 + (4 * 5)',
  '5 + (8 * 3 + 9 + 3 * 4 * 3)',
  '5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))',
  '((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2'
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

function stackifyLine(line) {
  let currentArray = [];
  let inputStack = [];

  for (let character of line) {
    if (character === '(') {
      inputStack.push(currentArray);
      currentArray = [];
    } else if (character === ')') {
      inputStack[inputStack.length - 1].push(currentArray);
      currentArray = inputStack.pop();
    } else {
      currentArray.push(character);
    }
  }

  return currentArray;
}

expressions = input.map(line =>
    stackifyLine(
        line.replaceAll(' ', '').
          split('').
          map(val => (val == '*' || val == '+' || val == '(' || val == ')') ?
              val : parseInt(val, 10))));

function doMath(expression) {
  // console.log('doMath:', expression);
  let left = expression[0];

  if (Array.isArray(left)) {
    left = doMath(left);
  }

  for (let i = 1; i < expression.length - 1; i += 2) {
    let operation = expression[i];
    let right = expression[i + 1];

    if (Array.isArray(right)) {
      right = doMath(right);
    }

    // console.log(left, operation, right);

    if (operation === '*') {
      left = left * right;
    } else {
      left = left + right;
    }
  }

  return left;
}

let sum = 0;
for (expression of expressions) {
  // console.log(expression, doMath(expression));
  sum += doMath(expression);
}
console.log(sum);

