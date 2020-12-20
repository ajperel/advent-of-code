/**
 * Solutions for Advent of Code 2020, Day 17, Part 1.
 * Original problem: https://adventofcode.com/2020/day/17
 */

let testInput = [
  '.#.',
  '..#',
  '###',
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let startingSlice = input.map(row => row.split('').map(value => value === '.' ? 0 : 1));

let pocketDimension = [startingSlice];

function createEmptyDimensionalSlice(ySize, xSize) {
  let dimension = new Array(ySize);
  for (let i = 0; i < ySize; i++) {
    dimension[i] = new Array(xSize).fill(0);
  }

  return dimension;
}

function growDimension(pocketDimension) {
  let zSize = pocketDimension.length;
  let ySize = pocketDimension[0].length;
  let xSize = pocketDimension[0][0].length;

  // Expand the x & y bounds of each z-slice
  for (let i = 0; i < zSize; i++) {
    for (let j = 0; j < ySize; j++) {
      pocketDimension[i][j].unshift(0);
      pocketDimension[i][j].push(0);
    }

    pocketDimension[i].push(new Array(xSize + 2).fill(0));
    pocketDimension[i].unshift(new Array(xSize + 2).fill(0));
  }
  xSize += 2;
  ySize += 2;

  pocketDimension.unshift(createEmptyDimensionalSlice(ySize, xSize));
  pocketDimension.push(createEmptyDimensionalSlice(ySize, xSize));

  return pocketDimension;
}

function countActiveNeighbors(z, y, x, pocketDimension) {
  let zSize = pocketDimension.length;
  let ySize = pocketDimension[0].length;
  let xSize = pocketDimension[0][0].length;

  // console.log(zSize, ySize, xSize);

  let numActiveNeighbors = 0;
  for (let i = Math.max(z - 1, 0); i < Math.min(z + 2, zSize); i++) {
    for (let j = Math.max(y - 1, 0); j < Math.min(y + 2, ySize); j++) {
      for (let k = Math.max(x - 1, 0); k < Math.min(x + 2, xSize); k++) {
        if (i == z && j == y & k == x) continue;
        numActiveNeighbors += pocketDimension[i][j][k];
      }
    }
  }

  // console.log('an', z, y, x, numActiveNeighbors);
  return numActiveNeighbors;
}

function runBootCycle(pocketDimension) {
  let borderCellActive = false;

  // console.log('og', pocketDimension);
  pocketDimension = pocketDimension.map((plane, z) => plane.map((row, y) => row.map((column, x) => {
    let nextState = pocketDimension[z][y][x];
    // console.log('cur:', nextState);
    let numActiveNeighbors = countActiveNeighbors(z, y, x, pocketDimension);

    if (nextState == 0 && numActiveNeighbors == 3) {
      nextState = 1;
    } else if (nextState == 1 && !(numActiveNeighbors === 2 || numActiveNeighbors == 3)) {
      nextState = 0;
    }

    if (nextState == 1 && (
        z == 0 || z == pocketDimension.length - 1 ||
        y == 0 || y == pocketDimension[0].length - 1  ||
        x == 0 || x == pocketDimension[0][0].length - 1)) {
      borderCellActive = true;
    }

    // console.log('ns', z, y, x, nextState);
    return nextState;
  })));

  // console.log('rb', pocketDimension);
  // Pre-emptively expand the pocket dimension so no border cells are active, i.e., everything
  // has room to expand within known space during the next boot cycle.
  if (borderCellActive) pocketDimension = growDimension(pocketDimension);

  return pocketDimension;
}

pocketDimension = growDimension(pocketDimension);
for (let i = 0; i < 6; i++) {
  pocketDimension = runBootCycle(pocketDimension);
}

let numActiveCells = 0;
pocketDimension = pocketDimension.forEach((plane, z) => plane.forEach((row, y) => row.forEach((column, x) => {
  numActiveCells += pocketDimension[z][y][x];
})));


// 304 is too low. (But right for someone else?).
console.log(numActiveCells);

