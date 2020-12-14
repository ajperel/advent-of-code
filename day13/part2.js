/**
 * Solutions for Advent of Code 2020, Day 13, Part 2.
 * Original problem: https://adventofcode.com/2020/day/13
 */


let testInput = [
  '939',
  '7,13,x,x,59,x,31,19'
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let time = parseInt(input[0], 10);
let buses = input[1].split(',').
    map((val, index) => {return val === 'x' ? val : {index, id: parseInt(val, 10)}}).
    filter(val => val !== 'x');

// console.log(time);
// console.log(buses);

let candidate = {
  timestamp: buses[0].id,
  increment: buses[0].id
};

for (i = 1; i < buses.length; i++) {
  while ((candidate.timestamp + buses[i].index) % buses[i].id !== 0) {
    candidate.timestamp += candidate.increment;
  }

  // Note that you really want to find the least common multiple between candidate.increment &
  // buses[i].id but buses[i].id is always prime so you can just multiply.
  candidate.increment = candidate.increment * buses[i].id;

  // console.log(candidate);
}

console.log(candidate.timestamp);

