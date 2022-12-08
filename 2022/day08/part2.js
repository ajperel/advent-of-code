/**
 * Solutions for Advent of Code 2022, Day 8, Part 2.
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

function calculateScenicScore(y, x) {
  let treeHeight = treeGridYX[y][x];

  let leftSlice = treeGridYX[y].slice(0, x).reverse();
  let left = leftSlice.findIndex(n => n >= treeHeight);
  left = left == -1 ? leftSlice.length : left + 1;

  let rightSlice = treeGridYX[y].slice(x + 1);
  let right = rightSlice.findIndex(n => n >= treeHeight);
  right = right == -1 ? rightSlice.length : right + 1;

  let upSlice = treeGridXY[x].slice(0, y).reverse();
  let up = upSlice.findIndex(n => n >= treeHeight); 
  up = up == -1 ? upSlice.length : up + 1;

  let downSlice = treeGridXY[x].slice(y + 1);
  let down = downSlice.findIndex(n => n >= treeHeight);
  down = down == -1 ? downSlice.length : down + 1;

  return up * down * left * right;
}

let scenicGridYX = [
  new Array(GRID_WIDTH).fill(0),
  ...[...new Array(GRID_HEIGHT - 2)].map(() => [0, ...(new Array(GRID_WIDTH - 2).fill(null)), 0]),
  new Array(GRID_WIDTH).fill(0)
];

scenicGridYX = scenicGridYX.map((row, rowIndex) => 
    row.map((col, colIndex) => row[colIndex] === 0 ? 0 : calculateScenicScore(rowIndex, colIndex)));

console.dir({
  // treeGridYX,
  // treeGridXY,
  // scenicGridYX,
  answer: Math.max(...scenicGridYX.map(row => Math.max(...row)))
});