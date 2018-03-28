function solve (input) {
  let elections = new Map();
  let systemsWithWinners = new Map();
  let totalVotesWinners = new Map();

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

    elections.get(system).set(candidate, elections.get(system).get(candidate) + votes);
  }

  // Process systems by winners
  for (let [system, candidates] of elections) {
    systemsWithWinners.set(system, new Map());

    let candidatesSorted = Array.from(candidates.keys()).sort((a, b) => {
      return elections.get(system).get(b) - elections.get(system).get(a);
    });

    for (let candidate of candidatesSorted) {
      systemsWithWinners.get(system).set(candidate, elections.get(system).get(candidate));
    }
  }

  // Process total votes of each winner
  for (let [system, candidates] of systemsWithWinners) {
    let systemWinner = candidates.keys().next().value;
    let systemVotes = Array.from(candidates.values()).reduce((a, b) => a + b);

    if (!totalVotesWinners.has(systemWinner)) {
      totalVotesWinners.set(systemWinner, 0);
    }

    totalVotesWinners.set(systemWinner, totalVotesWinners.get(systemWinner) + systemVotes);
  }

  let totalVotes = Array.from(totalVotesWinners.values()).reduce((a, b) => a + b);

  // Sort winners by votes in descending order
  let winners = Array.from(totalVotesWinners.keys());
  let winnersSorted = winners.sort((a, b) => totalVotesWinners.get(b) - totalVotesWinners.get(a));

  let winner = winnersSorted[0];
  let winnerVotes = totalVotesWinners.get(winner);

  if (winnersSorted.length === 1) {
    console.log(`${winner} wins with ${winnerVotes} votes`);
    console.log(`${winner} wins unopposed!`);
    return;
  }

  let runnerUp = winnersSorted[1];
  let runnerUpVotes = totalVotesWinners.get(runnerUp);

  if (totalVotesWinners.get(winner) >= totalVotes / 2) {
    console.log(`${winner} wins with ${winnerVotes} votes`);
    console.log(`Runner up: ${runnerUp}`);

    // Process systems for runner up and sort in descending order
    let systemsForRunnerUp = new Map();

    for (let [system, candidates] of systemsWithWinners) {
      let systemWinner = candidates.keys().next().value;

      if (runnerUp === systemWinner) {
        systemsForRunnerUp.set(system, 0);

        for (let [candidate, votes] of systemsWithWinners.get(system)) {
          systemsForRunnerUp.set(system, systemsForRunnerUp.get(system) + votes);
        }
      }
    }

    let systems = Array.from(systemsForRunnerUp.keys());
    let systemsSorted = systems.sort((a, b) => systemsForRunnerUp.get(b) - systemsForRunnerUp.get(a));

    for (let system of systemsSorted) {
      console.log(`${system}: ${systemsForRunnerUp.get(system)}`);
    }

    return;
  }

  let winnerPercentage = winnerVotes * 100 / totalVotes;
  let runnerUpPercentage = runnerUpVotes * 100 / totalVotes;
  console.log(`Runoff between ${winner} with ${Math.floor(winnerPercentage)}% and ${runnerUp} with ${Math.floor(runnerUpPercentage)}%`);
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
