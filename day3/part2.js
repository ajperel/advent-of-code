// let testInput = [
//   '..##.......',
//   '#...#...#..',
//   '.#....#..#.',
//   '..#.#...#.#',
//   '.#...##..#.',
//   '..#.##.....',
//   '.#.#.#....#',
//   '.#........#',
//   '#.##...#...',
//   '#...##....#',
//   '.#..#...#.#'
// ];
//
// let input = testInput;
let input = require('../lib/get-input').getInput();

let height = input.length;
let width = input[0].length;

function computeNumTrees(right, down) {
  let position = 0;
  let numTrees = 0;

  for (let i = 0; i < height; i += down) {
    if (input[i][position] == '#') {
      numTrees++;
    }
    position = (position + right) % width;
  }

  return numTrees;
}

let run1 = computeNumTrees(1, 1);
let run2 = computeNumTrees(3, 1);
let run3 = computeNumTrees(5, 1);
let run4 = computeNumTrees(7, 1);
let run5 = computeNumTrees(1, 2);

console.log(run1 * run2 * run3 * run4 * run5);