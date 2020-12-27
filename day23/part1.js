/**
 * Solutions for Advent of Code 2020, Day 23, Part 1.
 * Original problem: https://adventofcode.com/2020/day/23
 */


let testInput = '389125467';

// let input = testInput;
let input = '315679824';

let cupCircle = input.split('').map(x => parseInt(x, 10));

let currentCupIndex = 0;
let currentCup;
let destinationCupIndex;
let destinationCup;
let pickedUpCups;

for (let i = 0; i < 100; i++) {
  // console.log('--- ', i + 1, ' ---');
  currentCup = cupCircle[currentCupIndex];

  // console.dir({
  //   cupCircle,
  //   currentCup
  // });

  // pick up next 3 cups
  let spliceStart = currentCupIndex + 1;
  let spliceEnd = currentCupIndex + 4;
  if (spliceStart + 3 <= cupCircle.length) {
    pickedUpCups = cupCircle.splice(spliceStart, 3);
  } else if (spliceStart >= cupCircle.length) {
    spliceStart = spliceStart % cupCircle.length;
    pickedUpCups = cupCircle.splice(spliceStart, 3);
  } else {
    let prespliceLength = cupCircle.length;
    let part1 = cupCircle.splice(spliceStart, prespliceLength - spliceStart);
    let part2 = cupCircle.splice(0, 3 - (prespliceLength - spliceStart));
    pickedUpCups = part1.concat(part2);
  }

  // find destination cup
  destinationCup = currentCup - 1;
  while (!cupCircle.includes(destinationCup)) {
    if (destinationCup == 0) {
      destinationCup = 9;
    } else {
      destinationCup -= 1;
    }
  }
  destinationCupIndex = cupCircle.findIndex(x => x === destinationCup);

  // console.dir({
  //   pickedUpCups,
  //   destinationCup
  // });

  // put picked up cups after destination
  cupCircle.splice(destinationCupIndex + 1, 0, ...pickedUpCups);

  // Pick new current cup.
  currentCupIndex = cupCircle.findIndex(x => x === currentCup);
  currentCupIndex += 1;
  if (currentCupIndex == cupCircle.length) {
    currentCupIndex = 0;
  }
}

console.log('final cups: ', cupCircle);

oneIndex = cupCircle.findIndex(x => x === 1);

let results = cupCircle.splice(oneIndex + 1, cupCircle.length - oneIndex).concat(cupCircle.slice(0, oneIndex)).join('');
console.log(results);
