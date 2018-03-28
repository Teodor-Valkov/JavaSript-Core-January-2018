function solve (input) {
  let players = [];

  for (let line of input) {
    let tokens = line.split(/(?:vs.|:)/g);
    let firstPlayerName = tokens[0].trim().replace(/\s+/g, ' ');
    let secondPlayerName = tokens[1].trim().replace(/\s+/g, ' ');
    let sets = tokens[2].trim().replace(/\s+/g, ' ').split(' ');

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

    for (let set of sets) {
      let games = set.split('-');
      let firstPlayerGames = Number(games[0]);
      let secondPlayerGames = Number(games[1]);

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
    if (a['matchesWon'] < b['matchesWon']) {
      return 1;
    } else if (a['matchesWon'] > b['matchesWon']) {
      return -1;
    }

    if (a['setsWon'] < b['setsWon']) {
      return 1;
    } else if (a['setsWon'] > b['setsWon']) {
      return -1;
    }

    if (a['gamesWon'] < b['gamesWon']) {
      return 1;
    } else if (a['gamesWon'] > b['gamesWon']) {
      return -1;
    }

    if (a['name'] > b['name']) {
      return 1;
    } else {
      return -1;
    }
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
  'Boris Beckervs.Andre        \t\t\tAgassi:2-1']);
