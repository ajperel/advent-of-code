/**
 * Solutions for Advent of Code 2022, Day 10, Part 2.
 * Original problem: https://adventofcode.com/2022/day/10
 */


let testInputs = [
  [
    'noop',
    'addx 3',
    'addx -5'
  ], [
    'addx 15',
    'addx -11',
    'addx 6',
    'addx -3',
    'addx 5',
    'addx -1',
    'addx -8',
    'addx 13',
    'addx 4',
    'noop',
    'addx -1',
    'addx 5',
    'addx -1',
    'addx 5',
    'addx -1',
    'addx 5',
    'addx -1',
    'addx 5',
    'addx -1',
    'addx -35',
    'addx 1',
    'addx 24',
    'addx -19',
    'addx 1',
    'addx 16',
    'addx -11',
    'noop',
    'noop',
    'addx 21',
    'addx -15',
    'noop',
    'noop',
    'addx -3',
    'addx 9',
    'addx 1',
    'addx -3',
    'addx 8',
    'addx 1',
    'addx 5',
    'noop',
    'noop',
    'noop',
    'noop',
    'noop',
    'addx -36',
    'noop',
    'addx 1',
    'addx 7',
    'noop',
    'noop',
    'noop',
    'addx 2',
    'addx 6',
    'noop',
    'noop',
    'noop',
    'noop',
    'noop',
    'addx 1',
    'noop',
    'noop',
    'addx 7',
    'addx 1',
    'noop',
    'addx -13',
    'addx 13',
    'addx 7',
    'noop',
    'addx 1',
    'addx -33',
    'noop',
    'noop',
    'noop',
    'addx 2',
    'noop',
    'noop',
    'noop',
    'addx 8',
    'noop',
    'addx -1',
    'addx 2',
    'addx 1',
    'noop',
    'addx 17',
    'addx -9',
    'addx 1',
    'addx 1',
    'addx -3',
    'addx 11',
    'noop',
    'noop',
    'addx 1',
    'noop',
    'addx 1',
    'noop',
    'noop',
    'addx -13',
    'addx -19',
    'addx 1',
    'addx 3',
    'addx 26',
    'addx -30',
    'addx 12',
    'addx -1',
    'addx 3',
    'addx 1',
    'noop',
    'noop',
    'noop',
    'addx -9',
    'addx 18',
    'addx 1',
    'addx 2',
    'noop',
    'noop',
    'addx 9',
    'noop',
    'noop',
    'noop',
    'addx -1',
    'addx 2',
    'addx -37',
    'addx 1',
    'addx 3',
    'noop',
    'addx 15',
    'addx -21',
    'addx 22',
    'addx -6',
    'addx 1',
    'noop',
    'addx 2',
    'addx 1',
    'noop',
    'addx -10',
    'noop',
    'noop',
    'addx 20',
    'addx 1',
    'addx 2',
    'addx 2',
    'addx -6',
    'addx -11',
    'noop',
    'noop',
    'noop'
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let instructions = input.map(line => line.split(' ')).map(
    arr => arr.length === 1 ? arr : [arr[0], parseInt(arr[1], 10)]);

let xValues = new Array(instructions.length + 1);
let pixels = [...new Array(6)].map(() => new Array(40).fill('.'));

let executingAddX = false;

xValues[0] = 1;

let instructionIndex = 0;
let cycleCount = 0;
let pixelX = 0;
let pixelY = 0;

while (instructionIndex < instructions.length) {
  cycleCount++;
  xValues[cycleCount] = xValues[cycleCount - 1];

  // Advance CPU
  if (executingAddX) {
    executingAddX = false;
    xValues[cycleCount] += instructions[instructionIndex][1];
    instructionIndex++;
  } else if (instructions[instructionIndex].length === 1) {
    // Case noop just move to the next instruction/
    instructionIndex++;
  } else {
    // Case addx. This cycle is just processing.
    executingAddX = true;
  }

  // Draw on CRT
  let pixelX = (cycleCount - 1) % 40;
  let pixelY = Math.floor((cycleCount - 1) / 40);

  if (Math.abs(pixelX - xValues[cycleCount - 1]) <= 1) {
    pixels[pixelY][pixelX] = '#';
  }
}

console.dir({
  // instructions,
  // xValues,
  pixels: pixels.map(line => line.join(''))
});
