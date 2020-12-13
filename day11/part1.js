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
 * Given a position matrix[rowIndex][columnIndex] compute what should occupy that position in the
 * next generation of the matrix.
 */
function computeNextPosition(rowIndex, columnIndex, matrix) {
  numAdjacent = 0;
  numOccupiedAdjacent = 0;

  for (i = Math.max(rowIndex - 1, 0); i < Math.min(rowIndex + 2, matrix.length); i++) {
    for (j = Math.max(columnIndex - 1, 0); j < Math.min(columnIndex + 2, matrix[0].length); j++) {
      if (i == rowIndex && j == columnIndex) {
        continue;
      }

      numAdjacent++;
      if (matrix[i][j] == '#') {
        numOccupiedAdjacent++
      }

    }
  }

  // console.log('rI: ', rowIndex, ' cI: ', columnIndex,
  //     ' numAdjacent: ', numAdjacent, ' numOccupiedAdjacent:', numOccupiedAdjacent);

  let nextPosition = matrix[rowIndex][columnIndex];
  if (nextPosition == '#' && numOccupiedAdjacent > 3) {
    nextPosition = 'L'
  } else if (nextPosition == 'L' && numOccupiedAdjacent == 0) {
    nextPosition = '#'
  }

  return nextPosition;
}

/**
 * Returns the next generation of the matrix calcluated from the current one.
 */
function computeNextGeneration(currentGeneration) {
  return currentGeneration.map(
      (row, rowIndex) => row.map((column, columnIndex) => computeNextPosition(rowIndex, columnIndex, currentGeneration)));
}

function areGenerationsEqual(a, b) {
  return a.every(
      (row, rowIndex) => row.every(
          (column, columnIndex) => b[rowIndex][columnIndex] === a[rowIndex][columnIndex]));
}

let currentGeneration = input.map(row => row.split(''));
let nextGeneration = computeNextGeneration(currentGeneration);

/**
 * Returns true iff two generations are equal, meaning every position in them is the same.
 */
while (!areGenerationsEqual(currentGeneration, nextGeneration)) {
  currentGeneration = nextGeneration;
  nextGeneration = computeNextGeneration(currentGeneration);
}

let numOccupiedSeats = currentGeneration.reduce(
  (countRows, row) => countRows + row.reduce(
      (countColumns, position) => countColumns + (position == '#' ? 1 : 0), 0),
  0);

console.log(numOccupiedSeats);
