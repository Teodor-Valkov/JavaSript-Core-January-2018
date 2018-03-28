function solve (primaryMatrix, secondaryMatrix, coordinates, position) {
  let steps = 0;
  let quadrant = 0;
  let result = '';

  for (let coordinate of coordinates) {
    let startingRow = coordinate[0];
    let startingCol = coordinate[1];

    let endingRow = Math.min(primaryMatrix.length, secondaryMatrix.length);
    let endingCol = Math.min(primaryMatrix[0].length, secondaryMatrix[0].length);

    for (let row = 0; row < endingRow; row++) {
      if (startingRow + row === primaryMatrix.length) {
        break;
      }

      for (let col = 0; col < endingCol; col++) {
        if (startingCol + col === primaryMatrix[0].length) {
          break;
        }

        if (secondaryMatrix[row][col] === 1) {
          switch (primaryMatrix[startingRow + row][startingCol + col]) {
            case 0:
              primaryMatrix[startingRow + row][startingCol + col] = 1;
              break;
            case 1:
              primaryMatrix[startingRow + row][startingCol + col] = 0;
              break;
          }
        }
      }
    }
  }

  let row = position[0];
  let col = position[1];
  let from = '';

  while (true) {
    steps++;

    let moveUp = tryMoveUp(row - 1, col, primaryMatrix);
    let moveDown = tryMoveDown(row + 1, col, primaryMatrix);
    let moveLeft = tryMoveLeft(row, col - 1, primaryMatrix);
    let moveRight = tryMoveRight(row, col + 1, primaryMatrix);

    if (moveUp && from !== 'Up') {
      row--;
      from = 'Down';
    } else if (moveDown && from !== 'Down') {
      row++;
      from = 'Up';
    } else if (moveLeft && from !== 'Left') {
      col--;
      from = 'Right';
    } else if (moveRight && from !== 'Right') {
      col++;
      from = 'Left';
    }

    if ((moveUp && from !== 'Up') || (moveDown && from !== 'Down') || (moveLeft && from !== 'Left') || (moveRight && from !== 'Right')) {
      continue;
    }

    if (row < primaryMatrix.length / 2 && col < primaryMatrix[row].length / 2) {
      quadrant = 2;
    } else if (row < primaryMatrix.length / 2 && col >= primaryMatrix[row].length / 2) {
      quadrant = 1;
    } else if (row >= primaryMatrix.length / 2 && col < primaryMatrix[row].length / 2) {
      quadrant = 3;
    } else if (row >= primaryMatrix.length / 2 && col >= primaryMatrix[row].length / 2) {
      quadrant = 4;
    }

    if (row === 0 || row === primaryMatrix.length - 1 || col === 0 || col === primaryMatrix[row].length - 1) {
      if (row === 0) {
        result = 'Top';
      } else if (row === primaryMatrix.length - 1) {
        result = 'Bottom';
      } else if (col === 0) {
        result = 'Left';
      } else if (row === primaryMatrix[row].length - 1) {
        result = 'Right';
      }

      console.log(steps);
      console.log(result);
      break;
    } else {
      console.log(steps);
      console.log(`Dead end ${quadrant}`);
      break;
    }
  }

  function tryMoveUp (row, col, primaryMatrix) {
    return row >= 0 && primaryMatrix[row][col] === 0;
  }

  function tryMoveDown (row, col, primaryMatrix) {
    return row < primaryMatrix.length && primaryMatrix[row][col] === 0;
  }

  function tryMoveLeft (row, col, primaryMatrix) {
    return col >= 0 && primaryMatrix[row][col] === 0;
  }

  function tryMoveRight (row, col, primaryMatrix) {
    return col < primaryMatrix[row].length && primaryMatrix[row][col] === 0;
  }
}

solve([[1, 0, 0, 1],
  [1, 0, 0, 0],
  [1, 0, 0, 1],
  [0, 0, 1, 1]],
[[0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1]],
[[0, 0],
  [3, 2],
  [3, 0],
  [2, 0]],
[1, 0]);

// solve([[1, 1, 0, 1, 1, 1, 1, 0],
//   [0, 1, 1, 1, 0, 0, 0, 1],
//   [1, 0, 0, 1, 0, 0, 0, 1],
//   [0, 0, 0, 1, 1, 0, 0, 1],
//   [1, 0, 0, 1, 1, 1, 1, 1],
//   [1, 0, 1, 1, 0, 1, 0, 0]],
// [[0, 1, 1],
//   [0, 1, 0],
//   [1, 1, 0]],
// [[1, 1],
//   [2, 3],
//   [5, 3]],
// [0, 2]);

// solve([[1, 1, 0, 1],
//   [0, 1, 1, 0],
//   [0, 0, 1, 0],
//   [1, 0, 1, 0]],
// [[0, 0, 1, 0, 1],
//   [1, 0, 0, 1, 1],
//   [1, 0, 1, 1, 1],
//   [1, 0, 1, 0, 1]],
// [[0, 0],
//   [2, 1],
//   [1, 0]],
// [2, 0]);
