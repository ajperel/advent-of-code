/**
 * Solutions for Advent of Code 2020, Day 8, Part 2.
 * Original problem: https://adventofcode.com/2020/day/8
 */


 let testInput = [
  'nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let INPUT_REGEX = /(acc|jmp|nop) ([+-]\d+)/;

let parsedInput = input.map((line) => {
  let match = INPUT_REGEX.exec(line);
  return {
    instruction: match[1],
    argument: parseInt(match[2], 10)
  };
});

function changeInstruction(parsedInput, index) {
  if (parsedInput[index].instruction === 'nop') {
    parsedInput[index].instruction = 'jmp';
  } else if (parsedInput[index].instruction === 'jmp') {
    parsedInput[index].instruction = 'nop';
  }
}

function runProgram(parsedInput) {
  let accumulator = 0;
  let i = 0;
  let instructionSeen = new Array(input.length);

  while (i < input.length) {
    if (instructionSeen[i]) {
      break;
    }

    instructionSeen[i] = true;  

    let {instruction, argument} = parsedInput[i];

    if (instruction === 'acc') {
      accumulator += argument
      i += 1;
    } else if (instruction === 'jmp') {
      i += argument;
    } else if (instruction === 'nop') {
      i += 1;
    }
  }

  return {
    exitedNormally: i == parsedInput.length,
    accumulator
  };
}

let globalAccumulator = 0;

for (let instructionToChange = 0; instructionToChange < input.length; instructionToChange++) {
  changeInstruction(parsedInput, instructionToChange);  

  let {accumulator, exitedNormally} = runProgram(parsedInput);

  if (exitedNormally) {
    globalAccumulator = accumulator;
    break;
  } else {
    // Restore instruction so it's back to the original broken state.
    changeInstruction(parsedInput, instructionToChange);  
  }
}


console.log(globalAccumulator);