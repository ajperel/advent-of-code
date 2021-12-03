/**
 * Solutions for Advent of Code 2020, Day 7, Part 2.
 * Original problem: https://adventofcode.com/2020/day/7
 */


let testInput = [
  'light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.',
];

let testInput2 = [
  'shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.',
];

// let input = testInput2;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let EXTRACT_BAG_REGEX = /( no other bags.|(?:\s?(?<count>\d) )?(?<color>.*?) bags?[.\s]?)/;

/**
 * A Map from a color of bags to an Array describing its contents where each entry is of the form:
 *    {'count': int, 'color': String}
 */
containsMap = new Map();

for (ruleSpec of input) {
  let parts = ruleSpec.split(/contain|,/);
  let ruleInfo = parts.
    filter(value => value != ' no other bags.').
    map((current) => {
    let match = EXTRACT_BAG_REGEX.exec(current);
    return {
      'count': parseInt(match.groups.count, 10),
      'color': match.groups.color
    }
  });

  let container = ruleInfo[0].color;
  let contained = ruleInfo.slice(1);

  containsMap.set(container, contained)
}

function countCountainedBags(color) {
  let bagsContained = 0;

  containsMap.get(color).forEach(rulePart => {
    bagsContained += rulePart.count + rulePart.count * countCountainedBags(rulePart.color);
  });

  return bagsContained;
}

console.log(countCountainedBags('shiny gold'));
