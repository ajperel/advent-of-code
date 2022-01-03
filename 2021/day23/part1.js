/**
 * Solutions for Advent of Code 2021, Day 23, Part 1.
 * Original problem: https://adventofcode.com/2021/day/23
 *
 * Pair programmed with jdoozer.
 */


let testInputs = [
  [
    '#############',
    '#...........#',
    '###B#C#B#D###',
    '  #A#D#C#A#  ',
    '  #########  '
  ],
  // Joanna
  [
    '#############',
    '#...........#',
    '###D#B#A#C###',
    '  #B#D#A#C#  ',
    '  #########  '
  ],
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

let INPUT_REGEX = /[# ]+([ABCD])#([ABCD])#([ABCD])#([ABCD]).*/;

let match1 = INPUT_REGEX.exec(input[2]);
let match2 = INPUT_REGEX.exec(input[3]);

let initialPositions = [
  { type: match1[1], position: [2, 1] },
  { type: match1[2], position: [4, 1] },
  { type: match1[3], position: [6, 1] },
  { type: match1[4], position: [8, 1] },
  { type: match2[1], position: [2, 2] },
  { type: match2[2], position: [4, 2] },
  { type: match2[3], position: [6, 2] },
  { type: match2[4], position: [8, 2] },
];

let energyCostMap = {
  'A': 1,
  'B': 10,
  'C': 100,
  'D': 1000,
};

let destinationX = {
  'A': 2,
  'B': 4,
  'C': 6,
  'D': 8
};

let possiblePositions = [
  [0, 0],
  [1, 0],
  [3, 0],
  [5, 0],
  [7, 0],
  [9, 0],
  [10, 0],
  [2, 1],
  [4, 1],
  [6, 1],
  [8, 1],
  [2, 2],
  [4, 2],
  [6, 2],
  [8, 2]
];

let isWinningState = ({positions}) => {
  // console.dir({positions});
  return positions.every(({type, position}) => position[0] === destinationX[type]);
};

let isBetween = (num, range) => {
  return num >= Math.min(...range) && num <= Math.max(...range);
};

let statesEqual = (state1, state2) => {
  if (state1.energyCost != state2.energyCost) {
    return false;
  }

  for (let i = 0; i < state1.positions.length; i++) {
    if (state1.positions[i].type != state2.positions[i].type ||
        state1.positions[i].position[0] !== state2.positions[i].position[0] ||
        state1.positions[i].position[1] !== state2.positions[i].position[1]) {
      return false;
    }
  }

  return true;
};

let getPossibleNextStates = ({energyCost, positions}) => {
  let openPositions = possiblePositions.filter(([x, y]) => {
    return !positions.some(({position: [x1, y1]}) => x == x1 && y == y1);
  });

  let nextStates = [];

  for (let i = 0; i < positions.length; i++) {
    let {type, position} = positions[i];

    let constantPositions = positions.filter((_, index) => i != index);

    // If you're in your final position, there are no next possible positions.
    if (position[0] === destinationX[type] &&
       (position[1] === 2 ||
        constantPositions.some(({type: t1, position: p1}) =>
            t1 === type && p1[1] === 2 && p1[0] === position[0]))) {
      continue;
    }

    // If we're in a room but blocked by someone else we have no possible moves.
    if (position[1] === 2 && constantPositions.some(({position: p1}) => position[0] == p1[0])) {
      continue;
    }

    let reachablePositions = openPositions.filter(([x, y]) => {
      const hasBlocker = constantPositions.some(({ position: p1 }) => (
        p1[1] === 0 && isBetween(p1[0], [x, position[0]])
      ));
      const isWrongRoom = (y > 0) && destinationX[type] !== x;
      const isRoomBlocked = x === destinationX[type] &&
        constantPositions.some(({type: t1, position: p1}) =>
            p1[0] === x && p1[1] === 2 && type != t1);
      const stayInHallway = position[1] === 0 && y === 0;
      return !(hasBlocker || isWrongRoom || stayInHallway || isRoomBlocked);
    });

    let reachableGoal = reachablePositions.find(([x, y]) => {
      return x === destinationX[type] &&
          constantPositions.every(({type: t1, position: p1}) =>
              p1[0] != x || t1 === type);
    });

    if (reachableGoal) {
      reachablePositions = [reachableGoal];
    }

    const nextStatesForAmphipod = reachablePositions.map(reachablePosition => {
      let numSteps = Math.abs(position[0] - reachablePosition[0]) +
          Math.abs(position[1]) +
          Math.abs(reachablePosition[1]);

      let energyDelta = numSteps * energyCostMap[type];

      let newPositions = [...constantPositions, {type, position: reachablePosition}];
      newPositions.sort((a, b) => {
        if (a.type === b.type) {
          return (a.position[0] - b.position[0]) || (a.position[1] - b.position[1]);
        }
        return (a.type > b.type) ? 1 : -1;
      })

      return {
        energyCost: energyCost + energyDelta,
        positions: newPositions
      }
    });

    if (reachableGoal) {
      nextStates = nextStatesForAmphipod;
      break;
    } else {
      nextStates.push(...nextStatesForAmphipod);
    }
  };

  return nextStates;
}

let stateList = [{
  energyCost: 0,
  positions: initialPositions
}];

let winner;
let runs = 0;
while (stateList.length > 0 && !winner) {

  let stateIndex = stateList.reduce((bestIndex, candidate, index, arr) => {
    return arr[bestIndex].energyCost < candidate.energyCost ? bestIndex : index;
  }, 0);
  let state = stateList.splice(stateIndex, 1)[0];

  if (isWinningState(state)) {
    winner = state;
    break;
  }

  console.log('runs:', ++runs, 'energyCost:', state.energyCost, stateList.length);

  let nextStates = getPossibleNextStates(state);

  for (let nextState of nextStates) {
    if (!stateList.some(s => statesEqual(s, nextState))) {
      stateList.push(nextState);
    }
  }
}

console.dir({
  winner
}, {depth: null});
