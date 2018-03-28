function solve (input = []) {
  let planes = [];
  let towns = {};

  for (let line of input) {
    let tokens = line.split(' ');

    if (tokens.length !== 4) {
      continue;
    }

    let id = tokens[0];
    let name = tokens[1];
    let passengers = Number(tokens[2]);
    let action = tokens[3];

    update(planes, towns, id, name, passengers, action);
  }

  print(planes, towns);

  function update (planes, towns, id, name, passengers, action) {
    let isPlaneLanded = false;

    switch (action) {
      case 'land':
        isPlaneLanded = planes.includes(id);

        if (!isPlaneLanded) {
          planes.push(id);

          checkTown(towns, name);

          towns[name]['planes'].add(id);
          towns[name]['arrivals'] += passengers;
        }
        break;
      case 'depart':
        isPlaneLanded = planes.includes(id);

        if (isPlaneLanded) {
          let planeIndex = planes.indexOf(id);
          planes.splice(planeIndex, 1);

          checkTown(towns, name);

          towns[name]['planes'].add(id);
          towns[name]['departures'] += passengers;
        }
        break;
      default:
        console.log('Invalid input.');
        break;
    }
  }

  function checkTown (towns, name) {
    if (!towns.hasOwnProperty(name)) {
      towns[name] = {
        'Planes': new Set(),
        'Arrivals': 0,
        'Departures': 0
      };
    }
  }

  function print (planes, towns) {
    let sortedPlanes = planes.sort((a, b) => {
      return a.localeCompare(b);
    });

    console.log('Planes left:');
    for (let plane of sortedPlanes) {
      console.log(`- ${plane}`);
    }

    let names = Object.keys(towns);
    let sortedNames = names.sort((a, b) => {
      if (towns[a]['Arrivals'] === towns[b]['Arrivals']) {
        return a.localeCompare(b);
      }

      return towns[b]['Arrivals'] - towns[a]['Arrivals'];
    });

    for (let name of sortedNames) {
      console.log(name);
      console.log(`Arrivals: ${towns[name]['Arrivals']}`);
      console.log(`Departures: ${towns[name]['Departures']}`);
      console.log('Planes:');

      let sortedPlanes = Array.from(towns[name]['Planes']).sort((a, b) => {
        return a.localeCompare(b);
      });

      for (let plane of sortedPlanes) {
        console.log(`-- ${plane}`);
      }
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
