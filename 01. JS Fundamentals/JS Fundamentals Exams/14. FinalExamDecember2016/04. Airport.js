function solve (input) {
  let planes = [];
  let towns = new Map();

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

    if ((!planes.includes(id) && action === 'land') || (planes.includes(id) && action === 'depart')) {
      isValid = true;
    }

    if (isValid) {
      switch (action) {
        case 'land':
          planes.push(id);

          checkTown(towns, name, id);

          towns.get(name)['arrivals'] += passengers;
          break;

        case 'depart':
          let planeIndex = planes.indexOf(id);
          planes.splice(planeIndex, 1);

          checkTown(towns, name, id);

          towns.get(name)['departures'] += passengers;
          break;

        default:
          console.log('Invalid input.');
          break;
      }
    }
  }

  function checkTown (towns, name, id) {
    if (!towns.has(name)) {
      let town = {
        planes: new Set(),
        arrivals: 0,
        departures: 0
      };

      town['planes'].add(id);
      towns.set(name, town);
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

    let names = Array.from(towns.keys());
    let sortedNames = names.sort((a, b) => {
      if (towns.get(a)['arrivals'] === towns.get(b)['arrivals']) {
        return a.localeCompare(b);
      }

      return towns.get(b)['arrivals'] - towns.get(a)['arrivals'];
    });

    for (let name of sortedNames) {
      let town = towns.get(name);
      console.log(name);
      console.log(`Arrivals: ${town['arrivals']}`);
      console.log(`Departures: ${town['departures']}`);
      console.log('Planes:');

      let sortedPlanes = Array.from(town['planes']).sort((a, b) => {
        return a.localeCompare(b);
      });

      for (let plane of sortedPlanes) {
        console.log(`-- ${plane}`);
      }
    }
  }
}

solve(['RTA72 London -10 land',
  'RTA#72 Brussels -110 depart',
  'RTA7!2 Warshaw 350 land',
  'RTA72 Riga -201 depart',
  'rta72 riga -13 land',
  'rta Riga -200 depart']);
