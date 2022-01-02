/**
 * Solutions for Advent of Code 2021, Day 21, Part 1.
 * Original problem: https://adventofcode.com/2021/day/21
 *
 * Pair programmed with jdoozer.
 */


let testInputs = [
  [
    'Player 1 starting position: 4',
    'Player 2 starting position: 8'
  ],
  [
    'Player 1 starting position: 5',
    'Player 2 starting position: 8'
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

const inputRegex = /Player (1|2) starting position: (\d+)/;

let positions = input.map(line => parseInt(inputRegex.exec(line)[2], 10));
let scores = [0, 0];
let numDieRolls = 0;
let currentPlayer = 0;

while (Math.max(...scores) < 1000) {
  let position = positions[currentPlayer];
  for (let i = 0; i < 3; i++) {
    const dieRoll = (numDieRolls % 100) + 1;
    numDieRolls++;
    position = (position + dieRoll - 1) % 10 + 1;
  }

  scores[currentPlayer] += position;
  positions[currentPlayer] = position;

  currentPlayer = (currentPlayer + 1) % 2;

  // console.dir({
  //   currentPlayer,
  //   positions,
  //   scores
  // });
}

console.log(Math.min(...scores) * numDieRolls);


