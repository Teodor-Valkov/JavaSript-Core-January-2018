function solve (input) {
  let players = [];

  for (let line of input) {
    line = line.replace('vs.', ' vs. ');
    line = line.replace(':', ' : ');
    line = line.replace(/ {3}/g, ' ');
    line = line.trim();

    let tokens = line.split(' ');
    let firstPlayerName = tokens[0] + ' ' + tokens[1];
    let secondPlayerName = tokens[3] + ' ' + tokens[4];

    let firstPlayer;
    let secondPlayer;

    for (let player of players) {
      if (player['name'] === firstPlayerName) {
        firstPlayer = player;
      } else if (player['name'] === secondPlayerName) {
        secondPlayer = player;
      }
    }

    if (firstPlayer === undefined) {
      firstPlayer = createPlayer(firstPlayerName);
      players.push(firstPlayer);
    }

    if (secondPlayer === undefined) {
      secondPlayer = createPlayer(secondPlayerName);
      players.push(secondPlayer);
    }

    let firstPlayerSets = 0;
    let secondPlayerSets = 0;

    for (let i = 6; i < tokens.length; i++) {
      let game = tokens[i].split('-');
      let firstPlayerGames = Number(game[0]);
      let secondPlayerGames = Number(game[1]);

      if (firstPlayerGames > secondPlayerGames) {
        firstPlayerSets++;
        firstPlayer['setsWon']++;
        secondPlayer['setsLost']++;
      } else {
        secondPlayerSets++;
        secondPlayer['setsWon']++;
        firstPlayer['setsLost']++;
      }

      firstPlayer['gamesWon'] += firstPlayerGames;
      firstPlayer['gamesLost'] += secondPlayerGames;

      secondPlayer['gamesWon'] += secondPlayerGames;
      secondPlayer['gamesLost'] += firstPlayerGames;
    }

    if (firstPlayerSets > secondPlayerSets) {
      firstPlayer['matchesWon']++;
      secondPlayer['matchesLost']++;
    } else {
      secondPlayer['matchesWon']++;
      firstPlayer['matchesLost']++;
    }
  }

  players.sort((a, b) => {
    if (a['matchesWon'] === b['matchesWon']) {
      if (a['setsWon'] === b['setsWon']) {
        if (a['gamesWon'] === b['gamesWon']) {
          return a['name'].localeCompare(b['name']);
        }

        return b['gamesWon'] - a['gamesWon'];
      }

      return b['setsWon'] - a['setsWon'];
    }

    return b['matchesWon'] - a['matchesWon'];
  });

  console.log(JSON.stringify(players));

  function createPlayer (name) {
    return {
      name: name,
      matchesWon: 0,
      matchesLost: 0,
      setsWon: 0,
      setsLost: 0,
      gamesWon: 0,
      gamesLost: 0
    };
  }
}

solve(['Novak Djokovic vs. Roger Federer : 6-3 6-3',
  'Roger    Federer    vs.        Novak Djokovic    :         6-2 6-3',
  'Rafael Nadal vs. Andy Murray : 4-6 6-2 5-7',
  'Andy Murray vs. David Ferrer : 6-4 7-6',
  'Tomas Bedrych vs. Kei Nishikori : 4-6 6-4 6-3 4-6 5-7',
  'Grigor Dimitrov vs. Milos Raonic : 6-3 4-6 7-6 6-2',
  'Pete Sampras vs. Andre Agassi : 2-1',
  'Boris Beckervs.Andre        \t\t\tAgassi:2-1'
]);
