/**
 * Solutions for Advent of Code 2020, Day 24, Part 2.
 * Original problem: https://adventofcode.com/2020/day/24
 */


let testInput = [
  'sesenwnenenewseeswwswswwnenewsewsw',
  'neeenesenwnwwswnenewnwwsewnenwseswesw',
  'seswneswswsenwwnwse',
  'nwnwneseeswswnenewneswwnewseswneseene',
  'swweswneswnenwsewnwneneseenw',
  'eesenwseswswnenwswnwnwsewwnwsene',
  'sewnenenenesenwsewnenwwwse',
  'wenwwweseeeweswwwnwwe',
  'wsweesenenewnwwnwsenewsenwwsesesenwne',
  'neeswseenwwswnwswswnw',
  'nenwswwsewswnenenewsenwsenwnesesenew',
  'enewnwewneswsewnwswenweswnenwsenwsw',
  'sweneswneswneneenwnewenewwneswswnese',
  'swwesenesewenwneswnwwneseswwne',
  'enesenwswwswneneswsenwnewswseenwsese',
  'wnwnesenesenenwwnenwsewesewsesesew',
  'nenewswnwewswnenesenwnesewesw',
  'eneswnwswnwsenenwnwnwwseeswneewsenese',
  'neswnwewnwnwseenwseesewsenwsweewe',
  'wseweeenwnesenwwwswnew',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let DIRECTION_REGEX = /^(ne|nw|se|sw|e|w)/;

let directionLists = input.map(line => {
  let remainingDirections = line;
  let list = [];

  while (remainingDirections.length > 0) {
    let [_, part] = DIRECTION_REGEX.exec(remainingDirections);
    list.push(part);
    remainingDirections = remainingDirections.substring(part.length);
  }

  return list;
});

// console.log(directionLists);

// Copied from Day 17.
function createEmptyNDimensionalSpace(sizes) {
  let space = new Array(sizes[0]);

  if (sizes.length == 1) {
    space.fill(0);
  } else {
    for (let i = 0; i < sizes[0]; i++) {
      space[i] = createEmptyNDimensionalSpace(sizes.slice(1));
    }
  }

  return space;
}

function growDimension(pocketDimension) {
  // Figure out the size of each axis in the pocket dimension.
  let sizes = [];
  let nextAxis = pocketDimension;
  do {
    sizes.push(nextAxis.length);
    nextAxis = nextAxis[0];
  } while (nextAxis && nextAxis.length > 0);

  // Need to account for Sizes growing!!
  function growNDimensionalSpace(space, sizes) {
    if (sizes.length === 1) {
      space.unshift(0);
      space.push(0);
      return [sizes[0] + 2];
    } else {
      let innerSizes = sizes.slice(1);

      let updatedInnerSize;
      // Do inner space
      for (let i = 0; i < sizes[0]; i++) {
        updatedInnerSize = growNDimensionalSpace(space[i], innerSizes);
      }

      space.unshift(createEmptyNDimensionalSpace(updatedInnerSize));
      space.push(createEmptyNDimensionalSpace(updatedInnerSize));

      return [sizes[0] + 2, ...updatedInnerSize];
    }
  }

  growNDimensionalSpace(pocketDimension, sizes);

  return pocketDimension;
}

let getKey = (x, y) => x + ',' + y;
let identifiedTilesFlipped = new Map();

directionLists.forEach(list => {
  let x = 0;
  let y = 0;

  list.forEach(instruction => {
    switch(instruction) {
      case 'nw':
        y += 1;
        x -= 1;
        break;
      case 'se':
        y -= 1;
        x += 1;
        break;
      case 'ne':
        y += 1;
        x += 1;
        break;
      case 'sw':
        y -= 1;
        x -= 1;
        break;
      case 'e':
        x += 2;
        break;
      case 'w':
        x -= 2;
        break;
    }
  });

  let key = getKey(x, y);
  if (identifiedTilesFlipped.has(key)) {
    identifiedTilesFlipped.set(key, !identifiedTilesFlipped.get(key));
  } else {
    identifiedTilesFlipped.set(key, true);
  }
});

let count = [...identifiedTilesFlipped.values()].reduce((acc, value) => acc + (value ? 1 : 0), 0);
console.log(count);

// For part 2 we'll store everything in an Array to make checking adjacent tiles easier.
// Figure out the bounds we need to start.
let acc = [...identifiedTilesFlipped.keys()].reduce((acc, key) => {
  let [x, y] = key.split(',');
  x = parseInt(x, 10);
  y = parseInt(y, 10);

  acc.minX = Math.min(x, acc.minX);
  acc.minY = Math.min(y, acc.minY);
  acc.maxX = Math.max(x, acc.maxX);
  acc.maxY = Math.max(y, acc.maxY);

  return acc;
}, {maxX: 0, minX: 0, maxY: 0, minY: 0});

let originX = 0;
let originY = 0;

console.log(acc);

if (acc.minX < 0) {
  // +2 expands the space in the negative direction for boundary checking.
  originX = Math.abs(acc.minX) + 2;
}
if (acc.minY < 0) {
  originY = Math.abs(acc.minY) + 2;
}

// +1 accounts for origin itself, +2 allows for boundary checks to work on the first round in the
// postive directions.
let sizeX = originX + acc.maxX + 3;
let sizeY = originY + acc.maxY + 3;

let floor = createEmptyNDimensionalSpace([sizeY, sizeX]);

for (const [key, value] of identifiedTilesFlipped) {
  let [x, y] = key.split(',');
  x = parseInt(x, 10) + originX;
  y = parseInt(y, 10) + originY;

  // console.dir({
  //   originX,
  //   originY,
  //   key,
  //   x,
  //   y
  // })
  floor[y][x] = value ? 1 : 0;
}

// floor.forEach(x => console.log(x.join(',')));

function countAdjacentBlackTiles(floor, y, x) {
  let count = 0;

  if (y + 1 < floor.length && x + 1 < floor[0].length) {
    count += floor[y + 1][x + 1];
  }

  if (y + 1 < floor.length && x - 1 >= 0) {
    count += floor[y + 1][x - 1];
  }


  if (y - 1 >= 0 && x + 1 < floor[0].length) {
    count += floor[y - 1][x + 1];
  }

  if (y - 1 >= 0 && x - 1 >= 0){
    count += floor[y - 1][x - 1];
  }

  if (x + 2 < floor[0].length) {
    count += floor[y][x + 2];
  }

  if (x - 2 >= 0) {
    count += floor[y][x - 2];
  }

  return count;
}

for (let i = 0; i < 100; i++) {
  let needsToGrow = false;
  floor = floor.map((row, y) => row.map((value, x) => {
    let numAdjacentBlack = countAdjacentBlackTiles(floor, y, x);
      // console.dir({
      //   y,
      //   x,
      //   val: floor[y][x],
      //   numAdjacentBlack
      // });

      let nextValue = value;

      if (value === 1 && (numAdjacentBlack === 0 || numAdjacentBlack > 2)) {
          // console.dir({
          //   y,
          //   x,
          //   val: value,
          //   numAdjacentBlack
          // });
          nextValue = 0;
      } else if (value === 0 && numAdjacentBlack == 2) {
          // console.dir({
          //   y,
          //   x,
          //   val: value,
          //   numAdjacentBlack
          // });
          nextValue = 1;
      }

      if (floor[y][x] == 1 && (
          y == 0 ||
          y == floor.length ||
          x == 0 ||
          x == 1 ||
          x == floor[0].length ||
          x == floor[0].length - 1)) {
        needsToGrow = true;
      }

      return nextValue;
  }));

  floor = growDimension(growDimension(floor));

  // floor.forEach(x => console.log(x.join(',')));

  let count = floor.reduce((acc, row) => acc + row.reduce((acc2, val) => acc2 + val, 0), 0);
  console.log('c:', count);
}

