/**
 * Solutions for Advent of Code 2020, Day 24, Part 1.
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

let getKey = (x, y) => x + ',' + y;
let identifiedTilesFlipped = new Map();

directionLists.forEach(list => {
  let x = 0;
  let y = 0;

  list.forEach(instruction => {
    switch(instruction) {
      case 'nw':
        y += 1;
        x -= 0.5;
        break;
      case 'se':
        y -= 1;
        x += 0.5;
        break;
      case 'ne':
        y += 1;
        x += 0.5;
        break;
      case 'sw':
        y -= 1;
        x -= 0.5;
        break;
      case 'e':
        x += 1;
        break;
      case 'w':
        x -= 1;
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
