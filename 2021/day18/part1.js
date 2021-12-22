/**
 * Solutions for Advent of Code 2021, Day 18, Part 1.
 * Original problem: https://adventofcode.com/2021/day/18
 */


let testInputs = [
  // Single Explode examples
  [
  	'[[[[[9,8],1],2],3],4]',
  	'[7,[6,[5,[4,[3,2]]]]]',
  	'[[6,[5,[4,[3,2]]]],1]',
  	'[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
  	'[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]'
  ],
  [
  	'[[[[4,3],4],4],[7,[[8,4],9]]]',
  	'[1,1]'
  ],
  [
		'[1,1]',
		'[2,2]',
		'[3,3]',
		'[4,4]'
  ],
  [
		'[[[0,[4,5]],[0,0]],[[[4,5],[2,6]],[9,5]]]',
		'[7,[[[3,7],[4,3]],[[6,3],[8,8]]]]',
		'[[2,[[0,8],[3,4]]],[[[6,7],1],[7,[1,6]]]]',
		'[[[[2,4],7],[6,[0,5]]],[[[6,8],[2,8]],[[2,1],[4,5]]]]',
		'[7,[5,[[3,8],[1,4]]]]',
		'[[2,[2,2]],[8,[8,1]]]',
		'[2,9]',
		'[1,[[[9,3],9],[[9,0],[0,7]]]]',
		'[[[5,[7,4]],7],1]',
		'[[[[4,2],2],6],[8,7]]'
  ],
  [
		'[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]',
		'[[[5,[2,8]],4],[5,[[9,9],0]]]',
		'[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]',
		'[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]',
		'[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]',
		'[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]',
		'[[[[5,4],[7,7]],8],[[8,3],8]]',
		'[[9,3],[[9,9],[6,[4,9]]]]',
		'[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]',
		'[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]'
  ],
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n'});

input = input.map(line => line.split('').map(char => (char == '[' || char == ']' || char == ',') ?
		char : parseInt(char, 10)));

let doFirstExplode = (n) => {
	let exploded = false;

	let depth = 0;
	for (let i = 1; i < n.length; i++) {
		if (n[i] === '[') {
			depth++;
		}	else if (n[i] === ']') {
			depth--;
		}

		if (depth === 4) {
			exploded = true;

			let leftNumber = n[i + 1];
			let rightNumber = n[i + 3];

			let nextLeftNumberIndex = -1;
			let nextRightNumberIndex = -1;

			for (let j = i; j >= 0; j--) {
				if (typeof n[j] === 'number') {
					nextLeftNumberIndex = j;
					break;
				}
			}
			for (let j = i + 4; j < n.length; j++) {
				if (typeof n[j] === 'number') {
					nextRightNumberIndex = j;
					break;
				}
			}

			if (nextLeftNumberIndex > -1) {
				n[nextLeftNumberIndex] += leftNumber;
			}

			if (nextRightNumberIndex > -1) {
				n[nextRightNumberIndex] += rightNumber;
			}

			n.splice(i, 5, 0);

			// console.dir({nextLeftNumberIndex, nextRightNumberIndex, leftNumber, rightNumber, n})
			break;
		}
	}

	return exploded;
}

let doFirstSplit = (n) => {
	let split = false;

	for (let i = 0; i < n.length; i++) {
		if (typeof n[i] === 'number' && n[i] > 9) {
			split = true;
			n.splice(i, 1, '[', Math.floor(n[i]/2), ',', Math.ceil(n[i]/2), ']')
			break;
		}
	}

	return split;
}

let addSnailfishNumbers = (n1, n2) => {
	result = [].concat('[', n1, ',', n2, ']');

	let actionTaken = false;
	do {
		actionTaken = doFirstExplode(result) || doFirstSplit(result);		
	} while(actionTaken);

	return result;
};

let calculateMagnitude = (n) => {
	if (typeof n === 'number') {
		return n;
	}

	return 3 * calculateMagnitude(n[0]) + 2 * calculateMagnitude(n[1]);
}

let sum = input.reduce((sum, next) => addSnailfishNumbers(sum, next));
let sumArray = JSON.parse(sum.join(''));
let answer = calculateMagnitude(sumArray);

console.dir({
	sum: sum.join(''),
	answer,
}, {depth: null, color: true});