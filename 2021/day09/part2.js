/**
 * Solutions for Advent of Code 2021, Day 9, Part 2.
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

let lowPoints = input.reduce((totalRisk, row, i, matrix) => {
  let rowRisk = row.reduce((rowRisk, cell, j) => {
    if (isLowPoint(cell, i, j, matrix)) {
      rowRisk.push([i, j]);
    }

    return rowRisk;
  }, []);

  return totalRisk.concat(rowRisk);
}, []);

let getSizeFromFloodFill = (startPoint, matrix) => {
  let queue = [startPoint];
  let basinSize = 0;

  while (queue.length > 0) {
    let [y, x] = queue.pop();
    let value = matrix[y][x];

    if (value == -1 || value == 9) {
      continue;
    }

    basinSize++;
    matrix[y][x] = -1;

    if (y > 0) queue.push([y - 1, x]);
    if (x > 0) queue.push([y, x - 1]);
    if (y < matrix.length - 1) queue.push([y + 1, x]);
    if (x < matrix[0].length - 1) queue.push([y, x + 1]);
  }

  return basinSize;
};

let basinSizes = lowPoints.reduce((basinSizes, point) => {
  basinSizes.push(getSizeFromFloodFill(point, input));
  return basinSizes;
}, []);

let largerBasinSizes = basinSizes.sort((a, b) => a - b).slice(basinSizes.length - 3);

let answer = largerBasinSizes.reduce((product, n) => product * n);

console.log({
  // input,
  lowPoints,
  basinSizes,
  largerBasinSizes,
  answer
});
