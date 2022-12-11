/**
 * Solutions for Advent of Code 2022, Day 11, Part 2.
 * Original problem: https://adventofcode.com/2022/day/11
 */


let testInput = [
  'Monkey 0:\n' +
  '  Starting items: 79, 98\n' +
  '  Operation: new = old * 19\n' +
  '  Test: divisible by 23\n' +
  '    If true: throw to monkey 2\n' +
  '    If false: throw to monkey 3',
  'Monkey 1:\n' +
  '  Starting items: 54, 65, 75, 74\n' +
  '  Operation: new = old + 6\n' +
  '  Test: divisible by 19\n' +
  '    If true: throw to monkey 2\n' +
  '    If false: throw to monkey 0',
  'Monkey 2:\n' +
  '  Starting items: 79, 60, 97\n' +
  '  Operation: new = old * old\n' +
  '  Test: divisible by 13\n' +
  '    If true: throw to monkey 1\n' +
  '    If false: throw to monkey 3',
  'Monkey 3:\n' +
  '  Starting items: 74\n' +
  '  Operation: new = old + 3\n' +
  '  Test: divisible by 17\n' +
  '    If true: throw to monkey 0\n' +
  '    If false: throw to monkey 1'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n\n'});

class Monkey {
  constructor(num, startingItems, inspectionFn, testDivisor, trueMonkeyNum, falseMonkeyNum) {
    this.num = num;
    this.items = startingItems;
    this.inspect = inspectionFn;
    this.testDivisor = testDivisor;
    this.trueMonkeyNum = trueMonkeyNum;
    this.falseMonkeyNum = falseMonkeyNum;
    this.inspectedItemsTotal = 0;
  }

  static fromString(str) {
    let MONKEY_REGEX_OF_DOOM = /Monkey (?<monkeyNum>\d+):\s+Starting items: (?<startingItems>[0-9, ]+)\s+Operation: new = (?<inspectionFormula>old [+*] (?:old|\d+))\s+Test: divisible by (?<testDivisor>\d+)\s+If true: throw to monkey (?<trueMonkeyNum>\d+)\s+If false: throw to monkey (?<falseMonkeyNum>\d+)/;

    let result = MONKEY_REGEX_OF_DOOM.exec(str);
    
    let inspectionFn;
    eval(`inspectionFn = function(old) { return ${result.groups.inspectionFormula} }`);

    return new Monkey(
        parseInt(result.groups.monkeyNum, 10),
        result.groups.startingItems.split(', ').map(n => parseInt(n, 10)),
        inspectionFn,
        parseInt(result.groups.testDivisor, 10),
        parseInt(result.groups.trueMonkeyNum, 10),
        parseInt(result.groups.falseMonkeyNum, 10));
  }

  inspectAndThrowItems() {
    while (this.items.length > 0) {
      this.inspectedItemsTotal++;

      let item = this.items.shift();

      let worryLevel = this.inspect(item) % LCM;
      if (worryLevel % this.testDivisor === 0) {
        monkeys[this.trueMonkeyNum].catch(worryLevel);
      } else {
        monkeys[this.falseMonkeyNum].catch(worryLevel);
      }
    }
  }

  catch(item) {
    this.items.push(item);
  }
}

let monkeys = input.map(line => Monkey.fromString(line));
const LCM = monkeys.reduce((lcm, monkey) => lcm * monkey.testDivisor, 1);

for (let i = 0; i < 10000; i++) {
  monkeys.forEach(monkey => monkey.inspectAndThrowItems());  
}

let sortedTotals = monkeys.map(monkey => monkey.inspectedItemsTotal).sort((a, b) => b - a);
let answer = sortedTotals[0] * sortedTotals[1];

console.dir({
  // monkeys,
  // totals: monkeys.map(monkey => monkey.inspectedItemsTotal),
  answer
}, {depth: null});