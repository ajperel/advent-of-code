/**
 * Solutions for Advent of Code 2020, Day 12, Part 1.
 * Original problem: https://adventofcode.com/2020/day/12
 */


let testInput = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11',
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let ACTION_REGEX = /(?<action>[NSEWLRF])(?<value>\d+)/;
input = input.map(val => {
  let match = ACTION_REGEX.exec(val);
  return {
    action: match.groups.action,
    value: parseInt(match.groups.value, 10)
  };
});

let ship = {
  currentDirection: 0,
  x: 0,
  y: 0
};

let waypoint = {
  x: 10,
  y: 1
};

let actionToXY = {
  'N': [0, 1],
  'S': [0, -1],
  'E': [1, 0],
  'W': [-1, 0]
};

let directionToXY = {
  0: actionToXY['E'],
  90: actionToXY['N'],
  180: actionToXY['W'],
  270: actionToXY['S']
};

ship = input.reduce((ship, instruction) => {
  let xy;

  switch (instruction.action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      xy = actionToXY[instruction.action];
      waypoint.x += xy[0] * instruction.value;
      waypoint.y += xy[1] * instruction.value;
      break;
    case 'R':
      ship.currentDirection = (ship.currentDirection - instruction.value) % 360;
      break;
    case 'L':
      ship.currentDirection = (ship.currentDirection + instruction.value) % 360;
      break;
    case 'F':
      if (ship.currentDirection < 0) ship.currentDirection = 360 + ship.currentDirection;
      xy = directionToXY[ship.currentDirection]
      break;
  }

  if (xy) {
    ship.x += xy[0] * instruction.value;
    ship.y += xy[1] * instruction.value;
  }
  // console.log(instruction);
  // console.log(ship);

  return ship;
}, ship);

console.log(Math.abs(ship.x) + Math.abs(ship.y));
