/**
 * Solutions for Advent of Code 2020, Day 5, Part 2.
 * Original problem: https://adventofcode.com/2020/day/5
 */


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

let previousSeat = input
    .map((boardingPass) => computeSeatId(boardingPass))
    .sort((a,b)=>a-b)
    .find((seatId, index, arr) => {
      return arr[index + 1] == seatId + 2;
    });

console.log(previousSeat + 1);
