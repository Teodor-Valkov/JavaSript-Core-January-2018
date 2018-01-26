// Task 1 - Sum First Last
//
function sumFirstLast (input) {
  let firstNumber = Number(input[0]);
  let lastNumber = Number(input[input.length - 1]);
  let result = firstNumber + lastNumber;

  console.log(result);
}

sumFirstLast(['20', '30', '40']);

// Task 2 - Even Position Element
//
function evenPositionElement (input) {
  let numbers = input
    .filter((number, index) => index % 2 === 0)
    .join(' ');

  console.log(numbers);
}

evenPositionElement(['20', '30', '40']);

// Task 3 - Negative or Positive Numbers
//
function negativeOrPositiveNumbers (input) {
  let result = [];

  for (let number of input) {
    if (number < 0) {
      result.unshift(number);
    } else {
      result.push(number);
    }
  }

  console.log(result.join('\n'));
}

negativeOrPositiveNumbers([3, -2, 0, -1]);

// Task 4 - First and Last K Numbers
//
function firstAndLastKNumbers (input) {
  let count = input.shift();

  console.log(input.slice(0, count).join(' '));
  console.log(input.slice(input.length - count, input.length).join(' '));
}

firstAndLastKNumbers([3, 6, 7, 8, 9]);

// Task 5 - Last K Numbers Sequence
//
function lastKNumbersSequence (number, step) {
  let result = [1];

  for (let i = 1; i < number; i++) {
    let start = Math.max(0, i - step);
    let item = result.slice(start, start + step).reduce((a, b) => a + b);

    result.push(item);
  }

  console.log(result.join(' '));
}

lastKNumbersSequence(8, 2);

// Task 5 - Last K Numbers Sequence
//
function lastKNumbersSequence2 (number, step) {
  let result = [1];

  for (let i = 1; i < number; i++) {
    let start = Math.max(0, i - step);
    let end = i - 1;
    let sum = 0;

    for (let j = start; j <= end; j++) {
      sum += result[j];
    }

    result[i] = sum;
  }

  return result.join(' ');
}

lastKNumbersSequence2(8, 2);

// Task 6 - Process Odd Numbers
//
function processOddNumbers (input) {
  let numbers = input
    .filter((number, index) => index % 2 !== 0)
    .map(number => number * 2)
    .reverse()
    .join(' ');

  console.log(numbers);
}

processOddNumbers([3, 0, 10, 4, 7, 3]);

// Task 7 - Smallest Two Numbers
//
function smallestTwoNumbers (input) {
  let numbers = input
    .sort((a, b) => a - b)
    .slice(0, 2)
    .join(' ');

  console.log(numbers);
}

smallestTwoNumbers([3, 0, 10, 4, 7, 3]);

// Task 8 - Biggest Element
//
function biggestElement (input) {
  let matrix = input.map(line => line.map(Number));
  let biggestNumber = Number.MIN_SAFE_INTEGER;

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let currentNumber = matrix[row][col];

      biggestNumber = Math.max(biggestNumber, currentNumber);
    }
  }

  // matrix.forEach(row =>
  //   row.forEach(currentNumber =>
  //     (biggestNumber = Math.max(biggestNumber, currentNumber))
  //   )
  // );

  // matrix.forEach(row =>
  //   row.forEach(currentNumber => {
  //     if (currentNumber > biggestNumber) {
  //       biggestNumber = currentNumber;
  //     }
  //   })
  // );

  // biggestNumber = Math.max.apply(null, matrix.reduce((firstRow, secondRow) => firstRow.concat(secondRow)));

  console.log(biggestNumber);
}

biggestElement([[3, 5, 7, 12], [-1, 4, 33, 2], [8, 3, 0, 4]]);

// Task 9 - Diagonal Sum
//
function diagonalSum (input) {
  let left = 0;
  let right = 0;

  for (let row = 0; row < input.length; row++) {
    left += input[row][row];
    right += input[row][input[row].length - row - 1];
  }

  console.log(`${left} ${right}`);
}

diagonalSum([[3, 5, 17], [-1, 7, 14], [1, -8, 89]]);

// Task 10 - Equal Neighbours
//
function equalNeighbours (input) {
  let counter = 0;

  // Check horizontal pairs
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length - 1; col++) {
      if (input[row][col] === input[row][col + 1]) {
        counter++;
      }
    }
  }

  // Check vertical pairs
  for (let row = 0; row < input.length - 1; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === input[row + 1][col]) {
        counter++;
      }
    }
  }

  console.log(counter);
}

equalNeighbours([['test', 'yes', 'yo', 'ho'], ['well', 'done', 'yo', '6'], ['not', 'done', 'yet', '5']]);
