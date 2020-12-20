/**
 * Solutions for Advent of Code 2020, Day 18, Part 2.
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
  // Resolve all nested expressions so you have only multiplication and addition with real numbers.
  expression = expression.map(item => Array.isArray(item) ? doMath(item) : item);

  // Resolve additions first
  for (let i = 1; i < expression.length - 1; i += 2) {
    if (expression[i] == '+') {
      expression.splice(i - 1, 3, expression[i - 1] + expression[i + 1]);
      i = i - 2;
    }
  }

  // The entire expression was additions.
  if (expression.length === 1) {
    return expression[0];
  }

  // Do the remaining multiplications.
  return expression.reduce((product, entry) => entry === '*' ? product : product * entry, 1);
}

let sum = 0;
for (expression of expressions) {
  // console.log(expression, doMath(expression));
  sum += doMath(expression);
}
console.log(sum);

