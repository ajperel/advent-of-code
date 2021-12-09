/**
 * Solutions for Advent of Code 2021, Day 5, Part 2.
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

let lines = [];
input = input.forEach(line => {
  let groups = LINE_REGEX.exec(line).groups;
  lines.push({
    x1: parseInt(groups.x1),
    x2: parseInt(groups.x2),
    y1: parseInt(groups.y1),
    y2: parseInt(groups.y2)
  });
});


let coveredPointsMap = new Map();

lines.forEach(line => {
  let point;
  let start;
  let length;
  let generatePoint;

  if (line.x1 == line.x2 && line.y1 != line.y2){
    start = Math.min(line.y1, line.y2);
    length = Math.max(line.y1, line.y2) - start + 1;
    generatePoint = idx => '' + line.x1 + ',' + (start + idx);
  } else if (line.x1 != line.x2 && line.y1 == line.y2) {
    start = Math.min(line.x1, line.x2);
    length = Math.max(line.x1, line.x2) - start + 1;
    generatePoint = idx => '' + (start + idx) + ',' + line.y1;
  } else {
    start = line.x1;
    length = Math.abs(line.x2 - line.x1) + 1;
    let startY = line.y1;
    let dirX = line.x2 > line.x1 ? 1 : -1;
    let dirY = line.y2 > line.y1 ? 1 : -1;
    generatePoint = idx => '' + (start + idx * dirX) + ',' + (startY + idx * dirY);
  }

  for (let i = 0; i < length; i++) {
    point = generatePoint(i);
    coveredPointsMap.set(point,
        coveredPointsMap.has(point) ? coveredPointsMap.get(point) + 1 : 1);
  }
});

let answer = [...coveredPointsMap.values()].filter(x => x > 1).length;

console.log({
  lines,
  coveredPointsMap,
  answer
});
