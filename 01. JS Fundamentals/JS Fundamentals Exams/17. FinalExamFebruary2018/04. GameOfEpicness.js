function solve (inputKingdoms, inputBattles) {
  let realm = {};

  for (let line of inputKingdoms) {
    let kingdom = line['kingdom'];
    let general = line['general'];
    let army = line['army'];

    if (!realm.hasOwnProperty(kingdom)) {
      realm[kingdom] = {
        wins: 0,
        losses: 0
      };
    }

    if (!realm[kingdom].hasOwnProperty(general)) {
      realm[kingdom][general] = {
        army: 0,
        wins: 0,
        losses: 0
      };
    }

    realm[kingdom][general]['army'] += army;
  }

  for (let line of inputBattles) {
    let attackingKingdom = line[0];
    let attackingGeneral = line[1];
    let defendingKingdom = line[2];
    let defendingGeneral = line[3];

    let winner = '';

    if (attackingKingdom === defendingKingdom || realm[attackingKingdom][attackingGeneral]['army'] === realm[defendingKingdom][defendingGeneral]['army']) {
      continue;
    }

    if (realm[attackingKingdom][attackingGeneral]['army'] > realm[defendingKingdom][defendingGeneral]['army']) {
      winner = attackingGeneral;
    } else if (realm[attackingKingdom][attackingGeneral]['army'] < realm[defendingKingdom][defendingGeneral]['army']) {
      winner = defendingGeneral;
    }

    if (winner === attackingGeneral) {
      realm[attackingKingdom][attackingGeneral]['army'] *= 1.1;
      realm[defendingKingdom][defendingGeneral]['army'] *= 0.9;

      realm[attackingKingdom][attackingGeneral]['wins']++;
      realm[defendingKingdom][defendingGeneral]['losses']++;

      realm[attackingKingdom]['wins']++;
      realm[defendingKingdom]['losses']++;
    } else if (winner === defendingGeneral) {
      realm[defendingKingdom][defendingGeneral]['army'] *= 1.1;
      realm[attackingKingdom][attackingGeneral]['army'] *= 0.9;

      realm[defendingKingdom][defendingGeneral]['wins']++;
      realm[attackingKingdom][attackingGeneral]['losses']++;

      realm[defendingKingdom]['wins']++;
      realm[attackingKingdom]['losses']++;
    }

    realm[attackingKingdom][attackingGeneral]['army'] = Math.floor(realm[attackingKingdom][attackingGeneral]['army']);
    realm[defendingKingdom][defendingGeneral]['army'] = Math.floor(realm[defendingKingdom][defendingGeneral]['army']);
  }

  let kingdoms = Object.keys(realm);

  let kingdomsSorted = kingdoms.sort((a, b) => {
    if (realm[a]['wins'] === realm[b]['wins']) {
      if (realm[a]['losses'] === realm[b]['losses']) {
        return a.localeCompare(b);
      }

      return realm[a]['losses'] - realm[b]['losses'];
    }

    return realm[b]['wins'] - realm[a]['wins'];
  });

  let winnerRealm = kingdomsSorted[0];

  delete realm[winnerRealm]['wins'];
  delete realm[winnerRealm]['losses'];

  let generals = Object.keys(realm[winnerRealm]);
  let generalsSorted = generals.sort((a, b) => realm[winnerRealm][b]['army'] - realm[winnerRealm][a]['army']);

  console.log(`Winner: ${winnerRealm}`);

  for (let name of generalsSorted) {
    let general = realm[winnerRealm][name];
    console.log(`/\\general: ${name}`);
    console.log(`---army: ${general['army']}`);
    console.log(`---wins: ${general['wins']}`);
    console.log(`---losses: ${general['losses']}`);
  }
}

solve([ { kingdom: 'Maiden Way', general: 'Merek', army: 5000 },
  { kingdom: 'Stonegate', general: 'Ulric', army: 4900 },
  { kingdom: 'Stonegate', general: 'Doran', army: 70000 },
  { kingdom: 'YorkenShire', general: 'Quinn', army: 0 },
  { kingdom: 'YorkenShire', general: 'Quinn', army: 2000 },
  { kingdom: 'Maiden Way', general: 'Berinon', army: 100000 } ],
[ ['YorkenShire', 'Quinn', 'Stonegate', 'Ulric'],
  ['Stonegate', 'Ulric', 'Stonegate', 'Doran'],
  ['Stonegate', 'Doran', 'Maiden Way', 'Merek'],
  ['Stonegate', 'Ulric', 'Maiden Way', 'Merek'],
  ['Maiden Way', 'Berinon', 'Stonegate', 'Ulric'] ]);

// solve([ { kingdom: 'Stonegate', general: 'Ulric', army: 5000 },
//   { kingdom: 'YorkenShire', general: 'Quinn', army: 5000 },
//   { kingdom: 'Maiden Way', general: 'Berinon', army: 1000 } ],
// [ ['YorkenShire', 'Quinn', 'Stonegate', 'Ulric'],
//   ['Maiden Way', 'Berinon', 'YorkenShire', 'Quinn'] ]);

// solve([ { kingdom: 'Maiden Way', general: 'Merek', army: 5000 },
//   { kingdom: 'Stonegate', general: 'Ulric', army: 4900 },
//   { kingdom: 'Stonegate', general: 'Doran', army: 70000 },
//   { kingdom: 'YorkenShire', general: 'Quinn', army: 0 },
//   { kingdom: 'YorkenShire', general: 'Quinn', army: 2000 } ],
// [ ['YorkenShire', 'Quinn', 'Stonegate', 'Doran'],
//   ['Stonegate', 'Ulric', 'Maiden Way', 'Merek'] ]);
