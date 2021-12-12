/**
 * Solutions for Advent of Code 2021, Day 9, Part 1.
 * Original problem: https://adventofcode.com/2021/day/9
 */


let testInput = [
  '2199943210',
  '3987894921',
  '9856789892',
  '8767896789',
  '9899965678'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(line => line.split('').map(n => parseInt(n, 10)));

function isLowPoint(value, vY, vX, matrix) {
  if ((vY > 0 && (matrix[vY - 1][vX] <= value)) ||
      (vX > 0 && (matrix[vY][vX - 1] <= value)) ||
      ((vY < matrix.length - 1) && (matrix[vY + 1][vX] <= value)) ||
      ((vX < matrix[0].length - 1) && (matrix[vY][vX + 1] <= value))) {
    return false;
  }

  return true;
}

let totalRisk = input.reduce((totalRisk, row, i, matrix) => {
  let rowRisk = row.reduce((rowRisk, cell, j) => {
    return rowRisk + (isLowPoint(cell, i, j, matrix) ? cell + 1 : 0);
  }, 0);

  return totalRisk + rowRisk;
}, 0);

console.log({
  // input,
  totalRisk
});
