function solve (input) {
  let results = {};

  for (let line in input) {
    let tokens = input[line].split(/[/:-]/);

    if (tokens.length !== 4) {
      continue;
    }

    let teamHome = tokens[0].trim();
    let teamAway = tokens[1].trim();
    let goalsHome = Number(tokens[2].trim());
    let goalsAway = Number(tokens[3].trim());

    processResults(results, teamHome, teamAway, goalsHome, goalsAway);
    processResults(results, teamAway, teamHome, goalsAway, goalsHome);
  }

  results = sortResults(results);

  for (let team in results) {
    results[team].matchesPlayedWith.sort();
  }

  console.log(JSON.stringify(results));

  function processResults (results, teamHome, teamAway, goalsHome, goalsAway) {
    if (!results[teamHome]) {
      results[teamHome] = {
        goalsScored: 0,
        goalsConceded: 0,
        matchesPlayedWith: []
      };
    }

    results[teamHome].goalsScored += goalsHome;
    results[teamHome].goalsConceded += goalsAway;

    if (results[teamHome].matchesPlayedWith.indexOf(teamAway) === -1) {
      results[teamHome].matchesPlayedWith.push(teamAway);
    }
  }

  function sortResults (result) {
    let keys = Object.keys(results);
    let keysSorted = keys.sort();
    let sortedResults = {};

    // First way of sorting
    //
    // for (let i = 0; i < keysSorted.length; i++) {
    //     let key = keysSorted[i];
    //     sortedResults[key] = results[key];
    // }

    // Second way of sorting
    //
    // for (let index in keysSorted) {
    //     let key = keysSorted[index];
    //     sortedResults[key] = results[key];
    // }

    // Third way of sorting
    //
    for (let key of keysSorted) {
      sortedResults[key] = results[key];
    }

    return sortedResults;
  }
}

solve(['Germany / Argentina: 1-0',
  'Brazil / Netherlands: 0-3',
  'Netherlands / Argentina: 0-0',
  'Brazil / Germany: 1-7',
  'Argentina / Belgium: 1-0',
  'Netherlands / Costa Rica: 0-0',
  'France / Germany: 0-1',
  'Brazil / Colombia: 2-1', '']);
