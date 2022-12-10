/**
 * Solutions for Advent of Code 2022, Day 7, Part 1.
 * Original problem: https://adventofcode.com/2022/day/7
 */


let testInput = [
	'$ cd /',
	'$ ls',
	'dir a',
	'14848514 b.txt',
	'8504156 c.dat',
	'dir d',
	'$ cd a',
	'$ ls',
	'dir e',
	'29116 f',
	'2557 g',
	'62596 h.lst',
	'$ cd e',
	'$ ls',
	'584 i',
	'$ cd ..',
	'$ cd ..',
	'$ cd d',
	'$ ls',
	'4060174 j',
	'8033020 d.log',
	'5626152 d.ext',
	'7214296 k'
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
    testInput : require('../lib/get-input').getInput({delimiter: '\n'});

const CD_REGEX = /\$ cd (.*)/;
const LS_REGEX = /\$ ls/;
const FILE_REGEX = /(\d+) (.*)/;

let root = {};
let currentDir = root;

input.forEach(line => {
	let cdResult = CD_REGEX.exec(line);
	if (cdResult) {
		let dirName = cdResult[1];

		if (dirName == '..') {
			currentDir = currentDir.parent;
		} else {
			let dir = {
				'type': 'dir',
				'name': dirName,
				'parent': currentDir
			};

			currentDir[dirName] = dir;
			currentDir = dir;	
		}
		return;
	}

	let fileResult = FILE_REGEX.exec(line);
	if (fileResult) {
		let file = {
			'name': fileResult[2],
			'size': parseInt(fileResult[1], 10)
		};
		currentDir[file.name] = file;
	}
	
	return;
});

let addDirectorySize = function(dir) {
	let size = 0;

	for (const [name, value] of Object.entries(dir)) {
		if (name !== 'parent' && typeof value === 'object') {
			if (!value.size) {
				addDirectorySize(value);
			}
			size += value.size;	
		}
	}
	dir.size = size;
};

addDirectorySize(root);

let sumSmallSizes = function(dir) {
	let sum = 0;

	if (dir.size <= 100000) {
		sum += dir.size;
	}

  for (const [name, value] of Object.entries(dir)) {
		if (name !== 'parent' && typeof value === 'object' && value['type'] === 'dir') {
			sum += sumSmallSizes(value);
		}
	}

	return sum;
}

console.dir({
	// root, 
	answer: sumSmallSizes(root)
}, {depth: null});
