// let testInput = [
//   'ecl:gry pid:860033327 eyr:2020 hcl:#fffffd',
//   'byr:1937 iyr:2017 cid:147 hgt:183cm',
//   '',
//   'iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884',
//   'hcl:#cfa07d byr:1929',
//   '',
//   'hcl:#ae17e1 iyr:2013',
//   'eyr:2024',
//   'ecl:brn pid:760753108 byr:1931',
//   'hgt:179cm',
//   '',
//   'hcl:#cfa07d eyr:2025 pid:166559648',
//   'iyr:2011 ecl:brn hgt:59in'
// ];
// 
// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let numValidPassports = 0;

for (let passport of input) {
  if (passport.includes('byr:') &&
      passport.includes('iyr:') &&
      passport.includes('eyr:') &&
      passport.includes('hgt:') &&
      passport.includes('hcl:') &&
      passport.includes('ecl:') &&
      passport.includes('pid:')) {
    numValidPassports++;
  }
}


console.log(numValidPassports);