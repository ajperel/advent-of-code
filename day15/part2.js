/**
 * Solutions for Advent of Code 2020, Day 15, Part 2.
 * Original problem: https://adventofcode.com/2020/day/15
 */


// let input = [0,3,6];
let input = [13,0,10,12,1,5,8];


let lastNumber = -1;
let turn = 0;

history = {};

function visit(number) {
  turn += 1;
  lastNumber = number;

  // console.log('turn: ', turn, ' number: ', number);
  !history[number] ?
      history[number] = [turn] :
      history[number] = [history[number][history[number].length - 1], turn];
}

input.forEach(number => visit(number));

while (turn < 30000000) {
  visitHistory = history[lastNumber];

  // console.log(visitHistory);

  visitHistory.length === 1 ?
    visit(0) :
    visit(visitHistory[1] - visitHistory[0]);
}

console.log(lastNumber);
