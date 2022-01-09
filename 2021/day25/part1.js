/**
 * Solutions for Advent of Code 2021, Day 25, Part 1.
 * Original problem: https://adventofcode.com/2021/day/25
 *
 * Pair programmed with jdoozer.
 */


let testInputs = [
  [
  'v...>>.vv>',
  '.vv>>.vv..',
  '>>.>v>...v',
  '>>v>>.>.v.',
  'v>v.vv.v..',
  '>.>>..v...',
  '.vv..>.>v.',
  'v.v..>>v.v',
  '....v..v.>'
  ]
];

const args = process.argv.slice(2);

let input = args[0] !== 'test' ?
    require('../lib/get-input').getInput({delimiter: '\n', filename: args[0]}) :
    testInputs[(parseInt(args[1], 10) - 1) || 0];

let seaCucumberMatrix = input.map(line => line.split(''));

function moveSeaCucumbers(seaCucumberMatrix) {
  let moved = false;

  let eastMoveMatrix = seaCucumberMatrix.map(row => row.map((char, columnIndex) => {
    if (char === 'v') return char;
    if (char === '>') {
      return row[(columnIndex + 1) % row.length] === '.' ? '.' : char;
    }
    if (char === '.') {
      let index = (columnIndex === 0 ? row.length : columnIndex) - 1;
      if (row[index] === '>') {
        moved = true;
        return '>';
      } else {
        return char;
      }
    }
  }));

  let southMoveMatrix = eastMoveMatrix.map((row, rowIndex) => row.map((char, columnIndex) => {
    if (char === '>') return char;
    if (char === 'v') {
      return eastMoveMatrix[(rowIndex + 1) % eastMoveMatrix.length][columnIndex] === '.' ? '.' : char;
    }
    if (char === '.') {
      let index = (rowIndex === 0 ? eastMoveMatrix.length : rowIndex) - 1;
      if (eastMoveMatrix[index][columnIndex] === 'v') {
        moved = true;
        return 'v';
      } else {
        return char;
      }
    }
  }));

  return {
    seaCucumberMatrix: southMoveMatrix,
    moved
  };
}

let i = 0;
let moved = false;

do {
  i++;
  ({seaCucumberMatrix, moved} = moveSeaCucumbers(seaCucumberMatrix));
} while(moved);

console.dir({
  // seaCucumberMatrix: seaCucumberMatrix.map(line => line.join('')),
  i
});
