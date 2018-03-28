function solve (input) {
  let elections = new Map();
  let winnersInSystems = new Map();
  let totalVotesWinners = new Map();
  let totalVotes = 0;

  // Process input and elections
  for (let line of input) {
    let system = line['system'];
    let candidate = line['candidate'];
    let votes = Number(line['votes']);

    if (!elections.has(system)) {
      elections.set(system, new Map());
    }

    if (!elections.get(system).has(candidate)) {
      elections.get(system).set(candidate, 0);
    }

    totalVotes += votes;
    elections.get(system).set(candidate, elections.get(system).get(candidate) + votes);
  }

  // Sort elections by votes in descending order
  for (let [system, candidates] of elections) {
    elections.set(system, new Map(Array.from(candidates).sort((a, b) => b[1] - a[1])));
  }

  // Process winners in each system
  for (let [system, candidates] of elections) {
    // let winner = candidates.keys().next().value;
    let winner = Array.from(candidates.keys())[0];

    if (!winnersInSystems.has(winner)) {
      winnersInSystems.set(winner, new Map());
    }

    winnersInSystems.get(winner).set(system, Array.from(candidates.values()).reduce((a, b) => a + b));
  }

  // Sort system votes of each winner in descending order
  for (let [winner, systems] of winnersInSystems) {
    winnersInSystems.set(winner, new Map(Array.from(systems).sort((a, b) => b[1] - a[1])));
  }

  // Process total votes of each winner
  for (let [winner, systems] of winnersInSystems) {
    totalVotesWinners.set(winner, Array.from(systems.values()).reduce((a, b) => a + b));
  }

  // Sort winners by votes in descending order
  totalVotesWinners = new Map(Array.from(totalVotesWinners).sort((a, b) => b[1] - a[1]));

  let winnerName = Array.from(totalVotesWinners)[0][0];
  let winnerVotes = Array.from(totalVotesWinners)[0][1];
  let winnerPercentage = (winnerVotes / totalVotes) * 100;

  if (Array.from(totalVotesWinners).length === 1) {
    console.log(`${winnerName} wins with ${winnerVotes} votes`);
    console.log(`${winnerName} wins unopposed!`);
    return;
  }

  let runnerUpName = Array.from(totalVotesWinners)[1][0];
  let runnerUpVotes = Array.from(totalVotesWinners)[1][1];
  let runnerUpPercentage = (runnerUpVotes / totalVotes) * 100;

  if (winnerPercentage > 50) {
    console.log(`${winnerName} wins with ${winnerVotes} votes`);
    console.log(`Runner up: ${runnerUpName}`);

    for (let [system, votes] of winnersInSystems.get(runnerUpName)) {
      console.log(`${system}: ${votes}`);
    }

    return;
  }

  console.log(`Runoff between ${winnerName} with ${Math.floor(winnerPercentage)}% and ${runnerUpName} with ${Math.floor(runnerUpPercentage)}%`);
}

solve([ { system: 'Theta', candidate: 'Flying Shrimp', votes: 10 },
  { system: 'Sigma', candidate: 'Space Cow', votes: 200 },
  { system: 'Sigma', candidate: 'Flying Shrimp', votes: 120 },
  { system: 'Tau', candidate: 'Space Cow', votes: 15 },
  { system: 'Sigma', candidate: 'Space Cow', votes: 60 },
  { system: 'Tau', candidate: 'Flying Shrimp', votes: 150 } ]);

// solve([ { system: 'Tau', candidate: 'Flying Shrimp', votes: 150 },
//   { system: 'Tau', candidate: 'Space Cow', votes: 100 },
//   { system: 'Theta', candidate: 'Space Cow', votes: 10 },
//   { system: 'Sigma', candidate: 'Space Cow', votes: 200 },
//   { system: 'Sigma', candidate: 'Flying Shrimp', votes: 75 },
//   { system: 'Omicron', candidate: 'Flying Shrimp', votes: 50 },
//   { system: 'Omicron', candidate: 'Octocat', votes: 75 } ]);

// solve([ { system: 'Theta', candidate: 'Kim Jong Andromeda', votes: 10 },
//   { system: 'Tau', candidate: 'Kim Jong Andromeda', votes: 200 },
//   { system: 'Tau', candidate: 'Flying Shrimp', votes: 150 } ]);

// solve([ { system: 'Theta', candidate: 'Kitler', votes: 50 },
//   { system: 'Theta', candidate: 'Space Cow', votes: 45 },
//   { system: 'Theta', candidate: 'Huge Manatee', votes: 45 },
//   { system: 'Theta', candidate: 'Flying Shrimp', votes: 45 },
//   { system: 'Tau', candidate: 'Kitler', votes: 50 },
//   { system: 'Tau', candidate: 'Space Cow', votes: 45 },
//   { system: 'Tau', candidate: 'Huge Manatee', votes: 15 },
//   { system: 'Sigma', candidate: 'Kitler', votes: 50 },
//   { system: 'Sigma', candidate: 'Huge Manatee', votes: 45 },
//   { system: 'Sigma', candidate: 'Space Cow', votes: 15 },
//   { system: 'Omicron', candidate: 'Kitler', votes: 50 },
//   { system: 'Omicron', candidate: 'Huge Manatee', votes: 20 },
//   { system: 'Omicron', candidate: 'Space Cow', votes: 25 }]);
