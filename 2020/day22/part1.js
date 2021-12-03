/**
 * Solutions for Advent of Code 2020, Day 22, Part 1.
 * Original problem: https://adventofcode.com/2020/day/22
 */


let testInput = [
  'Player 1:\n9\n2\n6\n3\n1',
  'Player 2:\n5\n8\n4\n7\n10',
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let deck1 = input[0].split('\n').slice(1).map(x => parseInt(x, 10));
let deck2 = input[1].split('\n').slice(1).map(x => parseInt(x, 10));

while (deck1.length > 0 && deck2.length > 0) {
  let card1 = deck1.shift();
  let card2 = deck2.shift();

  if (card1 > card2) {
    deck1.push(card1);
    deck1.push(card2);
  } else if (card2 > card1) {
    deck2.push(card2);
    deck2.push(card1);
  } else {
    throw Error('Cannot handle this');
  }
}

let winningDeck = deck1.length == 0 ? deck2 : deck1;
let winningDeckLength = winningDeck.length;

let score = winningDeck.reduce((score, card, index) => score + card * (winningDeckLength - index), 0);

console.dir({
  deck1,
  deck2,
  score
});
