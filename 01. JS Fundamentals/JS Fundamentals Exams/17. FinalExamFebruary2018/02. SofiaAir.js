function solve (input, forces) {
  let matrix = input.map(line => line.split(' ').map(Number));
  let limit = 50;
  let breeze = 15;
  let gale = 20;

  let polutions = [];

  for (let force of forces) {
    let tokens = force.split(' ');
    let type = tokens[0];
    let positionOrSmog = Number(tokens[1]);

    switch (type) {
      case 'breeze':
        let row = positionOrSmog;

        for (let col = 0; col < matrix[row].length; col++) {
          matrix[row][col] -= breeze;

          if (matrix[row][col] < 0) {
            matrix[row][col] = 0;
          }
        }
        break;
      case 'gale':
        let col = positionOrSmog;

        for (let row = 0; row < matrix.length; row++) {
          matrix[row][col] -= gale;

          if (matrix[row][col] < 0) {
            matrix[row][col] = 0;
          }
        }
        break;
      case 'smog':
        let smog = positionOrSmog;

        for (let row = 0; row < matrix.length; row++) {
          for (let col = 0; col < matrix[row].length; col++) {
            matrix[row][col] += smog;

            if (matrix[row][col] < 0) {
              matrix[row][col] = 0;
            }
          }
        }
        break;
      default:
        console.log('Invalid input');
        break;
    }
  }

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] >= limit) {
        polutions.push(`[${row}-${col}]`);
      }
    }
  }

  console.log(polutions.length === 0 ? 'No polluted areas' : `Polluted areas: ${polutions.join(', ')}`);
}

solve(['5 7 72 14 4',
  '41 35 37 27 33',
  '23 16 27 42 12',
  '2 20 28 39 14',
  '16 34 31 10 24'],
['breeze 1', 'gale 2', 'smog 25']);

// solve(['5 7 3 28 32',
//   '41 12 49 30 33',
//   '3 16 20 42 12',
//   '2 20 10 39 14',
//   '7 34 4 27 24' ],
// ['smog 11', 'gale 3', 'breeze 1', 'smog 2']);

// solve(['5 7 2 14 4',
//   '21 14 2 5 3',
//   '3 16 7 42 12',
//   '2 20 8 39 14',
//   '7 34 1 10 24' ],
// ['breeze 1', 'gale 2', 'smog 35']);
