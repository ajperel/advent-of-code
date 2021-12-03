/**
 * Solutions for Advent of Code 2021, Day 3, Part 2.
 * Original problem: https://adventofcode.com/2021/day/3
 */


let testInput = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(x => x.split('').map(x => parseInt(x, 10)));

function calculateRates(reports) {
  let sums = reports.reduce((sums, next) => {
    return sums.map((sum, i) => sum + next[i]);
  });

  let numReports = reports.length;

  let gammaRateArray = sums.map(sum => sum >= Math.ceil(numReports / 2) ? 1 : 0);
  let epislonRateArray = sums.map(sum => sum < Math.ceil(numReports / 2) ? 1 : 0);

  return {gammaRateArray, epislonRateArray};
}

let o2GenRatingCandidates = [...input];
for (let i = 0; o2GenRatingCandidates.length > 1; i++) {
  let {gammaRateArray, _} = calculateRates(o2GenRatingCandidates);
  // console.log('before:', o2GenRatingCandidates, gammaRateArray, i);
  o2GenRatingCandidates = o2GenRatingCandidates.filter(item => item[i] === gammaRateArray[i]);
  // console.log('after:', o2GenRatingCandidates);
}

let co2ScrubRatingCandidates = [...input];
for (let i = 0; co2ScrubRatingCandidates.length > 1; i++) {
  let {_, epislonRateArray} = calculateRates(co2ScrubRatingCandidates);
  // console.log('before:', co2ScrubRatingCandidates, epislonRateArray, i);
  co2ScrubRatingCandidates = co2ScrubRatingCandidates.filter(item => item[i] === epislonRateArray[i]);
  // console.log('after:', co2ScrubRatingCandidates);
}

let o2GenRating = parseInt(o2GenRatingCandidates[0].join(''), 2);
let co2ScrubRating = parseInt(co2ScrubRatingCandidates[0].join(''), 2);

let lifeSupportRating = o2GenRating * co2ScrubRating;
console.log({o2GenRating, co2ScrubRating, lifeSupportRating});
