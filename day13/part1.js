/**
 * Solutions for Advent of Code 2020, Day 13, Part 1.
 * Original problem: https://adventofcode.com/2020/day/13
 */


let testInput = [
  '939',
  '7,13,x,x,59,x,31,19'
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let time = parseInt(input[0], 10);
let buses = input[1].split(',').filter(val => val !== 'x').map(val => parseInt(val, 10));

console.log(time);
console.log(buses);

let waitingInfo = buses.reduce((info, busId) => {
  let waitTime = busId - (time % busId);

  if (waitTime < info.shortestWaitTime) {
    info.shortestWaitTime = waitTime;
    info.shortestWaitId = busId;
  }

  return info;
}, {
  shortestWaitTime: Number.MAX_SAFE_INTEGER,
  shortestWaitId: -1
});

console.log(waitingInfo.shortestWaitId * waitingInfo.shortestWaitTime);

