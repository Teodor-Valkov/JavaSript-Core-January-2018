function solve (input) {
  let people = new Map();
  let subscribers = new Map();

  for (let line of input) {
    if (line.indexOf('-') === -1) {
      let name = line;

      if (!people.has(name) && !subscribers.has(name)) {
        people.set(name, []);
        subscribers.set(name, 0);
      }
    } else if (line.indexOf('-') !== -1) {
      let [subscriber, name] = line.split('-');

      if (!people.has(subscriber) || !people.has(name)) {
        continue;
      }

      if (subscriber === name || people.get(name).some(s => s === subscriber)) {
        continue;
      }

      people.get(name).push(subscriber);
      subscribers.set(subscriber, subscribers.get(subscriber) + 1);
    }
  }

  let names = Array.from(people.keys());

  // First way of sorting
  //
  let namesSorted = names.sort((a, b) => {
    if (people.get(a).length === people.get(b).length) {
      return subscribers.get(b) - subscribers.get(a);
    }

    return people.get(b).length - people.get(a).length;
  });

  // Second way of sorting
  //
  // let namesSorted = names.sort((a, b) => people.get(b).length - people.get(a).length || subscribers.get(b) - subscribers.get(a));

  let firstName = namesSorted[0];
  let count = 1;

  console.log(firstName);

  for (let subscriber of people.get(firstName)) {
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
