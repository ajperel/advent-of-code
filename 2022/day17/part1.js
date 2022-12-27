/**
 * Solutions for Advent of Code 2022, Day 17, Part 1.
 * Original problem: https://adventofcode.com/2022/day/17
 */


let testInput = [
  '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let jetPatterns = input[0].split('').map(char => char === '<' ? -1 : 1);

// Chamber 7 units wide
// Don't move if can't move in a direction
// New rock bottom is 3 units above the highest rock in the room or floor if none (exclusive: something at 0, obj comes in at 4).

// Shapes in order.

// ####
const SHAPE_1 = Object.freeze([
  [0, 0, 2, 2, 2, 2, 0],
]);

// .#.
// ###
// .#.
const SHAPE_2 = Object.freeze([
  [0, 0, 0, 2, 0, 0, 0],
  [0, 0, 2, 2, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0]
]);

// ..#
// ..#
// ###
const SHAPE_3 = Object.freeze([
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 2, 2, 0, 0]
]);

// #
// #
// #
// #
const SHAPE_4 = Object.freeze([
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
  [0, 0, 2, 0, 0, 0, 0],
]);

// ##
// ##
const SHAPE_5 = Object.freeze([
  [0, 0, 2, 2, 0, 0, 0],
  [0, 0, 2, 2, 0, 0, 0]
]);

const SHAPES = Object.freeze([SHAPE_1, SHAPE_2, SHAPE_3, SHAPE_4, SHAPE_5]);

let cave = [];
let caveHeight = 0;

function moveShapeLR(jetDirection, caveSection) {
  let canMove = caveSection.every((row, i) => {
    return row.every((cell, j) => {
      if (cell === 2 & j === 0 && jetDirection === -1) return false;
      if (cell === 2 & j === (row.length - 1) && jetDirection === 1) return false;

      return cell !== 2 || row[j + jetDirection] != 1;
    });
  });

  if (canMove) {
    caveSection.forEach(row => {
      if (jetDirection === 1) {
        for (let i = row.length - 2; i >= 0; i--) {
          if (row[i] === 2) {
            row[i + jetDirection] = 2;
            row[i] = 0;
          }
        }
      } else {
        for (let i = 1; i < row.length; i++) {
          if (row[i] === 2) {
            row[i + jetDirection] = 2;
            row[i] = 0;
          }
        }
      }
    });
  }
  return canMove;
}

function moveShapeDown(caveSection) {
  let canMove = caveSection.every((row, i) => {
    return row.every((cell, j) => {
      // Not moving anything in the bottom row.
      if (i === 0) return true;
      return cell !== 2 || caveSection[i - 1][j] != 1;
    });
  });

  if (canMove) {
    for (let i = 1; i < caveSection.length; i++) {
      for (let j = 0; j < caveSection[0].length; j++) {
        if (caveSection[i][j] === 2) {
          caveSection[i - 1][j] = 2;
          caveSection[i][j] = 0;
        }
      }
    }
  }

  return canMove;
}

function settleShape(caveSection) {
  caveSection.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 2) {
        caveSection[i][j] = 1;
      }
    });
  });
}

let timeStep = 0;
for (let numRocksDropped = 0; numRocksDropped < 2022; numRocksDropped++) {
  // Drop a rock
  let addition = JSON.parse(JSON.stringify(SHAPES[numRocksDropped % 5])).concat(new Array(3).fill().map(() => new Array(7).fill(0)));
  // Setting 0 to be cave bottom.
  addition.reverse();
  let shapeHeight = SHAPES[numRocksDropped % 5].length;

  cave = cave.concat(addition);

  let newShapeBottom = caveHeight + 3;

  for (stillMoving = true; stillMoving; timeStep++) {
    let jetDirection = jetPatterns[timeStep % jetPatterns.length];

    moveShapeLR(jetDirection, cave.slice(newShapeBottom, newShapeBottom + shapeHeight));

    stillMoving = newShapeBottom === 0 ?
        false : moveShapeDown(cave.slice(newShapeBottom - 1, newShapeBottom + shapeHeight + 1));

    if (stillMoving) {
      newShapeBottom -= 1;
    } else {
      settleShape(cave.slice(newShapeBottom, newShapeBottom + shapeHeight));
    }
  }

  caveHeight = Math.max(caveHeight, newShapeBottom + shapeHeight);
  cave.length = caveHeight;
}

// cave.reverse();
// console.log(cave.map(row => row.join('')).join('\n'));
console.log(cave.length);
