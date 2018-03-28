function solve (input) {
  input.pop();

  let coordinates = input.pop().split(' ');
  let matrix = input.map(line => line.split(' ').map(Number));

  let bunnyDamage = 0;
  let bunniesKilled = 0;

  for (let coordinate of coordinates) {
    let [targetRow, targetCol] = coordinate.split(',').map(Number);
    let bombDamage = matrix[targetRow][targetCol];

    if (matrix[targetRow][targetCol] > 0) {
      bunnyDamage += bombDamage;
      bunniesKilled++;
      explode(targetRow, targetCol, matrix);
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] > 0) {
        bunnyDamage += matrix[row][col];
        bunniesKilled++;
      }
    }
  }

  console.log(bunnyDamage);
  console.log(bunniesKilled);

  function explode (targetRow, targetCol, matrix) {
    let bombDamage = matrix[targetRow][targetCol];

    for (let row = targetRow - 1; row <= targetRow + 1; row++) {
      for (let col = targetCol - 1; col <= targetCol + 1; col++) {
        if (isInsideMatrix(row, col, matrix)) {
          matrix[row][col] -= bombDamage;
        }
      }
    }
  }

  function isInsideMatrix (row, col, matrix) {
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[row].length;
  }
}

solve(['5 10 15 20',
  '10 10 10 10',
  '10 15 10 10',
  '10 10 10 10',
  '2,2 0,1', '']);
