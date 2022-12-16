/**
 * Solutions for Advent of Code 2022, Day 15, Part 1.
 * Original problem: https://adventofcode.com/2022/day/15
 */


let testInput = [
  'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
  'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
  'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
  'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
  'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
  'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
  'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
  'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
  'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
  'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
  'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
  'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
  'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
  'Sensor at x=20, y=1: closest beacon is at x=15, y=3'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let INPUT_REGEX = /Sensor at x=(?<sensorX>-?\d+), y=(?<sensorY>-?\d+): closest beacon is at x=(?<beaconX>-?\d+), y=(?<beaconY>-?\d+)/;

let data = input.map(line => {
  let match = INPUT_REGEX.exec(line);

  return {
    sensor: {x: parseInt(match.groups.sensorX, 10), y: parseInt(match.groups.sensorY, 10)},
    beacon: {x: parseInt(match.groups.beaconX, 10), y: parseInt(match.groups.beaconY, 10)},
    distance: Math.abs(match.groups.sensorX - match.groups.beaconX) + Math.abs(match.groups.sensorY - match.groups.beaconY)
  };
});


const TARGET_Y = args[0] === 'test' ? 10 : 2000000;

let noBeaconSpaces = new Set();
data.forEach(({sensor, beacon, distance}) => {
  
  let deltaY = Math.abs(sensor.y - TARGET_Y);

  // Sensor is too far away to impact what beacons can be in this row.
  if (deltaY > distance) return;

  let remainingDistance = distance - deltaY;

  for (let i = sensor.x - remainingDistance; i <= sensor.x + remainingDistance; i++) {
    if (i === beacon.x && beacon.y === TARGET_Y) continue;
    noBeaconSpaces.add(`${i},${TARGET_Y}`);
  }
});

console.dir({
  // data,
  // noBeaconSpaces: [...noBeaconSpaces].sort((a, b) => parseInt(a.split(',')[0] - parseInt(b.split(',')[0]))),
  answer: noBeaconSpaces.size
}, {depth: null});

