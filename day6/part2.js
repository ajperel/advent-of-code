let testInput = [
  'abc',
  'a\nb\nc',
  'ab\nac',
  'a\na\na\na',
  'b'
];

// let input = testInput;
let input = require('../lib/get-input').getInput({delimiter: '\n\n'});

let numAllYesAcrossGroups = input.reduce((numAllYesAcrossGroups, group) => {
  let perPersonAnswers = group.split('\n');

  let questionsEveryoneAnsweredYes = perPersonAnswers.reduce((intersection, answers, index) => {
    let splitAnswers = answers.split('');
    let answerSet = new Set(splitAnswers);

    return index == 0 ? 
        splitAnswers : intersection.filter(val => answerSet.has(val));
  }, []);

  return  numAllYesAcrossGroups + questionsEveryoneAnsweredYes.length;
}, 0);

console.log(numAllYesAcrossGroups);