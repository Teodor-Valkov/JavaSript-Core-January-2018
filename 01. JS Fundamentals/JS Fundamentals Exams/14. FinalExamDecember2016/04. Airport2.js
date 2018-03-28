function solve (input = []) {
  let planes = new Set();
  let towns = {};

  for (let line of input) {
    let tokens = line.split(' ');
    let id = tokens[0];
    let name = tokens[1];
    let passengers = Number(tokens[2]);
    let action = tokens[3];

    update(planes, towns, id, name, passengers, action);
  }

  print(planes, towns);

  function update (planes, towns, id, name, passengers, action) {
    let isValid = false;

    if ((!planes.has(id) && action === 'land') || (planes.has(id) && action === 'depart')) {
      isValid = true;
    }

    if (isValid) {
      switch (action) {
        case 'land':
          planes.add(id);

          checkTown(towns, name, id);

          towns[name]['arrivals'] += passengers;
          break;
        case 'depart':
          planes.delete(id);

          checkTown(towns, name, id);

          towns[name]['departures'] += passengers;
          break;
        default:
          console.log('Invalid input.');
          break;
      }
    }
  }

  function checkTown (towns, name, id) {
    if (!towns.hasOwnProperty(name)) {
      towns[name] = {
        planes: [],
        arrivals: 0,
        departures: 0
      };
    }

    let planeIndex = towns[name]['planes'].indexOf(id);
    if (planeIndex === -1) {
      towns[name]['planes'].push(id);
    }
  }

  function print (planes, towns) {
    let sortedPlanes = Array.from(planes).sort((a, b) => {
      return a.localeCompare(b);
    });

    console.log('Planes left:');
    for (let plane of sortedPlanes) {
      console.log(`- ${plane}`);
    }

    let names = Object.keys(towns);
    let sortedNames = names.sort((a, b) => {
      if (towns[a]['arrivals'] === towns[b]['arrivals']) {
        return a.localeCompare(b);
      }

      return towns[b]['arrivals'] - towns[a]['arrivals'];
    });

    for (let name of sortedNames) {
      console.log(name);
      console.log(`Arrivals: ${towns[name]['Arrivals']}`);
      console.log(`Departures: ${towns[name]['Departures']}`);
      console.log('Planes:');

      let sortedPlanes = towns[name]['planes'].sort((a, b) => {
        return a.localeCompare(b);
      });

      for (let plane of sortedPlanes) {
        console.log(`-- ${plane}`);
      }
    }
  }
}

// solve(['Boeing474 Madrid 300 land',
//   'AirForceOne WashingtonDC 178 land',
//   'Airbus London 265 depart',
//   'ATR72 WashingtonDC 272 land',
//   'ATR72 Madrid 135 depart']);

solve(['RTA72 London -10 land',
  'RTA#72 Brussels -110 depart',
  'RTA7!2 Warshaw 350 land',
  'RTA72 Riga -201 depart',
  'rta72 riga -13 land',
  'rta Riga -200 depart']);
