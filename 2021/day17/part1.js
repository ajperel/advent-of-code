/**
 * Solutions for Advent of Code 2021, Day 17, Part 1.
 * Original problem: https://adventofcode.com/2021/day/17
 */


let testInputs = [
  [
    'target area: x=20..30, y=-10..-5'
  ],
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});


let TARGET_AREA_REGEX = /target area: x=(?<x1>-?\d+)\.\.(?<x2>-?\d+), y=(?<y1>-?\d+)..(?<y2>-?\d+)/;

let match = TARGET_AREA_REGEX.exec(input[0]);

let targetArea = {
  x1: parseInt(match.groups.x1, 10),
  x2: parseInt(match.groups.x2, 10),
  y1: parseInt(match.groups.y1, 10),
  y2: parseInt(match.groups.y2, 10)
};

let stepProbe = (position, velocity) => {
  position[0] += velocity[0];
  position[1] += velocity[1];

  if (velocity[0] != 0) {
    velocity[0] = velocity[0] > 0 ? velocity[0] - 1 : velocity[0] + 1;
  }
  velocity[1] -= 1;
};

let isProbeInTargetArea = (position) => {
  return position[0] >= targetArea.x1 &&
     position[0] <= targetArea.x2 &&
     position[1] >= targetArea.y1 &&
     position[1] <= targetArea.y2;
}

let isProbePastTargetArea = (position) => {
  return position[0] > targetArea.x2 || position[1] < targetArea.y1  
}

// x decreases by one every time so our max x distance is 1 + 2 + 3 + ... + n
// = (n * (n + 1))/2 = distance
// n^2 + n - 2*distance = 0
// We can use the quadratic equation to find the smallest n that will at least reach our target
// area.
let minX = Math.ceil(-1 * Math.sqrt(1 + 8 * targetArea.x1))/2;
let maxX = targetArea.x2

// Positive starting y velocity is similar to -(y+1) in terms of areas hit
// The highest velocity you could ever start with is the one that reaches the far area
// of your target position in one step
let minY = targetArea.y1;
let maxY = -(targetArea.y1 - 1);

let highestSuccessfulY = -Infinity;
for (let x = minX; x <= maxX; x++) {
  for (let y = minY; y <= maxY; y++) {
    let position = [0, 0];
    let velocity = [x, y];
    let highestY = -Infinity;

    while (!isProbePastTargetArea(position)) {
      stepProbe(position, velocity);
      highestY = Math.max(highestY, position[1]);

      if (isProbeInTargetArea(position)) {
        highestSuccessfulY = Math.max(highestSuccessfulY, highestY);
        break;
      }    

    }

  }
} 

console.dir({
  targetArea,
  minX,
  maxX,
  minY,
  maxY,
  highestSuccessfulY
});