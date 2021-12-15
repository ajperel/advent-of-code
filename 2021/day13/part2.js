/**
 * Solutions for Advent of Code 2021, Day 13, Part 1.
 * Original problem: https://adventofcode.com/2021/day/13
 */


let testInputs = [
  [
    '6,10\n0,14\n9,10\n0,3\n10,4\n4,11\n6,0\n6,12\n4,1\n0,13\n10,12\n3,4\n3,0\n8,4\n1,10\n2,14\n8,10\n9,0',
    'fold along y=7\nfold along x=5'
  ]
];

const args = process.argv.slice(2);

let input = args[0] === 'test' ?
  testInputs[(parseInt(args[1], 10) - 1) || 0] : require('../lib/get-input').getInput({delimiter: '\n\n'});

let points = input[0].split('\n').map(str => {
  let [x, y] = str.split(',').map(n => parseInt(n, 10));
  return {x, y};
});

const INSTRUCTION_REGEX = /fold along (?<axis>x|y)=(?<index>\d+)/;

let instructions = input[1].split('\n').map(line => {
  let groups = INSTRUCTION_REGEX.exec(line).groups;

  return {
    axis: groups.axis,
    index: parseInt(groups.index, 10)
  }
});



// Create initial paper
function createPaper(points) {
  let [width, height] = points.reduce((dimensions, point) => {
    dimensions[0] = Math.max(dimensions[0], point.x + 1);
    dimensions[1] = Math.max(dimensions[1], point.y + 1);
    return dimensions;
  }, [0, 0]);

  let paper = new Array(height);
  for (let i = 0; i < height; i++) {
    paper[i] = new Array(width).fill(0);
  }

  points.forEach(({x, y}) => {
    paper[y][x] = 1;
  });

  return paper;
}

let paper = createPaper(points);

// Define operations
function foldUp(page, foldIndex) {
  let height = page.length;
  let width = page[0].length;

  let top = page.slice(0, foldIndex);
  let bottom = page.slice(foldIndex + 1).reverse();

  let newPage = [];

  if (top.height > bottom.height) {
    let extraHeight = top.height - bottom.height;
    newPage = top.slice(0, extraHeight);
    top = top.slice(extraHeight);
  } else if (bottom.height > top.height) {
    let extraHeight = bottom.height - top.height;
    newPage = bottom.slice(0, extraHeight);
    bottom = bottom.slice(extraHeight);
  }

  let baseHeight = newPage.length;
  for (let i = 0; i < top.length; i++) {
    newPage[i + baseHeight] = new Array(width);
    for (let j = 0; j < width; j++) {
        newPage[i + baseHeight][j] = top[i][j] | bottom[i][j];
    }
  }

  return newPage;
}

function foldLeft(page, foldIndex) {
  let height = page.length;
  let width = page[0].length;

  // Not sure these are right.
  let leftSize = foldIndex;
  let rightSize = width - foldIndex - 1;

  let newWidth = Math.max(leftSize, rightSize);
  let extraWidth = Math.abs(leftSize - rightSize);

  let newPage = new Array(height);
  page.forEach((row, i) => {
    let left = row.slice(0, foldIndex);
    let right = row.slice(foldIndex + 1).reverse();

    let newRow = [];

    if (leftSize > rightSize) {
      newRow = left.slice(0, extraWidth);
      left = left.slice(extraWidth);
    } else if (rightSize > leftSize) {
      newRow = right.slice(0, extraWidth);
      right = right.slice(extraWidth);
    }

    let baseWidth = newRow.length;
    for (let j = 0; j < left.length; j++) {
      newRow[j + baseWidth] = left[j] | right[j];
    }

    newPage[i] = newRow;
  });

  return newPage;
}

for (let i = 0; i < instructions.length; i ++) {
  let operation = instructions[i].axis === 'x' ? foldLeft : foldUp;
  paper = operation(paper, instructions[i].index);
}

console.log({
  points,
  instructions,
  width: paper[0].length,
  height: paper.length,
  paper: paper.map(n => n.map(m => m === 0 ? ' ' : m).join(' ')),
});
