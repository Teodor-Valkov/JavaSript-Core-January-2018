function solve (input) {
  let tourists = {};
  let sortingRule = input.pop();

  for (let line of input) {
    let tokens = line.split(/\.*\*\.*/g);
    let name = tokens[0];
    let luggageName = tokens[1];
    let isFood = tokens[2] === 'true';
    let isDrink = tokens[3] === 'true';
    let isFragile = tokens[4] === 'true';
    let weight = Number(tokens[5]);
    let transferredWith = tokens[6];
    let typeofLuggage = 'other';

    if (isFood) {
      typeofLuggage = 'food';
    }

    if (isDrink) {
      typeofLuggage = 'drink';
    }

    if (!tourists.hasOwnProperty(name)) {
      tourists[name] = {};
    }

    tourists[name][luggageName] = {
      kg: weight,
      fragile: isFragile,
      type: typeofLuggage,
      transferredWith: transferredWith
    };
  }

  if (sortingRule === 'luggage name') {
    let names = Object.keys(tourists);

    for (let name of names) {
      tourists[name] = sortObjectByLuggageName(tourists[name]);
    }
  }

  function sortObjectByLuggageName (object) {
    let keys = Object.keys(object);
    let keysSorted = keys.sort((a, b) => {
      return a.localeCompare(b);
    });

    let sortedObject = {};

    for (let key of keysSorted) {
      sortedObject[key] = object[key];
    }

    return sortedObject;

    // return Object.keys(object).sort().reduce((sortedObject, key) => {
    //     sortedObject[key] = object[key];
    //     return sortedObject;
    // }, {});
  }

  if (sortingRule === 'weight') {
    let names = Object.keys(tourists);

    for (let name of names) {
      tourists[name] = sortObjectbyWeight(tourists[name]);
    }
  }

  function sortObjectbyWeight (object) {
    let keys = Object.keys(object);
    let keysSorted = keys.sort((a, b) => {
      return object[a]['kg'] - object[b]['kg'];
    });

    let sortedObject = {};

    for (let key of keysSorted) {
      sortedObject[key] = object[key];
    }

    return sortedObject;

    // return Object.keys(object).sort((a, b) => object[a].kg - object[b].kg).reduce((sortedObject, key) => {
    //     sortedObject[key] = object[key];
    //     return sortedObject;
    // }, {});
  }

  console.log(JSON.stringify(tourists));
}

solve(['Yana Slavcheva.*.clothes.*.false.*.false.*.false.*.2.2.*.backpack',
  'Kiko.*.socks.*.false.*.false.*.false.*.0.2.*.backpack',
  'Kiko.*.banana.*.true.*.false.*.false.*.3.2.*.backpack',
  'Kiko.*.sticks.*.false.*.false.*.false.*.1.6.*.ATV',
  'Kiko.*.glasses.*.false.*.false.*.true.*.3.*.ATV',
  'Manov.*.socks.*.false.*.false.*.false.*.0.3.*.ATV',
  'luggage name']);

solve([
  'Yana Slavcheva.*.clothes.*.false.*.false.*.false.*.2.2.*.backpack',
  'Kiko.*.socks.*.false.*.false.*.false.*.0.2.*.backpack',
  'Kiko.*.banana.*.true.*.false.*.false.*.3.2.*.backpack',
  'Kiko.*.sticks.*.false.*.false.*.false.*.1.6.*.ATV',
  'Kiko.*.glasses.*.false.*.false.*.true.*.3.*.ATV',
  'Manov.*.socks.*.false.*.false.*.false.*.0.3.*.ATV',
  'weight'
]);

solve(['Yana Slavcheva.*.clothes.*.false.*.false.*.false.*.2.2.*.backpack',
  'Kiko.*.socks.*.false.*.false.*.false.*.0.2.*.backpack',
  'Kiko.*.banana.*.true.*.false.*.false.*.3.2.*.backpack',
  'Kiko.*.sticks.*.false.*.false.*.false.*.1.6.*.ATV',
  'Kiko.*.glasses.*.false.*.false.*.true.*.3.*.ATV',
  'Manov.*.socks.*.false.*.false.*.false.*.0.3.*.ATV',
  'strict']);
