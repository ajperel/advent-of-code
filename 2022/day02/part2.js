/**
 * Solutions for Advent of Code 2022, Day 2, Part 2.
 * Original problem: https://adventofcode.com/2022/day/2
 */


let testInput = [
'A Y',
'B X',
'C Z'
];


// A, X Rock
// B, Y Paper
// C, Z Scissors

const SELECT_SCORE = {
  'A': 1,
  'B': 2,
  'C': 3
};

const SELECT_BEATS = {
  'A': 'C',
  'B': 'A',
  'C': 'B',
};

const SELECT_LOSES = {
  'A': 'B',
  'B': 'C',
  'C': 'A',  
};

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let roundScores = input.map(line => {
    let [opp, outcome] = line.split(' ');

    let self;
    let score = 0;

    if (outcome == 'X') {
        // Must Lose to Opp
        self = SELECT_BEATS[opp];
    } else if (outcome == 'Z') {
        // Must Win against Opp
        self = SELECT_LOSES[opp];
        score += 6;
    } else {
        self = opp;
        score += 3;
    }

    score += SELECT_SCORE[self];

    return score;
});

console.dir({
    // roundScores,
    total: roundScores.reduce((x, y) => x + y)
});