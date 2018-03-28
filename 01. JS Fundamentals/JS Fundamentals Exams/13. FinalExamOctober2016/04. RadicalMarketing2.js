function solve (input) {
  let people = {};

  for (let line of input) {
    let tokens = line.split('-');

    if (tokens.length === 1) {
      let name = tokens[0];

      if (!people.hasOwnProperty(name)) {
        let person = {
          subscribers: [],
          count: 0
        };

        people[name] = person;
      }
    } else if (tokens.length === 2) {
      let subscriber = tokens[0];
      let name = tokens[1];

      if (!people.hasOwnProperty(subscriber) || !people.hasOwnProperty(name)) {
        continue;
      }

      if (subscriber === name || people[name]['subscribers'].some(s => s === subscriber)) {
        continue;
      }

      people[name]['subscribers'].push(subscriber);
      people[subscriber]['count'] += 1;
    }
  }

  let names = Object.keys(people);

  // First way of sorting
  //
  let namesSorted = names.sort((a, b) => {
    if (people[a]['subscribers'].length === people[b]['subscribers'].length) {
      return people[b]['count'] - people[a]['count'];
    }
    return people[b]['subscribers'].length - people[a]['subscribers'].length;
  });

  // Second way of sorting
  //
  // let namesSorted = names.sort((a, b) => people[b]['subscribers'].length - people[a]['subscribers'].length || people[b]['count'] - people[a]['count']);

  let firstName = namesSorted[0];
  let count = 1;

  console.log(firstName);

  for (let subscriber of people[firstName]['subscribers']) {
    console.log(`${count++}. ${subscriber}`);
  }
}

solve(['Z',
  'O',
  'R',
  'D',
  'Z-O',
  'R-O',
  'D-O',
  'P',
  'O-P',
  'O-Z',
  'R-Z',
  'D-Z']);
