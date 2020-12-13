/**
 * Solutions for Advent of Code 2020, Day 10, Part 2.
 * Original problem: https://adventofcode.com/2020/day/10
 */


let testInput1 = [
  '16',
  '10',
  '15',
  '5',
  '1',
  '11',
  '7',
  '19',
  '6',
  '12',
  '4',
];

let testInput2 = [
  '28',
  '33',
  '18',
  '42',
  '31',
  '14',
  '46',
  '20',
  '48',
  '47',
  '24',
  '23',
  '49',
  '45',
  '19',
  '38',
  '39',
  '11',
  '1',
  '32',
  '25',
  '35',
  '8',
  '17',
  '7',
  '9',
  '4',
  '2',
  '34',
  '10',
  '3',
];

// let input = testInput1;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

function solveRecursive() {
  input = input.map(value => parseInt(value, 10)).sort((a, b) => a - b);

  // Add charging outlet to list of input to simplify logic since everything starts there.
  input.unshift(0);

  // Store intermediary (repeated) results and setup base case.
  let numPathsForIndex = new Array(input.length);
  numPathsForIndex[input.length - 1] = 1;

  function getNumPathsForIndex(index) {
    if (!!numPathsForIndex[index]) {
      return numPathsForIndex[index];
    }

    let numPaths = 0;
    let currentVal = input[index];

    // All possible paths from this adapter is equal to the sum of all possible paths from all
    // possible next adapters.
    for (let i = 1; i < 4 && index + i < input.length; i++) {
      let possibleNext = input[index + i];

      if (possibleNext - currentVal <= 3) {
        numPaths += getNumPathsForIndex(index + i);
      }
    }

    numPathsForIndex[index] = numPaths;
    return numPaths;
  }

  return getNumPathsForIndex(0);
}

function solveIterative() {
  input = input.map(value => parseInt(value, 10)).sort((a, b) => b - a);

  // Add charging outlet to list of input to simplify logic since everything starts there.
  input.push(0);

  let numPathsForIndex = new Array(input.length);
  numPathsForIndex[0] = 1;

  for (let i = 1; i < input.length; i++) {

    let numPaths = 0;

    for (let j = Math.max(i - 3, 0); j < i; j++) {
      if (input[j] - input[i] <= 3) {
        numPaths = numPaths + numPathsForIndex[j];
      }
    }

    numPathsForIndex[i] = numPaths;
  }

  return numPathsForIndex[numPathsForIndex.length - 1];
}


console.log(solveIterative());
