/**
 * Solutions for Advent of Code 2020, Day 4, Part 2.
 * Original problem: https://adventofcode.com/2020/day/4
 */


 let invalidTestInput = [
  'eyr:1972 cid:100',
  'hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926',
  '',
  'iyr:2019',
  'hcl:#602927 eyr:1967 hgt:170cm',
  'ecl:grn pid:012533040 byr:1946',
  '',
  'hcl:dab227 iyr:2012',
  'ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277',
  '',
  'hgt:59cm ecl:zzz',
  'eyr:2038 hcl:74454a iyr:2023',
  'pid:3556412378 byr:2007'
];

let validTestInput = [
  'pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980',
  'hcl:#623a2f',
  '',
  'eyr:2029 ecl:blu cid:129 byr:1989',
  'iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm',
  '',
  'hcl:#888785',
  'hgt:164cm byr:2001 iyr:2015 cid:88',
  'pid:545766238 ecl:hzl',
  'eyr:2022',
  '',
  'iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719'
];

// let input = validTestInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

function isValidPassport(passport) {
  let birthYearRegex = /\bbyr:(\d{4})\b/m;
  let issueYearRegex = /\biyr:(\d{4})\b/m;
  let expirationYearRegex = /\beyr:(\d{4})\b/m;
  let heightRegex = /\bhgt:(\d{2,3})(in|cm)\b/m;
  let hairColorRegex = /\bhcl:#[0-9a-f]{6}\b/m;
  let eyeColorRegex = /\becl:(amb|blu|brn|gry|grn|hzl|oth)\b/m;
  let passportIdRegex = /\bpid:\d{9}\b/m;

  let match;

  match = birthYearRegex.exec(passport);
  if (!match || match[1] < 1920 || match[1] > 2002) return false;

  match = issueYearRegex.exec(passport);
  if (!match || match[1] < 2010 || match[1] > 2020) return false;

  match = expirationYearRegex.exec(passport);
  if (!match || match[1] < 2020 || match[1] > 2030) return false;

  match = heightRegex.exec(passport);
  if (!match || 
      (match[2] == 'cm' && (match[1] < 150 || match[1] > 193)) ||
      (match[2] == 'in' && (match[1] < 59 || match[1] > 76 ))) {
    return false;
  }

  if (!hairColorRegex.test(passport)) return false;
  if (!eyeColorRegex.test(passport)) return false;
  if (!passportIdRegex.test(passport)) return false;

  return true;
}

let numValidPassports = input.reduce(
    (numValid, passport) => {return isValidPassport(passport) ? ++numValid : numValid}, 0);

console.log(numValidPassports);
