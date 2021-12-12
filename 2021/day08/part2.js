/**
 * Solutions for Advent of Code 2021, Day 8, Part 2.
 * Original problem: https://adventofcode.com/2021/day/8
 */


let testInput = [
  'be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe',
  'edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc',
  'fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg',
  'fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb',
  'aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea',
  'fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb',
  'dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe',
  'bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef',
  'egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb',
  'gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(line => {
  parts = line.split(' | ');
  return {
    signalPatterns: parts[0].split(' '),
    outputValue: parts[1].split(' ')
  }
});

// let digitToNumSegments = {
//   0: 6,
//   1: 2,
//   2: 5,
//   3: 5,
//   4: 4,
//   5: 5,
//   6: 6,
//   7: 3,
//   8: 7,
//   9: 6,
// };

// let numSegmentsToDigits = {
//   2: [1],
//   3: [7],
//   4: [4],
//   5: [2, 3, 5],
//   6: [0, 6, 9],
//   7: [8]
// };

let segmentsToDigits = {
  'abcefg': 0,
  'cf': 1,
  'acdeg': 2,
  'acdfg': 3,
  'bcdf': 4,
  'abdfg': 5,
  'abdefg': 6,
  'acf': 7,
  'abcdefg': 8,
  'abcdfg': 9
};

// let segmentCountAcrossDigits = {
//   'a': 8,
//   'b': 6,  // unique
//   'c': 8,
//   'd': 7,
//   'e': 4,  // unique
//   'f': 9,  // unique
//   'g': 7
// };

let outputValueSum = input.reduce((outputValueSum, entry) => {
  let signalToSegment = [];
  let unmappedSignalsSet = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g']);

  // Identify b, e, f. Given that every digit appears once in the signal patterns if we count the
  // number of times each signal occurs 'e', 'b', and 'f' occur a unique number of times across the
  // ten patterns.
  let signalCounts = entry.signalPatterns.reduce((signalCounts, pattern) => {
    for (let char of pattern) {
      signalCounts[char] += 1;
    }
    return signalCounts;
  }, {
    'a': 0,
    'b': 0,
    'c': 0,
    'd': 0,
    'e': 0,
    'f': 0,
    'g': 0,
  });

  let mapSignalWithUniqueCount = (segment, uniqueSignalCount) => {
    let signalCountEntries = Object.entries(signalCounts);
    let entry = signalCountEntries.find(entry => entry[1] === uniqueSignalCount);
    signalToSegment[entry[0]] = segment;
    unmappedSignalsSet.delete(entry[0]);
  }

  mapSignalWithUniqueCount('e', 4);
  mapSignalWithUniqueCount('b', 6);
  mapSignalWithUniqueCount('f', 9);

  // Identify c, a, and d. Once we know b e and f, we can for each of these cases (in order) find
  // an indentifiable pattern in which the only unmapped signal is for a known segment.
  let findPatternWithUniqueSegmentCount = patternLength => entry.signalPatterns.find(pattern => pattern.length === patternLength);

  let mapUnmappedSignalToSegment = (segment, signalPattern) => {
    for (let char of signalPattern) {
      if (unmappedSignalsSet.has(char)) {
        signalToSegment[char] = segment;
        unmappedSignalsSet.delete(char);
      }
    }
  }

  mapUnmappedSignalToSegment('c', findPatternWithUniqueSegmentCount(2));
  mapUnmappedSignalToSegment('a', findPatternWithUniqueSegmentCount(3));
  mapUnmappedSignalToSegment('d', findPatternWithUniqueSegmentCount(4));

  // Identify 'g' as the last remaining unidentified segment
  let char = [...unmappedSignalsSet][0];
  signalToSegment[char] = 'g'
  unmappedSignalsSet.delete(char);

  // Calculate entry output value as a base 10 number.
  let entryOutputValue = entry.outputValue.reduce((sum, outputValue, currentIndex) => {
    let segments = [];
    for (let signal of outputValue) {
      segments.push(signalToSegment[signal]);
    }

    let digit = segmentsToDigits[segments.sort().join('')];

    // Processing digits from highest order to lowest.
    return sum * 10 + digit;
  }, 0);

  return outputValueSum + entryOutputValue;
}, 0);

console.log({
  // input,
  outputValueSum
});
