/**
 * Solutions for Advent of Code 2021, Day 15, Part 1.
 * Original problem: https://adventofcode.com/2021/day/15
 */


let testInputs = [
  [
    '1163751742',
    '1381373672',
    '2136511328',
    '3694931569',
    '7463417111',
    '1319128137',
    '1359912421',
    '3125421639',
    '1293138521',
    '2311944581',
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let riskLevelMatrix = input.map(line => line.split('').map(n => parseInt(n, 10)));

const HEIGHT = riskLevelMatrix.length;
const WIDTH = riskLevelMatrix[0].length;

let lowestCostMatrix = new Array(HEIGHT);
for (let i = 0; i < HEIGHT; i++) {
  lowestCostMatrix[i] = new Array(WIDTH).fill(Number.MAX_SAFE_INTEGER);
}
lowestCostMatrix[0][0] = 0;

let toSearchList = [[0,0]];

function checkPosition(y, x, currentRiskTotal, toSearchList) {
  if (y < 0 || x < 0 || y >= HEIGHT || x >= WIDTH ) return;

  // console.dir({
  //   y,
  //   x,
  //   currentRiskTotal,
  //   toSearchList,
  //   lowestCostMatrix
  // });
  nextRiskLevel = currentRiskTotal + riskLevelMatrix[y][x];
  if (nextRiskLevel < lowestCostMatrix[y][x]) {
    lowestCostMatrix[y][x] = nextRiskLevel;
    toSearchList.push([y, x]);
  }
}

while (toSearchList.length) {
  let index = toSearchList.reduce((bestIndex, candidate, index, arr) => {
    let [bestY, bestX] = arr[bestIndex];
    let [candidateY, candidateX] = candidate;

    return lowestCostMatrix[bestY][bestX] <= lowestCostMatrix[candidateY][candidateX] ?
        bestIndex : index;
  }, 0);
  let [[y, x]] = toSearchList.splice(index, 1);

  let currentRiskTotal = lowestCostMatrix[y][x];

  checkPosition(y - 1, x, currentRiskTotal, toSearchList);
  checkPosition(y + 1, x, currentRiskTotal, toSearchList);
  checkPosition(y, x - 1, currentRiskTotal, toSearchList);
  checkPosition(y, x + 1, currentRiskTotal, toSearchList);

  // console.log({
  //   y,
  //   x,
  //   toSearchList
  // });
}

console.dir({
  // riskLevelMatrix: riskLevelMatrix.map(line => JSON.stringify(line)),
  // lowestCostMatrix: lowestCostMatrix.map(line => JSON.stringify(line)),
  cost: lowestCostMatrix[HEIGHT - 1][WIDTH - 1]
})
