function solve (input) {
  let length = input.shift();
  let specialMatrix = [];

  for (let i = 0; i < input.length; i++) {
    input[i] = input[i].split(' ').map(Number);
  }

  for (let i = 0; i < length; i++) {
    specialMatrix.push(input.shift());
  }

  let specialMatrixRows = specialMatrix.length;
  let specialMatrixCols = specialMatrix[0].length;

  for (let inputRow = 0; inputRow < input.length; inputRow += specialMatrixRows) {
    for (let inputCol = 0; inputCol < input[inputRow].length; inputCol += specialMatrixCols) {
      for (let specialRow = 0; specialRow < specialMatrix.length; specialRow++) {
        for (let specialCol = 0; specialCol < specialMatrix[specialRow].length; specialCol++) {
          let targetRow = inputRow + specialRow;
          let targetCol = inputCol + specialCol;

          if (targetRow < input.length && targetCol < input[inputRow].length) {
            let inputNumber = input[targetRow][targetCol];
            let specialNumber = specialMatrix[specialRow][specialCol];

            let resultNumber = inputNumber + specialNumber;
            resultNumber %= 27;

            let letter = resultNumber === 0 ? ' ' : String.fromCharCode(resultNumber + 64);
            input[targetRow][targetCol] = letter;
          }
        }
      }
    }
  }

  let result = '';

  for (let line of input) {
    result += line.join('');
  }

  console.log(result);
}

solve(['2',
  '59 36',
  '82 52',
  '4 18 25 19 8',
  '4 2 8 2 18',
  '23 14 22 0 22',
  '2 17 13 19 20',
  '0 9 0 22 22']);
