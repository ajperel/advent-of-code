/**
 * Solutions for Advent of Code 2020, Day 11, Part 1.
 * Original problem: https://adventofcode.com/2020/day/11
 */


let testInput = [
  'L.LL.LL.LL',
  'LLLLLLL.LL',
  'L.L.L..L..',
  'LLLL.LL.LL',
  'L.LL.LL.LL',
  'L.LLLLL.LL',
  '..L.L.....',
  'LLLLLLLLLL',
  'L.LLLLLL.L',
  'L.LLLLL.LL',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

/**
 * Returns 0 if there is a seat occupied in sight from the position matrix[rowIndex][columnIndex]
 * in the direction computed by the slope of rowIncrementFunction(1)/columnIncrementFunction(1).
 *
 * Only the first seat in any direction, occupied or not, is visible.
 */
function occupiedInSight(matrix, rowIndex, columnIndex, rowIncrementFunction, columnIncrementFunction) {
  for (let i = rowIncrementFunction(rowIndex), j = columnIncrementFunction(columnIndex);
       i >= 0 && i < input.length && j >= 0 && j < input[0].length;
       i = rowIncrementFunction(i), j = columnIncrementFunction(j)) {

    if (matrix[i][j] === '#') {
      return 1;
    } else if (matrix[i][j] === 'L') {
      return 0;
    }
  }

  return 0;
}

/**
 * Given a position matrix[rowIndex][columnIndex] compute what should occupy that position in the
 * next generation of the matrix.
 */
function computeNextPosition(rowIndex, columnIndex, matrix) {
  let identity = x => x;
  let increment = x => x + 1;
  let decrement = x => x - 1;

  let numOccupiedInSight =
    // North
    occupiedInSight(matrix, rowIndex, columnIndex, decrement, identity) +
    // North East
    occupiedInSight(matrix, rowIndex, columnIndex, decrement, increment) +
    // East
    occupiedInSight(matrix, rowIndex, columnIndex, identity, increment) +
    // South East
    occupiedInSight(matrix, rowIndex, columnIndex, increment, increment) +
    // South
    occupiedInSight(matrix, rowIndex, columnIndex, increment, identity) +
    // South West
    occupiedInSight(matrix, rowIndex, columnIndex, increment, decrement) +
    // West
    occupiedInSight(matrix, rowIndex, columnIndex, identity, decrement) +
    // North West
    occupiedInSight(matrix, rowIndex, columnIndex, decrement, decrement);

  // console.log('rI: ', rowIndex, ' cI: ', columnIndex,
  //     ' numOccupiedInSight:', numOccupiedInSight);

  let nextPosition = matrix[rowIndex][columnIndex];
  if (nextPosition === '#' && numOccupiedInSight > 4) {
    nextPosition = 'L'
  } else if (nextPosition === 'L' && numOccupiedInSight === 0) {
    nextPosition = '#'
  }

  return nextPosition;
}

/**
 * Returns the next generation of the matrix calcluated from the current one.
 */
function computeNextGeneration(currentGeneration) {
  // console.log('computingNextGeneration');
  return currentGeneration.map(
      (row, rowIndex) => row.map((column, columnIndex) => computeNextPosition(rowIndex, columnIndex, currentGeneration)));
}

/**
 * Returns true iff two generations are equal, meaning every position in them is the same.
 */
function areGenerationsEqual(a, b) {
  return a.every(
      (row, rowIndex) => row.every(
          (column, columnIndex) => b[rowIndex][columnIndex] === a[rowIndex][columnIndex]));
}

let currentGeneration = input.map(row => row.split(''));
let nextGeneration = computeNextGeneration(currentGeneration);

while (!areGenerationsEqual(currentGeneration, nextGeneration)) {
  currentGeneration = nextGeneration;
  nextGeneration = computeNextGeneration(currentGeneration);
}

let numOccupiedSeats = currentGeneration.reduce(
  (countRows, row) => countRows + row.reduce(
      (countColumns, position) => countColumns + (position === '#' ? 1 : 0), 0),
  0);

console.log(numOccupiedSeats);
