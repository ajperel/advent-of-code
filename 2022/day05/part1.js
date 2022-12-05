/**
 * Solutions for Advent of Code 2022, Day 5, Part 1.
 * Original problem: https://adventofcode.com/2022/day/5
 */


let testInput = [
  '    [D]    \n' + 
  '[N] [C]    \n' +
  '[Z] [M] [P]\n' +
  ' 1   2   3',
  'move 1 from 2 to 1\n' +
  'move 3 from 1 to 3\n' +
  'move 2 from 2 to 1\n' +
  'move 1 from 1 to 2'
];


const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n\n'});

let [startingStacks, rearrangementProcedure] = input;

startingStacks = startingStacks.split('\n');
let currentStacks = []
for (let i = 0; i < (startingStacks[startingStacks.length - 2].length + 1) / 4; i++) {
  currentStacks.push([]);
}
for (let i = startingStacks.length - 2; i >=0; i--) {
  for (let j = 1; j < startingStacks[i].length; j += 4) {
    let stackNum = (j - 1) / 4;
    let char = startingStacks[i].charAt(j);
    if (char !== ' ') {
      currentStacks[stackNum].push(char);  
    }
  }
}

rearrangementProcedure = rearrangementProcedure.split('\n').map(str => {
  match = /move (\d+) from (\d+) to (\d+)/.exec(str);
  return {
    moveNum: match[1],
    from: match[2] - 1,
    to: match[3] - 1
  }
});

rearrangementProcedure.forEach(({moveNum, from, to}) => {
  for (let i = 0; i < moveNum; i++) {
    currentStacks[to].push(currentStacks[from].pop());
  }
});

let message = currentStacks.map(stack => stack[stack.length - 1]).join('');

console.dir({
  // input,
  // startingStacks,
  // rearrangementProcedure,
  // currentStacks,
  message,
});