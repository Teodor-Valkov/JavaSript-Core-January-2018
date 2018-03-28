function solve (input) {
  let elections = {};

  for (let line of input) {
    let system = line['system'];
    let candidate = line['candidate'];
    let votes = line['votes'];

    if (!elections.hasOwnProperty(system)) {
      elections[system] = {};
    }

    if (!elections[system].hasOwnProperty(candidate)) {
      elections[system][candidate] = 0;
    }

    elections[system][candidate] += votes;
  }

  let totalVotes = 0;

  for (let system in elections) {
    let candidates = Object.keys(elections[system]);
    let candidatesSorted = candidates.sort((a, b) => elections[system][b] - elections[system][a]);

    let winner = candidatesSorted[0];
    let votes = 0;

    for (let candidate in elections[system]) {
      votes += elections[system][candidate];
    }

    elections[system] = {};
    elections[system]['winner'] = winner;
    elections[system]['votes'] = votes;
    totalVotes += votes;
  }

  let winners = {};

  for (let system in elections) {
    let winner = elections[system]['winner'];
    let votes = elections[system]['votes'];

    if (!winners.hasOwnProperty(winner)) {
      winners[winner] = 0;
    }

    winners[winner] += votes;
  }

  let sortedWinners = Object.keys(winners).sort((a, b) => winners[b] - winners[a]);
  let winner = sortedWinners[0];
  let runnerUp = sortedWinners[1];

  let sortedPercents = Object.values(winners).sort((a, b) => b - a).map(v => Math.floor(v / totalVotes * 100));
  let winnerPercents = sortedPercents[0];
  let runnerUpPercents = sortedPercents[1];

  let sortedSystems = Object.keys(elections).sort((a, b) => elections[b]['votes'] - elections[a]['votes']);

  if (winnerPercents > 50) {
    if (sortedWinners.length === 1) {
      console.log(`${winner} wins with ${winners[winner]} votes`);
      console.log(`${winner} wins unopposed!`);
    } else {
      console.log(`${winner} wins with ${winners[winner]} votes`);
      console.log(`Runner up: ${runnerUp}`);
      for (let system of sortedSystems) {
        if (elections[system]['candidate'] === runnerUp) {
          console.log(system + ': ' + elections[system]['votes']);
        }
      }
    }
  } else {
    console.log(`Runoff between ${winner} with ${winnerPercents}% and ${runnerUp} with ${runnerUpPercents}%`);
  }
}

solve([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
  { system: 'Sigma', candidate: 'Space Cow', votes: 200 },
  { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
  { system: 'Tau', candidate: 'Space Cow', votes: 15 },
  { system: 'Sigma', candidate: 'Space Cow', votes: 60 },
  { system: 'Tau', candidate: 'Flying Shrimp', votes: 150 } ]);

// solve([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
//     { system: 'Sigma', candidate: 'Space Cow',     votes: 200 },
//     { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
//     { system: 'Tau',   candidate: 'Space Cow',     votes: 15 },
//     { system: 'Sigma', candidate: 'Space Cow',     votes: 60 },
//     { system: 'Tau',   candidate: 'Flying Shrimp', votes: 150 } ])

// solve([ { system: 'Tau',     candidate: 'Flying Shrimp', votes: 150 },
//     { system: 'Tau',     candidate: 'Space Cow',     votes: 100 },
//     { system: 'Theta',   candidate: 'Space Cow',     votes: 10 },
//     { system: 'Sigma',   candidate: 'Space Cow',     votes: 200 },
//     { system: 'Sigma',   candidate: 'Flying Shrimp', votes: 75 },
//     { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
//     { system: 'Omicron', candidate: 'Octocat',       votes: 75 } ])

// solve([ { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
//     { system: 'Tau',   candidate: 'Kim Jong Andromeda', votes: 200 },
//     { system: 'Tau',   candidate: 'Flying Shrimp',      votes: 150 } ])
