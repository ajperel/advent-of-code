/**
 * Solutions for Advent of Code 2022, Day 15, Part 2.
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

const MAX_XY = args[0] === 'test' ? 20 : 4000000;

for (let y = 0; y <= MAX_XY; y++) {
  const TARGET_Y = y;
  let ranges = [];
  data.forEach(({sensor, beacon, distance}) => {
    
    let deltaY = Math.abs(sensor.y - TARGET_Y);

    // Sensor is too far away to impact what beacons can be in this row.
    if (deltaY > distance) return;

    let remainingDistance = distance - deltaY;


    ranges.push([sensor.x - remainingDistance, sensor.x + remainingDistance]);
  });

  ranges = ranges.sort((a, b) => a[0] - b[0]);
  let lastEnd = ranges[0][1];
  for (let i = 1; i < ranges.length; i++) {
    if (lastEnd > MAX_XY) {
      break;
    }

    if (ranges[i][0] > lastEnd + 1 && (ranges[i][0] - 1 >= 0) &&  ranges[i][0] - 1 <= MAX_XY){
      console.dir({
        // ranges,
        // beaconX: ranges[i][0] - 1,
        // beaconY: y,
        answer: (ranges[i][0] - 1) * 4000000 + y
      });
      break;
    } else {
      if (ranges[i][1] > lastEnd) {
        lastEnd = ranges[i][1];
      }
    }
  }
}