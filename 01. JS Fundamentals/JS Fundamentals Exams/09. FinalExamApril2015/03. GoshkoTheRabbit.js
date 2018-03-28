function solve (input) {
  let directions = input[0].split(', ');
  let field = [];

  for (let row = 1; row < input.length; row++) {
    field.push(input[row].split(', '));
  }

  let currentCol = 0;
  let currentRow = 0;
  let visitedCells = [];

  let carrots = 0;
  let cabbage = 0;
  let lettuce = 0;
  let turnip = 0;
  let wallHits = 0;

  for (let direction of directions) {
    let isWallHit = false;

    switch (direction) {
      case 'left':
        currentCol--;
        if (currentCol < 0) {
          currentCol = 0;
          isWallHit = true;
        }
        break;
      case 'right':
        currentCol++;
        if (currentCol === field[currentRow].length) {
          currentCol = field[currentRow].length - 1;
          isWallHit = true;
        }
        break;
      case 'up':
        currentRow--;
        if (currentRow < 0) {
          currentRow = 0;
          isWallHit = true;
        }
        break;
      case 'down':
        currentRow++;
        if (currentRow === field.length) {
          currentRow = field.length - 1;
          isWallHit = true;
        }
        break;
    }

    if (isWallHit) {
      wallHits++;
    } else {
      let cell = field[currentRow][currentCol];

      while (cell.indexOf('{!}') !== -1) {
        carrots++;
        cell = cell.replace('{!}', '@');
      }

      while (cell.indexOf('{*}') !== -1) {
        cabbage++;
        cell = cell.replace('{*}', '@');
      }

      while (cell.indexOf('{&}') !== -1) {
        lettuce++;
        cell = cell.replace('{&}', '@');
      }

      while (cell.indexOf('{#}') !== -1) {
        turnip++;
        cell = cell.replace('{#}', '@');
      }

      visitedCells.push(cell);
    }
  }

  console.log('{"&":' + lettuce + ',"*":' + cabbage + ',"#":' + turnip + ',"!":' + carrots + ',"wall hits":' + wallHits + '}');

  if (visitedCells.length === 0) {
    console.log('no');
  } else {
    console.log(visitedCells.join('|'));
  }
}

solve(['right, up, up, down',
  'asdf, as{#}aj{g}dasd, kjldk{}fdffd, jdflk{#}jdfj',
  'tr{X}yrty, zxx{*}zxc, mncvnvcn, popipoip',
  'poiopipo, nmf{X}d{X}ei, mzoijwq, omcxzne']);
