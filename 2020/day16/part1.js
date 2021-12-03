/**
 * Solutions for Advent of Code 2020, Day 16, Part 1.
 * Original problem: https://adventofcode.com/2020/day/16
 */

let testInput = [
  'class: 1-3 or 5-7\nrow: 6-11 or 33-44\nseat: 13-40 or 45-50',
  'your ticket:\n7,1,14',
  'nearby tickets:\n7,3,47\n40,4,50\n55,2,20\n38,6,12',
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});


let ruleRegex = /(\w+): (\d+)-(\d+) or (\d+)-(\d+)/;

let rules = input[0].split('\n').reduce((allRules, rule) => {
  let [_, ruleName, ...ranges] = ruleRegex.exec(rule);

  allRules[ruleName] = ranges.map(value => parseInt(value, 10));

  return allRules;
}, {});

let myTicket = input[1].split('\n')[1].split(',').map(val => parseInt(val, 10));

let nearbyTickets = input[2].split('\n').slice(1).map(val => val.split(',').map(v => parseInt(v, 10)));

let scanningErrorRate = nearbyTickets.reduce((errorRate, ticket) => {
  return errorRate + ticket.reduce((errorRateInTicket, field) => {
      return errorRateInTicket +
          (Object.values(rules).some(rule => (field >= rule[0] && field <= rule[1]) || (field >= rule[2] && field <= rule[3])) ? 0 : field);
  }, 0);
}, 0);

// console.log(rules);
// console.log(myTicket);
// console.log(nearbyTickets);

console.log(scanningErrorRate);


