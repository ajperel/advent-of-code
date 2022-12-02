/**
 * Solutions for Advent of Code 2022, Day 1, Part 1.
 * Original problem: https://adventofcode.com/2022/day/1
 */


let testInput = [
'1000\n2000\n3000',
'4000',
'5000\n6000',
'7000\n8000\n9000',
'10000'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n\n'});

let calorieTotals = input.map(x => x.split('\n').map(x => parseInt(x, 10)).reduce((x, y) => x + y));
let maxTotal = Math.max(...calorieTotals);
console.dir({maxTotal});