let testInput = [
  'BFFFBBFRRR',
  'FFFBBBFRRR',
  'BBFFBBFRLL'
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

function computeSeatId(boardingPass) {
  let rowNumber = parseInt(
      boardingPass.substring(0, 7).replaceAll('F', '0').replaceAll('B', '1'), 2);
  let columnNumber = parseInt(
      boardingPass.substring(7).replaceAll('L', '0').replaceAll('R', '1'), 2);

  return rowNumber * 8 + columnNumber;
}

let maxSeatId = input.reduce(
    (maxSeatId, boardingPass) => Math.max(maxSeatId, computeSeatId(boardingPass)), 0);

console.log(maxSeatId);