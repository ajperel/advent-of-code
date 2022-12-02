/**
 * Solutions for Advent of Code 2022, Day 2, Part 1.
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
  'X': 1,
  'Y': 2,
  'Z': 3
};

const SELECT_BEATS = {
  'X': 'C',
  'Y': 'A',
  'Z': 'B',
};

const SELECT_EQUIV = {
  'X': 'A',
  'Y': 'B',
  'Z': 'C' 
}

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let roundScores = input.map(line => {
    let [opp, self] = line.split(' ');

    let score = SELECT_SCORE[self];

    if (opp == SELECT_EQUIV[self]) {
        score += 3;
    } else if (opp == SELECT_BEATS[self]) {
        score += 6;
    }

    return score;
});

console.dir({
    // roundScores,
    total: roundScores.reduce((x, y) => x + y)
})