function solve (input) {
  input.pop();

  let coordinates = input.pop().split(' ');
  let matrix = input.map(line => line.split(' ').map(Number));

  let bunnyDamage = 0;
  let bunniesKilled = 0;

  for (let coordinate of coordinates) {
    let [targetRow, targetCol] = coordinate.split(',').map(Number);
    let bombDamage = matrix[targetRow][targetCol];

    let minRow = Math.max(0, targetRow - 1);
    let maxRow = Math.min(targetRow + 1, matrix.length - 1);
    let minCol = Math.max(0, targetCol - 1);
    let maxCol = Math.min(targetCol + 1, matrix[targetRow].length - 1);

    if (matrix[targetRow][targetCol] > 0) {
      bunnyDamage += matrix[targetRow][targetCol];
      bunniesKilled++;

      for (let row = minRow; row <= maxRow; row++) {
        for (let col = minCol; col <= maxCol; col++) {
          matrix[row][col] -= bombDamage;
        }
      }
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
}

solve(['5 10 15 20',
  '10 10 10 10',
  '10 15 10 10',
  '10 10 10 10',
  '2,2 0,1', '']);
