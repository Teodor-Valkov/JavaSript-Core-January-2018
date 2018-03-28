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
    let weight = parseFloat(tokens[5]);
    let transferredWith = tokens[6];
    let typeofLuggage = 'other';

    if (isFood) {
      typeofLuggage = 'food';
    }

    if (isDrink) {
      typeofLuggage = 'drink';
    }

    if (!tourists[name]) {
      tourists[name] = {};
    }

    tourists[name][luggageName] = {
      kg: weight,
      fragile: isFragile,
      type: typeofLuggage,
      transferredWith: transferredWith
    };
  }

  let names = Object.keys(tourists);

  switch (sortingRule) {
    case 'luggage name':
      for (let name of names) {
        let luggages = Object.keys(tourists[name]);
        let luggagesSorted = luggages.sort();

        let sortedLuggage = {};

        for (let luggage of luggagesSorted) {
          sortedLuggage[luggage] = tourists[name][luggage];
        }

        tourists[name] = sortedLuggage;
      }
      break;
    case 'weight':
      for (let name of names) {
        let luggages = Object.keys(tourists[name]);
        let luggagesSorted = luggages.sort((a, b) => {
          return tourists[name][a]['kg'] - tourists[name][b]['kg'];
        });

        let sortedLuggage = {};

        for (let luggage of luggagesSorted) {
          sortedLuggage[luggage] = tourists[name][luggage];
        }

        tourists[name] = sortedLuggage;
      }
      break;
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
