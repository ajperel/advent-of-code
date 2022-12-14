/**
 * Solutions for Advent of Code 2022, Day 14, Part 1.
 * Original problem: https://adventofcode.com/2022/day/14
 */


let testInput = [
  '498,4 -> 498,6 -> 496,6',
  '503,4 -> 502,4 -> 502,9 -> 494,9'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});


const pathSpecs = input.map(line => line.split(' -> ').map(p => p.split(',').map((n, i) => parseInt(n, 10))));
let points = pathSpecs.flat();

let minX = Math.min(...points.map(p => p[0]));
// let minY = Math.min(...points.map(p => p[1]));
let maxX = Math.max(...points.map(p => p[0]));
let maxY = Math.max(...points.map(p => p[1]));

let width = maxX - minX + 1;

// Create scan matrix.
let scan = new Array(maxY + 1).fill().map(() => new Array(width).fill('.'));


const SAND_START = Object.freeze([500 - minX, 0]);

// Draw scan paths.
pathSpecs.forEach((pathSpec) => {
  for (let i = 1; i < pathSpec.length; i++) {
    // drawLine(pathSpecs[i - 1], pathSpec[i]);
    let [x1, y1] = pathSpec[i - 1];
    let [x2, y2] = pathSpec[i];

    for (let i = Math.min(y1, y2); i <= Math.max(y1, y2); i++) {
      for (let j = Math.min(x1, x2); j <= Math.max(x1, x2); j++) {
        scan[i][j - minX] = '#'
      }
    }
  }
});

function getNextSandPosition([x, y]) {
  // If nothing is below you, go down. If you're at maxY, then nothing can be below you, and you
  // must be able to go down into the abyss.
  if (y === maxY || scan[y + 1][x] === '.') {
    return [x, y + 1];
  }

  // If at minX you must be able to go left and fall into the abyss.
  if (x === 0 || scan[y + 1][x - 1] === '.') {
    return [x - 1, y + 1];
  }

  // If at maxX you must be able to get right and fall into the abyss.
  if (x === width || scan[y + 1][x + 1] === '.') {
    return [x + 1, y + 1];
  }

  return [x, y];
}


let sandFlowedIntoAbyss = false;
let sandPos = [...SAND_START];

let numSandUnitsContained = 0;

while (!sandFlowedIntoAbyss) {
  let nextSandPos = getNextSandPosition(sandPos);

  // console.dir({sandPos, nextSandPos, sandFlowedIntoAbyss})

  if (sandPos[0] === nextSandPos[0] && sandPos[1] === nextSandPos[1]) {
    scan[sandPos[1]][sandPos[0]] = 'o';
    sandPos = [...SAND_START];
    numSandUnitsContained++;
  } else if (nextSandPos[0] < 0 || nextSandPos[0] > (width - 1) || nextSandPos[1] > maxY) {
    sandFlowedIntoAbyss = true;
  } else {
    sandPos = nextSandPos;
  }
}

console.dir({
  // pathSpecs,
  // minX,
  // maxX,
  // minY,
  // maxY,
  answer: numSandUnitsContained
}, {depth: null});

// scan.forEach(row => console.log(row.join('')));

