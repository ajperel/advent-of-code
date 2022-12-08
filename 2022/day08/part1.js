/**
 * Solutions for Advent of Code 2022, Day 8, Part 1.
 * Original problem: https://adventofcode.com/2022/day/8
 */


let testInput = [
  '30373',
  '25512',
  '65332',
  '33549',
  '35390',
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let treeGridYX = input.map(line => line.split('').map(c => parseInt(c, 10)));
let treeGridXY = Object.keys(treeGridYX).map((col) => treeGridYX.map((row) => row[col]));

const GRID_HEIGHT = treeGridYX.length;
const GRID_WIDTH = treeGridYX[0].length;

function isTreeVisible(y, x) {
  let treeHeight = treeGridYX[y][x];

  return (Math.max(...treeGridYX[y].slice(0, x)) < treeHeight ||
          Math.max(...treeGridYX[y].slice(x + 1)) < treeHeight ||
          Math.max(...treeGridXY[x].slice(0, y)) < treeHeight ||
          Math.max(...treeGridXY[x].slice(y + 1)) < treeHeight) ? 1 : 0;
}

let visibleGrid = [
  new Array(GRID_WIDTH).fill(1),
  ...[...new Array(GRID_HEIGHT - 2)].map(() => [1, ...(new Array(GRID_WIDTH - 2).fill(null)), 1]),
  new Array(GRID_WIDTH).fill(1)
];

visibleGrid = visibleGrid.map((row, rowIndex) => 
    row.map((col, colIndex) => row[colIndex] || isTreeVisible(rowIndex, colIndex)));

console.dir({
  // treeGridYX,
  // treeGridXY,
  // visibleGrid,
  answer: visibleGrid.reduce((sum, row) => sum + row.reduce((sum, col) => sum + col), 0)
});