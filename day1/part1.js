let input = require('../lib/get-input').getInput();
let numbers = [];
for (let entry of input) {
  numbers.push(parseInt(entry, 10));
}

numbers.sort((a,b)=>a-b);

for (let i = 0;i < numbers.length - 2; i++) {
  for (let j = i + 1; j < numbers.length - 1; j++) {
    let sum = numbers[i] + numbers[j];
    
    if (sum == 2020) {
      console.log('victory = ' + (numbers[i] * numbers[j]));
    } else if (sum > 2020) {
      break;
    }
  }
}
