/**
 * Solutions for Advent of Code 2020, Day 7, Part 1.
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

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n'});

let EXTRACT_BAG_REGEX = /( no other bags.|(?:\s?(?<count>\d) )?(?<color>.*?) bags?[.\s]?)/;

// containsMap = new Map();

/** 
 * A Map from a color of bags to a Set of the colors of bags this color is found in.
 */
containedByMap = new Map();

for (ruleSpec of input) {
  let parts = ruleSpec.split(/contain|,/);

  let bagColors = parts.map((current) => EXTRACT_BAG_REGEX.exec(current).groups.color);
  let container = bagColors[0];
  let contained = bagColors.slice(1);

  contained.forEach((color) => {
    if (color) {
      containedByMap.has(color) ?
         containedByMap.get(color).add(container) : containedByMap.set(color, new Set([container]));
    }
  });
}

let containsShinyGold = new Set();
let toProcess = [...containedByMap.get('shiny gold')];

while (toProcess.length > 0) {
  let color = toProcess.pop();
  
  containsShinyGold.add(color);

  if (containedByMap.has(color)) {
    toProcess = toProcess.concat(...containedByMap.get(color));
  }
}

console.log(containsShinyGold.size);
