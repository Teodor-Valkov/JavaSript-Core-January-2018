function solve (input) {
  let planes = new Set();
  let towns = new Map();

  for (let line of input) {
    let tokens = line.split(' ');
    let id = tokens[0];
    let town = tokens[1];
    let passengers = Number(tokens[2]);
    let action = tokens[3];

    let isValid = false;

    if ((!planes.has(id) && action === 'land') || (planes.has(id) && action === 'depart')) {
      isValid = true;
    }

    if (isValid) {
      if (!towns.has(town)) {
        towns.set(town, {
          planes: new Set(),
          arrivals: 0,
          departures: 0
        });
      }

      towns.get(town)['planes'].add(id);

      switch (action) {
        case 'land':
          planes.add(id);
          towns.get(town)['arrivals'] += passengers;
          break;
        case 'depart':
          planes.delete(id);
          towns.get(town)['departures'] += passengers;
          break;
        default:
          console.log('Invalid input');
          break;
      }
    }
  }

  console.log('Planes left:');
  let sortedPlanes = Array.from(planes).sort((a, b) => a.localeCompare(b));

  for (let plane of sortedPlanes) {
    console.log(`- ${plane}`);
  }

  towns = new Map(Array.from(towns).sort((a, b) => {
    if (a[1]['arrivals'] === b[1]['arrivals']) {
      return a[0].localeCompare(b[0]);
    }

    return b[1]['arrivals'] - a[1]['arrivals'];
  }));

  for (let [town, object] of towns) {
    console.log(town);
    console.log(`Arrivals: ${object['arrivals']}`);
    console.log(`Departures: ${object['departures']}`);
    console.log('Planes:');

    for (let plane of Array.from(object['planes']).sort((a, b) => a.localeCompare(b))) {
      console.log(`-- ${plane}`);
    }
  }
}

solve(['Boeing474 Madrid 300 land',
  'AirForceOne WashingtonDC 178 land',
  'Airbus London 265 depart',
  'ATR72 WashingtonDC 272 land',
  'ATR72 Madrid 135 depart']);

// solve(['RTA72 London -10 land',
//   'RTA#72 Brussels -110 depart',
//   'RTA7!2 Warshaw 350 land',
//   'RTA72 Riga -201 depart',
//   'rta72 riga -13 land',
//   'rta Riga -200 depart']);
