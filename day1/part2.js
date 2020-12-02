let input = require('../lib/get-input').getInput();
let numbers = [];
for (let entry of input) {
  numbers.push(parseInt(entry, 10));
}

numbers.sort((a,b)=>a-b);

for (let i = 0;i < numbers.length - 3; i++) {
  for (let j = i + 1; j < numbers.length - 2; j++) {
  	if (numbers[i] + numbers[j] > 2020) {
	    break;
	  }

    for(let k = j + 1; k < numbers.length - 1; k++) {
      let sum = numbers[i] + numbers[j] + numbers[k];
      
      if (sum == 2020) {
        console.log('victory = ' + (numbers[i] * numbers[j] * numbers[k]));
      } else if (sum > 2020) {
        break;
      }
  	}
  }
}
