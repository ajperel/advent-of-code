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

// TODO(ajp): just take array?
function createEmptyNDimensionalSpace(sizes) {
  let space = new Array(sizes[0]);

  if (sizes.length == 1) {
    space.fill(0);
  } else {
    for (let i = 0; i < sizes[0]; i++) {
      space[i] = createEmptyNDimensionalSpace(sizes.slice(1));
    }
  }

  return space;
}

function growDimension(pocketDimension, numDimensions) {
  // Figure out the size of each axis in the pocket dimension.
  let sizes = [];
  let nextAxis = pocketDimension;
  do {
    sizes.push(nextAxis.length);
    nextAxis = nextAxis[0];
  } while (nextAxis.length > 0);

  // Need to account for Sizes growing!!
  function growNDimensionalSpace(space, sizes) {
    if (sizes.length === 1) {
      space.unshift(0);
      space.push(0);
      return [sizes[0] + 2];
    } else {
      let innerSizes = sizes.slice(1);

      let updatedInnerSize;
      // Do inner space
      for (let i = 0; i < sizes[0]; i++) {
        updatedInnerSize = growNDimensionalSpace(space[i], innerSizes);
      }

      space.unshift(createEmptyNDimensionalSpace(updatedInnerSize));
      space.push(createEmptyNDimensionalSpace(updatedInnerSize));

      return [sizes[0] + 2, ...updatedInnerSize];
    }
  }

  growNDimensionalSpace(pocketDimension, sizes);

  return pocketDimension;
}

function countActiveNeighbors(pocketDimension, w, z, y, x, ) {
  let wSize = pocketDimension.length;
  let zSize = pocketDimension[0].length;
  let ySize = pocketDimension[0][0].length;
  let xSize = pocketDimension[0][0][0].length;

  // console.log(zSize, ySize, xSize);

  let numActiveNeighbors = 0;
  for (let l = Math.max(w - 1, 0); l < Math.min(w + 2, wSize); l++) {
    for (let i = Math.max(z - 1, 0); i < Math.min(z + 2, zSize); i++) {
      for (let j = Math.max(y - 1, 0); j < Math.min(y + 2, ySize); j++) {
        for (let k = Math.max(x - 1, 0); k < Math.min(x + 2, xSize); k++) {
          if (l == w && i == z && j == y & k == x) continue;
          numActiveNeighbors += pocketDimension[l][i][j][k];
        }
      }
    }
  }

  // console.log('an', z, y, x, numActiveNeighbors);
  return numActiveNeighbors;
}

function runBootCycle(pocketDimension) {
  let borderCellActive = false;

  // console.log('og', pocketDimension);
  pocketDimension = pocketDimension.map((cube, w) => cube.map((plane, z) => plane.map((row, y) => row.map((column, x) => {
    let nextState = pocketDimension[w][z][y][x];
    // console.log('cur:', nextState);
    let numActiveNeighbors = countActiveNeighbors(pocketDimension, w, z, y, x);

    if (nextState == 0 && numActiveNeighbors == 3) {
      nextState = 1;
    } else if (nextState == 1 && !(numActiveNeighbors === 2 || numActiveNeighbors == 3)) {
      nextState = 0;
    }

    if (nextState == 1 && (
        w == 0 || w == pocketDimension.length - 1 ||
        z == 0 || z == pocketDimension[0].length - 1 ||
        y == 0 || y == pocketDimension[0][0].length - 1  ||
        x == 0 || x == pocketDimension[0][0][0].length - 1)) {
      borderCellActive = true;
    }

    return nextState;
  }))));

  // Pre-emptively expand the pocket dimension so no border cells are active, i.e., everything
  // has room to expand within known space during the next boot cycle.
  if (borderCellActive) pocketDimension = growDimension(pocketDimension);

  return pocketDimension;
}

let pocketDimension = growDimension([[startingSlice]]);

for (let i = 0; i < 6; i++) {
  pocketDimension = runBootCycle(pocketDimension);
}

let numActiveCells = 0;
pocketDimension = pocketDimension.forEach((cube, w) => cube.forEach((plane, z) => plane.forEach((row, y) => row.forEach((column, x) => {
  numActiveCells += pocketDimension[w][z][y][x];
}))));
console.log(numActiveCells);

