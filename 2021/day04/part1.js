/**
 * Solutions for Advent of Code 2021, Day 4, Part 1.
 * Original problem: https://adventofcode.com/2021/day/4
 */


let testInput = [
  '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1',

  '22 13 17 11  0\n' +
  ' 8  2 23  4 24\n' +
  '21  9 14 16  7\n' +
  ' 6 10  3 18  5\n' +
  ' 1 12 20 15 19',

  ' 3 15  0  2 22\n' +
  ' 9 18 13 17  5\n' +
  '19  8  7 25 23\n' +
  '20 11 10 24  4\n' +
  '14 21 16 12  6',

  '14 21 17 24  4\n' +
  '10 16 15  9 19\n' +
  '18  8 23 26 20\n' +
  '22 11 13  6  5\n' +
  ' 2  0 12  3  7'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n\n'});


let Board = class {
  constructor(board) {
    this.board = board;
    this.nRows = board.length;
    this.nCols = board[0].length;
    this.rowCalledCount = new Array(this.nRows).fill(0);
    this.columnCalledCount = new Array(this.nCols).fill(0);

    this.unCalled = new Set();
    this.board.forEach(row => row.forEach(n => this.unCalled.add(n)));

    this.won = false;
  }

  call(num) {
    this.board.some((row, rowIndex) => {
      let columnIndex = row.indexOf(num);

      if(columnIndex > -1) {
        this.rowCalledCount[rowIndex] += 1;
        this.columnCalledCount[columnIndex] += 1;
        this.unCalled.delete(num);

        if (this.rowCalledCount[rowIndex] == this.nRows) {
          this.won = true;
        } else if (this.columnCalledCount[columnIndex] == this.nCols) {
          this.won = true;
        }

        return true;
      }

      return false;
    });
  }

  sumUncalled() {
    return [...this.unCalled].reduce((sum, currentValue) => sum + currentValue);
  }
}

let numbers = input[0].split(',').map(str => parseInt(str, 10));
let boards = input.slice(1).map(str => new Board(str.split('\n').map(line => line.trim().split(/\s+/).map(n => parseInt(n, 10)))));

let winningNumber;
let winningBoard;

numbers.some(num => {
  winningBoard = boards.find(board => {
    board.call(num);
    return board.won;
  });

  if (winningBoard !== undefined) {
    winningNumber = num;
    return true;
  }

  return false;
});

console.log({
  numbers,
  winningNumber,
  winningBoard,
  unmarkedSum: winningBoard.sumUncalled(),
  answer: winningNumber * winningBoard.sumUncalled()
});
