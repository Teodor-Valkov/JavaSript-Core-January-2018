// Task 1 - Print Array With Given Delimiter
//
function printArrayWithGivenDelimiter (input) {
  let delimiter = input.pop();
  let result = input.join(delimiter);

  console.log(result);
}

printArrayWithGivenDelimiter(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']);

// Task 1 - Print Array With Given Delimiter
//
function printArrayWithGivenDelimiter2 (input) {
  let delimiter = input[input.length - 1];
  let result = input.slice(0, input.length - 1).join(delimiter);

  console.log(result);
}

printArrayWithGivenDelimiter2(['How about no?', 'I', 'will', 'not', 'do', 'it!', '_']);

// Task 2 - Print Every N-th Element From Array
//
function printEveryNthElementFromArray (input) {
  let step = Number(input.pop());
  input = input.filter((element, index) => index % step === 0);

  console.log(input.join('\n'));
}

printEveryNthElementFromArray(['dsa', 'asd', 'test', 'tset', 2]);

// Task 2 - Print Every N-th Element From Array
//
function printEveryNthElementFromArray2 (input) {
  let step = Number(input.pop());

  for (let i = 0; i < input.length; i += step) {
    console.log(input[i]);
  }
}

printEveryNthElementFromArray2(['dsa', 'asd', 'test', 'tset', 2]);

// Task 3 - Add and Remove Elements From Array
//
function AddAndRemoveElementsFromArray (input) {
  let number = 1;
  let result = [];

  for (let line of input) {
    if (line === 'add') {
      result.push(number);
    } else if (line === 'remove') {
      result.pop();
    }

    number++;
  }

  if (result.length === 0) {
    console.log('Empty');
  } else {
    console.log(result.join('\n'));
  }
}

AddAndRemoveElementsFromArray(['add', 'add', 'remove', 'add', 'add']);

// Task 4 - Rotate Array
//
function rotateArray (input) {
  let rotations = Number(input.pop());
  rotations %= input.length;

  for (let i = 0; i < rotations; i++) {
    let number = input.pop();
    input.unshift(number);
  }

  console.log(input.join(' '));
}

rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', 15]);

// Task 5 - Extract Non-decreasing Subsequence From Array
//
function extractNonDecreasingSubsequenceFromArray (input) {
  let biggestNumber = Number.NEGATIVE_INFINITY;

  while (input.length !== 0) {
    let currentNumber = input.shift();

    if (currentNumber >= biggestNumber) {
      biggestNumber = currentNumber;
      console.log(currentNumber);
    }
  }
}

extractNonDecreasingSubsequenceFromArray([1, 3, 8, 4, 10, 12, 3, 2, 24]);

// Task 6 - Sort Array by Two Criteria
//
function sortArrayByTwoCriteria (input) {
  input.sort((a, b) => sortByLength(a, b));
  console.log(input.join('\n'));

  function sortByLength (a, b) {
    if (a.length === b.length) {
      return sortByName(a, b);
    }

    return a.length - b.length;
  }

  function sortByName (a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
}

sortArrayByTwoCriteria(['Deny', 'omen', 'test', 'Default']);

// Task 7 - Magic Matrices
//
function magicMatrices (input) {
  let firstRowSum = input[0].reduce((a, b) => a + b);
  let isMagic = true;

  for (let row = 1; row < input.length; row++) {
    let currentRowSum = input[row].reduce((a, b) => a + b);

    if (firstRowSum !== currentRowSum) {
      isMagic = false;
    }
  }

  for (let col = 0; col < input[0].length; col++) {
    let currentColSum = 0;

    for (let row = 0; row < input.length; row++) {
      currentColSum += input[row][col];
    }

    if (firstRowSum !== currentColSum) {
      isMagic = false;
    }
  }

  console.log(isMagic);
}

magicMatrices([[11, 32, 45], [21, 0, 1], [21, 1, 1]]);

// Task 8 - Spiral Matrix
//
function spiralMatrix (rows, cols) {
  let number = 1;
  let matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix.push([]);
  }

  let startRow = 0;
  let startCol = 0;
  let endRow = rows - 1;
  let endCol = cols - 1;

  while (startRow <= endRow || startCol <= endCol) {
    for (let col = startCol; col <= endCol; col++) {
      matrix[startRow][col] = number++;
    }

    for (let row = startRow + 1; row <= endRow; row++) {
      matrix[row][endCol] = number++;
    }

    for (let col = endCol - 1; col >= startCol; col--) {
      matrix[endRow][col] = number++;
    }

    for (let row = endRow - 1; row > startRow; row--) {
      matrix[row][startCol] = number++;
    }

    startRow++;
    startCol++;
    endRow--;
    endCol--;
  }

  console.log(matrix.map(row => row.join(' ')).join('\n'));
}

spiralMatrix(5, 5);

// Task 9 - Diagonal Attack
//
function diagonalAttack (input) {
  let matrix = input.map(line => line.split(' ').map(Number));
  let left = 0;
  let right = 0;

  for (let row = 0; row < matrix.length; row++) {
    left += matrix[row][row];
    right += matrix[row][matrix[row].length - row - 1];
  }

  if (left === right) {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix.length; col++) {
        if (row === col || row + col + 1 === matrix.length) {
          continue;
        }

        matrix[row][col] = left;
      }
    }
  }

  console.log(matrix.map(row => row.join(' ')).join('\n'));
}

diagonalAttack(['5 3 12 3 1', '11 4 23 2 5', '101 12 3 21 10', '1 4 5 2 2', '5 22 33 11 1']);

// Task 10 - Orbit
//
function orbit ([rows, cols, targetRow, targetCol]) {
  let matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix.push([]);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      matrix[row][col] = Math.max(Math.abs(row - targetRow), Math.abs(col - targetCol)) + 1;
    }
  }

  console.log(matrix.map(row => row.join(' ')).join('\n'));
}

orbit([5, 5, 2, 2]);
