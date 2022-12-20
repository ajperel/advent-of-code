/**
 * Solutions for Advent of Code 2022, Day 16, Part 2.
 * Original problem: https://adventofcode.com/2022/day/16
 */


let testInput = [
  'Valve AA has flow rate=0; tunnels lead to valves DD, II, BB',
  'Valve BB has flow rate=13; tunnels lead to valves CC, AA',
  'Valve CC has flow rate=2; tunnels lead to valves DD, BB',
  'Valve DD has flow rate=20; tunnels lead to valves CC, AA, EE',
  'Valve EE has flow rate=3; tunnels lead to valves FF, DD',
  'Valve FF has flow rate=0; tunnels lead to valves EE, GG',
  'Valve GG has flow rate=0; tunnels lead to valves FF, HH',
  'Valve HH has flow rate=22; tunnel leads to valve GG',
  'Valve II has flow rate=0; tunnels lead to valves AA, JJ',
  'Valve JJ has flow rate=21; tunnel leads to valve II'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

const INPUT_REGEX = /Valve (?<valve>[A-Z]+) has flow rate=(?<flowRate>\d+); tunnels? leads? to valves? (?<tunnelsTo>[A-Z, ]+)/;

let valves = input.reduce((acc, str) => {
  let match = INPUT_REGEX.exec(str);

  acc[match.groups.valve] = {
    valve: match.groups.valve,
    flowRate: parseInt(match.groups.flowRate),
    tunnelsTo: match.groups.tunnelsTo.split(', '),
    distances: {}
  }

  return acc;
}, {});

let valveIDs = Object.keys(valves);

// Calculate all shortest paths between valves
// https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
for (let i = 0; i < valveIDs.length; i++) {
  for (let j = 0; j < valveIDs.length; j++) {
    if (i === j) {
      valves[valveIDs[i]].distances[valveIDs[j]] = 0;
    } else if (valves[valveIDs[i]].tunnelsTo.includes(valveIDs[j])) {
      valves[valveIDs[i]].distances[valveIDs[j]] = 1;
    } else {
      valves[valveIDs[i]].distances[valveIDs[j]] = Number.MAX_SAFE_INTEGER;
    }
  }
}

for (let k = 0; k < valveIDs.length; k++) {
  for (let i = 0; i < valveIDs.length; i++) {
    for (let j = 0; j < valveIDs.length; j++) {
      if (valves[valveIDs[i]].distances[valveIDs[j]] > valves[valveIDs[i]].distances[valveIDs[k]]
          + valves[valveIDs[k]].distances[valveIDs[j]]) {
        valves[valveIDs[i]].distances[valveIDs[j]] = 
            valves[valveIDs[i]].distances[valveIDs[k]] + valves[valveIDs[k]].distances[valveIDs[j]];
      }
    }
  }
}

let initialOpenableValveIDs = valveIDs.filter(id => valves[id].flowRate > 0);

let queue = [{
  path: ['AA'],
  minutesToEruption: 26,
  totalPressureReleased: 0
}];
let allPaths = [];

while (queue.length != 0) {
  let pathInfo = queue.shift();
  let currentValveID = pathInfo.path[pathInfo.path.length - 1];

  let openableValveIDs = initialOpenableValveIDs.filter(id => !pathInfo.path.includes(id));

  let extendedPath = false;
  openableValveIDs.forEach(nextValveID => {
    let distance = valves[currentValveID].distances[nextValveID];
    if (distance + 1 < pathInfo.minutesToEruption) {
      queue.push({
        path: [...pathInfo.path, nextValveID],
        minutesToEruption: pathInfo.minutesToEruption - distance - 1,
        totalPressureReleased: pathInfo.totalPressureReleased + 
            valves[nextValveID].flowRate * (pathInfo.minutesToEruption - distance - 1)
      });
      extendedPath = true;
    }
  });

  allPaths.push(pathInfo);
}

let maxPressureReleased = 0;
for (let i = 0; i < allPaths.length; i++) {
  let hPath = allPaths[i];
  let hValves = new Set(hPath.path.slice(1));

  for (let j = i + 1; j < allPaths.length; j++) {
    let ePath = allPaths[j];
    // If the paths are unique
    if (ePath.path.every(id => !hValves.has(id))) {
      let pressureReleased = hPath.totalPressureReleased + ePath.totalPressureReleased;
      if (pressureReleased > maxPressureReleased) {
        maxPressureReleased = pressureReleased;
      }
    }
  }
}

console.dir({
  // valves,
  // initialOpenableValveIDs,
  // allPaths: allPaths.slice(0),
  maxPressureReleased
}, {depth: null});