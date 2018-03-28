function solve (input) {
  let maxJumps = Number(input[0]);
  let fieldLength = Number(input[1]);

  let players = [];

  for (let i = 2; i < input.length; i++) {
    let tokens = input[i].split(', ');
    let player = {
      name: tokens[0],
      jumps: Number(tokens[1]),
      position: 0
    };

    players.push(player);
  }

  let winner = '';

  for (let jump = 0; jump < maxJumps; jump++) {
    for (let player of players) {
      player['position'] += player['jumps'];

      if (player['position'] >= (fieldLength - 1)) {
        player['position'] = fieldLength - 1;
        winner = player['name'];
        break;
      }
    }

    if (winner !== '') {
      break;
    }
  }

  console.log(new Array(fieldLength + 1).join('#'));
  console.log(new Array(fieldLength + 1).join('#'));

  for (let player of players) {
    let playerRow = '';

    playerRow += new Array(player['position'] + 1).join('.');
    playerRow += player.name[0].toUpperCase();
    playerRow += new Array(fieldLength - player['position']).join('.');

    console.log(playerRow);
  }

  console.log(new Array(fieldLength + 1).join('#'));
  console.log(new Array(fieldLength + 1).join('#'));

  if (winner === '') {
    let maxDistance = 0;

    for (let player of players) {
      if (player['position'] >= maxDistance) {
        winner = player['name'];
        maxDistance = player['position'];
      }
    }
  }

  console.log('Winner: ' + winner);
}

solve(['3', '5', 'cura, 1', 'Pepi, 1', 'UlTraFlee, 1', 'BOIKO, 1']);
