// let testInput = [
//   '1-3 a: abcde',
//   '1-3 b: cdefg',
//   '2-9 c: ccccccccc'
// ];

// let input = testInput;
let input = require('../lib/get-input').getInput();

let inputMatcher = /(\d+)-(\d+)\s+([a-z]):\s+([a-z]+)/
let numValid = 0;

for (line of input) {
  let [_, minIndex, maxIndex, policyCharacter, password] = inputMatcher.exec(line);

  // Adjust for 1 based index.
  minIndex--;
  maxIndex--;

    if ((password[minIndex] == policyCharacter && password[maxIndex] != policyCharacter) ||
        (password[minIndex] != policyCharacter && password[maxIndex] == policyCharacter)) {
      numValid++;
    }
}

console.log(numValid);
