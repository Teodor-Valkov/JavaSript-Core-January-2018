function solve (input) {
  let position = findPosition();

  for (let row = position.row + 1; row < input.length; row++) {
    let line = input[row];

    for (let symbol in line) {
      if (line[symbol] === '>') {
        position.col++;
      } else if (line[symbol] === '<') {
        position.col--;
      }
    }

    switch (line[position.col]) {
      case '_':
        console.log('Landed on the ground like a boss!');
        console.log(row + ' ' + position.col);
        return;
      case '~':
        console.log('Drowned in the water like a cat!');
        console.log(row + ' ' + position.col);
        return;
      case '/':
      case '|':
      case '\\':
        console.log('Got smacked on the rock like a dog!');
        console.log(row + ' ' + position.col);
        return;
    }
  }

  function findPosition () {
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        if (input[row][col] === 'o') {
          return {
            row: row,
            col: col
          };
        }
      }
    }
  }
}

solve(
  ['>>>>>>>>>>>o<<<<<<<<<<<<<',
    '----------~~~------------',
    '--------~/~~~\\~----------',
    '-------~/~---~\\~---------',
    '------~/~-----~\\~--------',
    '-----~/~-------~\\~-------',
    '----~/~---------~\\~------',
    '---~/~-----------~\\~-----',
    '--~/~-------------~\\~----',
    '-~/~---------------~\\~---']);
