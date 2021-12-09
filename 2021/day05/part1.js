/**
 * Solutions for Advent of Code 2021, Day 5, Part 1.
 * Original problem: https://adventofcode.com/2021/day/5
 */


let testInput = [
  '0,9 -> 5,9',
  '8,0 -> 0,8',
  '9,4 -> 3,4',
  '2,2 -> 2,1',
  '7,0 -> 7,4',
  '6,4 -> 2,0',
  '0,9 -> 2,9',
  '3,4 -> 1,4',
  '0,0 -> 8,8',
  '5,5 -> 8,2'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});


const LINE_REGEX = /(?<x1>\d+),(?<y1>\d+) -> (?<x2>\d+),(?<y2>\d+)/;

input = input.map(line => LINE_REGEX.exec(line).groups);

let coveredPointsMap = new Map();

input.forEach(line => {
  let point;
  let start;
  let end;
  let generatePoint;

  if (line.x1 == line.x2 && line.y1 != line.y2){
    start = Math.min(line.y1, line.y2);
    end = Math.max(line.y1, line.y2);
    generatePoint = str => '' + line.x1 + ',' + str;
  } else if (line.x1 != line.x2 && line.y1 == line.y2) {
    start = Math.min(line.x1, line.x2);
    end = Math.max(line.x1, line.x2);
    generatePoint = str => '' + str + ',' + line.y1;
  }

  for (let i = start; i <= end; i++) {
    point = generatePoint(i);
    coveredPointsMap.set(point,
        coveredPointsMap.has(point) ? coveredPointsMap.get(point) + 1 : 1);
  }
});

let answer = [...coveredPointsMap.values()].filter(x => x > 1).length;

console.log({
  input,
  coveredPointsMap,
  answer
});
