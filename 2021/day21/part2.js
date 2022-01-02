/**
 * Solutions for Advent of Code 2021, Day 21, Part 2.
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

const startingPositions = input.map(line => parseInt(inputRegex.exec(line)[2], 10));
let initialState = {
  positions: startingPositions,
  scores: [0, 0]
};

let universesMap = new Map([
  [JSON.stringify(initialState), 1]
]);

let universeWinCounts = [0, 0];

// Sum of 3 rolls of the dice to # occurences.
let dieResultCounts = new Map([
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1]
]);

let player = 0;
while (universesMap.size > 0) {
  const nextUniversesMap = new Map();

  for (const [stateString, universeCount] of universesMap.entries()) {
    const {positions, scores} = JSON.parse(stateString);

    for (const [dieResult, dieResultCount] of dieResultCounts.entries()) {
      let nextState = {
        positions: [...positions],
        scores: [...scores]
      };

      nextState.positions[player] = (positions[player] + dieResult - 1) % 10 + 1;
      nextState.scores[player] += nextState.positions[player];

      const newUniverseCount = universeCount * dieResultCount;
      if (nextState.scores[player] >= 21) {
        universeWinCounts[player] += newUniverseCount;
      } else {
        const nextStateString = JSON.stringify(nextState);

        nextUniversesMap.set(
            nextStateString,
            (nextUniversesMap.get(nextStateString) || 0) + newUniverseCount);
      }
    }
  }

  player = (player + 1) % 2;
  universesMap = nextUniversesMap;
}

console.log(Math.max(...universeWinCounts));

