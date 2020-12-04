const fs = require('fs');
const path = require('path');

/**
 * Returns the contents of 'input.txt' in the current directly as an array of strings one per line
 * of the file.
 */
function getInput({delimiter = '\n'} = {}) {
  const currentDirectory = path.dirname(module.parent.filename);
  let inputFileName = path.resolve(currentDirectory, 'input.txt');

  let fileArray = fs.readFileSync(inputFileName).toString().trim().split(delimiter);

  return fileArray;
}

module.exports.getInput = getInput;