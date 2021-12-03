/**
 * Solutions for Advent of Code 2020, Day 22, Part 2.
 * Original problem: https://adventofcode.com/2020/day/22
 */


let testInput = [
  'Player 1:\n9\n2\n6\n3\n1',
  'Player 2:\n5\n8\n4\n7\n10',
];

// let testInput = [
//   'Player 1:\n43\n19',
//   'Player 2:\n2\n29\n14'
// ];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let deck1 = input[0].split('\n').slice(1).map(x => parseInt(x, 10));
let deck2 = input[1].split('\n').slice(1).map(x => parseInt(x, 10));

function decksEqual(deck1, deck2) {
  return deck1.every((val, index) => val == deck2[index]);
}

function recursiveCombat(deck1, deck2) {
  let deckHistory = [];

  while (deck1.length > 0 && deck2.length > 0) {
    // console.dir({
    //   deck1,
    //   deck2,
    //   // deckHistory,
    // });

    if (deckHistory.findIndex(([hdeck1, hdeck2]) =>
        (decksEqual(hdeck1, deck1) && decksEqual(hdeck2, deck2)) ||
        (decksEqual(hdeck1, deck2) && decksEqual(hdeck2, deck1))) > -1) {
      return 'deck1';
    }

    deckHistory.push([[...deck1], [...deck2]]);

    let card1 = deck1.shift();
    let card2 = deck2.shift();

    // console.dir({
    //   card1,
    //   card2
    // });

    let winner;

    // If both players have at least as many cards remaining in their deck as the value of the card
    // they just drew, the winner of the round is determined by playing a new game of Recursive
    // Combat (see below).
    if (card1 <= deck1.length && card2 <= deck2.length) {
      // console.log('recursiveCombat');
      winner = recursiveCombat(deck1.slice(0, card1), deck2.slice(0, card2));
      // console.log('recursiveCombat winner:', winner);
    }

    if (winner == 'deck1' || (!winner && card1 > card2)) {
      // console.log('deck1 winner', winner);
      deck1.push(card1);
      deck1.push(card2);
    } else if (winner == 'deck2' || (!winner && card2 > card1)) {
      // console.log('deck2 winner', winner);
      deck2.push(card2);
      deck2.push(card1);
    } else {
      throw Error('Cannot handle this');
    }
  }

  return deck1.length == 0 ? 'deck2' : 'deck1';
}

recursiveCombat(deck1, deck2);

let winningDeck = deck1.length == 0 ? deck2 : deck1;
let winningDeckLength = winningDeck.length;

let score = winningDeck.reduce((score, card, index) => score + card * (winningDeckLength - index), 0);

// 33361 is too high.
// 32154 is too low (also used the wrong rules for repeated history.)
console.dir({
  deck1,
  deck2,
  score
});
