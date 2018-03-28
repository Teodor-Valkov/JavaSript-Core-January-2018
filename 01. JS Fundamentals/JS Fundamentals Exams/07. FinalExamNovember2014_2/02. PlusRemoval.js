function solve (input) {
  let matrix = [];
  let resultMatrix = [];

  input.forEach(line => {
    matrix.push(line.toLowerCase().split(''));
    resultMatrix.push(line.split(''));
  });

  for (let row = 0; row < matrix.length - 2; row++) {
    for (let col = 1; col < matrix[row].length; col++) {
      let char = matrix[row][col];

      let isPlus = matrix[row + 1][col - 1] === char &&
                   matrix[row + 1][col] === char &&
                   matrix[row + 1][col + 1] === char &&
                   matrix[row + 2][col] === char;

      if (isPlus) {
        resultMatrix[row][col] = ' ';
        resultMatrix[row + 1][col - 1] = ' ';
        resultMatrix[row + 1][col] = ' ';
        resultMatrix[row + 1][col + 1] = ' ';
        resultMatrix[row + 2][col] = ' ';
      }
    }
  }

  let result = [];

  resultMatrix.forEach(row => {
    result.push(row.filter(r => r !== ' ').join(''));
  });

  result.forEach(row => {
    console.log(row);
  });
}

solve(['ab**l5',
  'bBb*555',
  'absh*5',
  'ttHHH',
  'ttth']);
