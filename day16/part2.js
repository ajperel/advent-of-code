/**
 * Solutions for Advent of Code 2020, Day 16, Part 2.
 * Original problem: https://adventofcode.com/2020/day/16
 */


let testInput = [
  'class: 0-1 or 4-19\nrow: 0-5 or 8-19\nseat: 0-13 or 16-19',
  'your ticket:\n11,12,13',
  'nearby tickets:\n3,9,18\n15,1,5\n5,14,9',
];


// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});


let ruleRegex = /([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)/;

let rules = input[0].split('\n').reduce((allRules, rule) => {
  let [_, ruleName, ...ranges] = ruleRegex.exec(rule);

  allRules[ruleName] = ranges.map(value => parseInt(value, 10));

  return allRules;
}, {});

let myTicket = input[1].split('\n')[1].split(',').map(val => parseInt(val, 10));
let numFields = myTicket.length;

let nearbyTickets = input[2].split('\n').slice(1).map(val => val.split(',').map(v => parseInt(v, 10)));

let validNearbyTickets = nearbyTickets.filter(ticket => ticket.every(
  field => Object.values(rules).some(rule => (field >= rule[0] && field <= rule[1]) || (field >= rule[2] && field <= rule[3]))));

// Object mapping from field index to all field values for that index across all tickets.
let fieldIndexToAllValues = [];
for (let i = 0; i < numFields; i++) {
  fieldIndexToAllValues[i] = [];
  for (let j = 0; j < validNearbyTickets.length; j++) {
    fieldIndexToAllValues[i][j] = validNearbyTickets[j][i];
  }
}

// Create a map from a fieldName to all possible valid fieldIndicies for that field.
let fieldNameToPossibleIndexMap = new Map();
fieldIndexToAllValues.forEach((fieldValues, fieldIndex) => {
  for (let fieldName of Object.keys(rules)) {
    let rule = rules[fieldName];
    // Is every fieldValue at fieldIndex valid for fieldName.
    let isMatch = fieldValues.every(
        value => (value >= rule[0] && value <= rule[1]) || (value >= rule[2] && value <= rule[3]));

    if (isMatch) {
      if (!fieldNameToPossibleIndexMap.has(fieldName)) {
        fieldNameToPossibleIndexMap.set(fieldName, new Set());
      }

      fieldNameToPossibleIndexMap.get(fieldName).add(fieldIndex);
    }
  }
});

// Create a map from fieldName to index on ticket.
//
// Because there is only one possible solution, while the field values at a particular field index
// may be valid for multiple fields, there will be one set of values that is only valid for one
// field. Find that field name & index pair. Then remove that index as a possible field index for
// all other fields. Now a new one will have one one option. Repeat for each field.
let fieldNameToIndexMap = new Map();
for (let i = 0; i < numFields; i++) {
  let fieldIndex;
  // Find the field that can only be one thing.
  for (let [fieldName, possibleIndicies] of fieldNameToPossibleIndexMap) {
    if (possibleIndicies.size === 1) {
      fieldIndex = Array.from(possibleIndicies)[0];
      fieldNameToIndexMap.set(fieldName, fieldIndex);
      fieldNameToPossibleIndexMap.delete(fieldName);

      break;
    }
  }

  // After finding it, delete it's field index from the possibilities of all remaining unknown
  // fields.
  for (let values of fieldNameToPossibleIndexMap.values()) {
    values.delete(fieldIndex);
  }
}

let productOfDepartureFields = 1;
fieldNameToIndexMap.forEach((index, fieldName) => {
  if (fieldName.startsWith('departure')) {
    productOfDepartureFields *= myTicket[index];
  }
});

// console.log(rules);
// console.log(myTicket);
// console.log(nearbyTickets);
// console.log(validNearbyTickets);
// console.log(fieldIndexToAllValues);
// console.log(fieldNameToPossibleIndexMap);
// console.log(fieldNameToIndexMap);
console.log(productOfDepartureFields);
