/**
 * Solutions for Advent of Code 2021, Day 11, Part 1.
 * Original problem: https://adventofcode.com/2021/day/11
 */


let testInput = [
  '5483143223',
  '2745854711',
  '5264556173',
  '6141336146',
  '6357385478',
  '4167524645',
  '2176841721',
  '6882881134',
  '4846848554',
  '5283751526'
];

// testInput = [
//   '11111',
//   '19991',
//   '19191',
//   '19991',
//   '11111'
// ];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let grid = input.map(line => line.split('').map(n => parseInt(n, 10)));
const GRID_HEIGHT = grid.length;
const GRID_WIDTH = grid[0].length;

let raiseEnergyLevel = (grid) => {
  grid.forEach((row, i) => row.forEach((cell, j) => {
    grid[i][j] = cell + 1;
  }));

  return grid;
};

let incrementIfNotZero = (grid, i, j) => {
  if (grid[i][j] !== 0) grid[i][j] += 1;
  return grid;
}

let flash = (grid, i, j) => {
  grid[i][j] = 0;

  if (i > 0) {
    if (j > 0) incrementIfNotZero(grid, i - 1, j - 1);
    incrementIfNotZero(grid, i - 1, j);
    if (j < GRID_HEIGHT - 1) incrementIfNotZero(grid, i - 1, j + 1);
  }

    if (j > 0) incrementIfNotZero(grid, i, j - 1);
    if (j < GRID_HEIGHT - 1) incrementIfNotZero(grid, i, j + 1);

  if (i < GRID_WIDTH - 1) {
    if (j > 0) incrementIfNotZero(grid, i + 1, j - 1);
    incrementIfNotZero(grid, i + 1, j);
    if (j < GRID_HEIGHT - 1) incrementIfNotZero(grid, i + 1, j + 1);
  }
}

let processOctopusFlashes = (grid) => {
  let flashOccured;
  let numFlashes = 0;

  do {
    flashOccured = false;
    grid.forEach((row, i) => row.forEach((cell, j) => {
      if (cell > 9) {
        flash(grid, i, j);
        numFlashes += 1;
        flashOccured = true;
      }
    }));
  } while (flashOccured === true);

  return numFlashes;
}

let totalNumFlashes = 0;
for (let i = 0; i < 100; i++) {
  raiseEnergyLevel(grid);
  totalNumFlashes += processOctopusFlashes(grid);
}

console.log({
  grid: grid.map(row => JSON.stringify(row)),
  answer: totalNumFlashes
});
