/**
 * Solutions for Advent of Code 2022, Day 12, Part 1.
 * Original problem: https://adventofcode.com/2022/day/12
 */


let testInput = [
  'Sabqponm',
  'abcryxxl',
  'accszExk',
  'acctuvwj',
  'abdefghi'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

let startPoint;
let endPoint;

let map = input.map((line, rowI) => line.split('').map((c, colI) => {
  if (c === 'S') {
    startPoint = [colI, rowI];
    return 'a'.charCodeAt(0);
  }

  if (c === 'E') {
    endPoint = [colI, rowI];
    return 'z'.charCodeAt(0);
  }
  return c.charCodeAt(0);
}));

let mapWidth = map[0].length;
let mapHeight = map.length;

let distances = [...new Array(mapHeight)].map(() => new Array(mapWidth).fill(Number.MAX_SAFE_INTEGER));
distances[startPoint[1]][startPoint[0]] = 0;

let queue = [startPoint];

while (queue.length > 0) {
  let [x, y] = queue.shift();

  if (x === endPoint[1] && y === endPoint[0]) break;

  if (x != 0 && map[y][x - 1] <= map[y][x] + 1 && distances[y][x - 1] === Number.MAX_SAFE_INTEGER) {
    queue.push([x - 1, y]);
    distances[y][x - 1] = distances[y][x] + 1;
  }
  
  if (x != mapWidth - 1 && map[y][x + 1] <= map[y][x] + 1 && distances[y][x + 1] === Number.MAX_SAFE_INTEGER) {
    queue.push([x + 1, y]);
    distances[y][x + 1] = distances[y][x] + 1;
  }
  
  if (y != 0 && map[y - 1][x] <= map[y][x] + 1 && distances[y - 1][x] === Number.MAX_SAFE_INTEGER) {
    queue.push([x, y - 1]);
    distances[y - 1][x] = distances[y][x] + 1;
  }

  if (y != map.length - 1 && map[y + 1][x] <= map[y][x] + 1 && distances[y + 1][x] === Number.MAX_SAFE_INTEGER) {
    queue.push([x, y + 1]);
    distances[y + 1][x] = distances[y][x] + 1;
  }
}

console.dir({
  // input,
  // map,
  // distances,
  answer: distances[endPoint[1]][endPoint[0]]
}, {depth: null});

