/**
 * Solutions for Advent of Code 2020, Day 12, Part 2.
 * Original problem: https://adventofcode.com/2020/day/12
 */


let testInput = [
  'F10',
  'N3',
  'F7',
  'R90',
  'F11',
];

// testInput = [
//   'R90',
//   'R90',
//   'R90',
//   'R90',
//   'R180',
//   'R180',
//   'L90',
//   'L90',
//   'L90',
//   'L90',
//   'L180',
//   'L180',
//   'R270',
//   'L270'
// ];


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

ship = input.reduce((ship, instruction) => {
  let xy;
  let deltaX;
  let deltaY;

  switch (instruction.action) {
    case 'N':
      waypoint.y += instruction.value;
      break;
    case 'S':
      waypoint.y -= instruction.value;
      break;
    case 'E':
      waypoint.x += instruction.value;
      break;
    case 'W':
      waypoint.x -= instruction.value;
      break;
    case 'R':
      deltaX = waypoint.x - ship.x;
      deltaY = waypoint.y - ship.y;

      waypoint.x = ship.x +
          (instruction.value == 180 ? deltaX : deltaY) *
          (instruction.value == 90 ? 1 : -1);
      waypoint.y = ship.y +
          (instruction.value == 180 ? deltaY : deltaX) *
          (instruction.value == 270 ? 1 : -1);
      break;
    case 'L':
      deltaX = waypoint.x - ship.x;
      deltaY = waypoint.y - ship.y;

      waypoint.x = ship.x +
          (instruction.value == 180 ? deltaX : deltaY) *
          (instruction.value == 270 ? 1 : -1);
      waypoint.y = ship.y +
          (instruction.value == 180 ? deltaY : deltaX) *
          (instruction.value == 90 ? 1 : -1);
      break;
    case 'F':
      deltaX = waypoint.x - ship.x;
      deltaY = waypoint.y - ship.y;

      waypoint.x += deltaX * instruction.value;
      waypoint.y += deltaY * instruction.value;

      ship.x += deltaX * instruction.value;
      ship.y += deltaY * instruction.value;
      break;
  }

  // console.log(instruction);
  // console.log('ship:', ship);
  // console.log('waypoint:', waypoint);

  return ship;
}, ship);

console.log(Math.abs(ship.x) + Math.abs(ship.y));
