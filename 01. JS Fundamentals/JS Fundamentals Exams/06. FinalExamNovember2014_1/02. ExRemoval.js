function solve (input) {
  let matrix = [];
  let resultMatrix = [];

  input.forEach(line => {
    matrix.push(line.toLowerCase().split(''));
    resultMatrix.push(line.split(''));
  });

  for (let row = 0; row < matrix.length - 2; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      let char = matrix[row][col];

      let isX = matrix[row][col + 2] === char &&
                matrix[row + 1][col + 1] === char &&
                matrix[row + 2][col] === char &&
                matrix[row + 2][col + 2] === char;

      if (isX) {
        resultMatrix[row][col] = ' ';
        resultMatrix[row][col + 2] = ' ';
        resultMatrix[row + 1][col + 1] = ' ';
        resultMatrix[row + 2][col] = ' ';
        resultMatrix[row + 2][col + 2] = ' ';
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

solve(['abnbjs',
  'xoBab',
  'Abmbh',
  'aabab',
  'ababvvvv']);
