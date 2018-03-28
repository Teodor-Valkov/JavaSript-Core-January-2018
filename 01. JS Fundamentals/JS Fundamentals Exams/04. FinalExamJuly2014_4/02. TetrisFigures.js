function solve (input) {
  let figures = {
    'I': 0,
    'L': 0,
    'J': 0,
    'O': 0,
    'Z': 0,
    'S': 0,
    'T': 0
  };

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === 'o') {
        checkElementsOfFigures(row, col);
      }
    }
  }

  function checkElementsOfFigures (row, col) {
    checkElement('I', row, col, 1, 0, 2, 0, 3, 0);
    checkElement('L', row, col, 1, 0, 2, 0, 2, 1);
    checkElement('J', row, col, 1, 0, 2, 0, 2, -1);
    checkElement('O', row, col, 1, 0, 1, 1, 0, 1);
    checkElement('Z', row, col, 0, 1, 1, 1, 1, 2);
    checkElement('S', row, col, 0, -1, 1, -1, 1, -2);
    checkElement('T', row, col, 0, 1, 1, 1, 0, 2);
  }

  function checkElement (elem, row, col, firstRowCheck, firstColCheck, secondRowCheck, secondColCheck, thirdRowCheck, thirdColCheck) {
    let maxRow = Math.max(firstRowCheck, secondRowCheck, thirdRowCheck);
    let maxCol = Math.max(firstColCheck, secondColCheck, thirdColCheck);
    let minCol = Math.min(firstColCheck, secondColCheck, thirdColCheck);

    if (input[row + maxRow] === undefined ||
        input[row + maxRow][col + maxCol] === undefined ||
        input[row][col + minCol] === undefined) {
      return false;
    }

    if (input[row][col] === input[row + firstRowCheck][col + firstColCheck] &&
        input[row][col] === input[row + secondRowCheck][col + secondColCheck] &&
        input[row][col] === input[row + thirdRowCheck][col + thirdColCheck]) {
      figures[elem]++;
    }
  }

  console.log(JSON.stringify(figures));
}

solve(['--o--o-',
  '--oo-oo',
  'ooo-oo-',
  '-ooooo-',
  '---oo--' ]);
