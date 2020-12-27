/**
 * Solutions for Advent of Code 2020, Day 23, Part 2.
 * Original problem: https://adventofcode.com/2020/day/23
 */


let testInput = '389125467';

// let input = testInput;
let input = '315679824';


let firstNumbers = input.split('').map(x => parseInt(x, 10));

const MAX_CUP = 1000000;
// const MAX_CUP = firstNumbers.length;

// Construct circle as "linked list" / map from current number to next number.
let cupCirclePointers = new Map();
for (let i = 0; i < firstNumbers.length - 1; i++) {
  cupCirclePointers.set(firstNumbers[i], firstNumbers[i + 1]);
}
cupCirclePointers.set(firstNumbers[firstNumbers.length - 1], firstNumbers.length + 1);

for (let i = firstNumbers.length + 1; i < MAX_CUP; i++) {
  cupCirclePointers.set(i, i + 1);
}

if (MAX_CUP == firstNumbers.length) {
  cupCirclePointers.set(firstNumbers[firstNumbers.length - 1], firstNumbers[0]);
} else {
  cupCirclePointers.set(MAX_CUP, firstNumbers[0]);
}


let currentCup = firstNumbers[0];

// console.log('cupCirclePointers size: ', cupCirclePointers.size);
// console.log(cupCirclePointers.get(7));
// console.log(cupCirclePointers.get(10));
// console.log(cupCirclePointers.get(1000000));

for (let i = 0; i < 10000000; i++) {
  // console.log('--- ', i + 1, ' ---');

  // console.dir({
  //   cupCirclePointers,
  //   currentCup
  // });

  let pickedUpCups = [cupCirclePointers.get(currentCup)];
  for (let j = 0; j < 2; j++) {
    pickedUpCups.push(cupCirclePointers.get(pickedUpCups[pickedUpCups.length - 1]))
  }

  let destinationCup = currentCup - 1;
  while (pickedUpCups.indexOf(destinationCup) > -1 || destinationCup === 0) {
    if (destinationCup === 0){
      destinationCup = MAX_CUP;
    } else {
      destinationCup -= 1;
    }
  }

  // console.dir({
  //   pickedUpCups,
  //   destinationCup
  // });

  // DO THE SPLICE
  let afterDestination = cupCirclePointers.get(destinationCup);
  let lastPickedUpCup = pickedUpCups[pickedUpCups.length - 1];
  let afterLastPickedUpCup = cupCirclePointers.get(lastPickedUpCup);

  cupCirclePointers.set(destinationCup, pickedUpCups[0]);
  cupCirclePointers.set(lastPickedUpCup, afterDestination);
  cupCirclePointers.set(currentCup, afterLastPickedUpCup);

  currentCup = afterLastPickedUpCup;
}

console.dir({
  after1: cupCirclePointers.get(1),
  afterAfter1: cupCirclePointers.get(cupCirclePointers.get(1)),
  product: cupCirclePointers.get(1) * cupCirclePointers.get(cupCirclePointers.get(1)),
});
