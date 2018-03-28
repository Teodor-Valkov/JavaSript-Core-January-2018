function solve (input) {
  let concert = {};

  for (let line in input) {
    let tokens = input[line].split('|');

    if (tokens.length !== 4) {
      continue;
    }

    let band = tokens[0].trim();
    let town = tokens[1].trim();
    let venue = tokens[3].trim();

    if (!concert[town]) {
      concert[town] = {};
    }

    if (!concert[town][venue]) {
      concert[town][venue] = [];
    }

    if (concert[town][venue].indexOf(band) === -1) {
      concert[town][venue].push(band);
    }
  }

  concert = sortObjectProperties(concert);

  for (let town in concert) {
    concert[town] = sortObjectProperties(concert[town]);

    for (let venue in concert[town]) {
      concert[town][venue].sort();
    }
  }

  console.log(JSON.stringify(concert));

  function sortObjectProperties (object) {
    let keys = Object.keys(object);
    let keysSorted = keys.sort();
    let sortedObject = {};

    // First way of sorting
    //
    // for (let i = 0; i < keysSorted.length; i++) {
    //     let key = keysSorted[i];
    //     sortedObject[key] = object[key];
    // }

    // Second way of sorting
    //
    // for (let index in keysSorted) {
    //     let key = keysSorted[index];
    //     sortedObject[key] = object[key];
    // }

    // Third way of sorting
    //
    for (let key of keysSorted) {
      sortedObject[key] = object[key];
    }

    return sortedObject;
  }
}

solve(['ZZ Top | London | 2-Aug-2014 | Wembley Stadium',
  'Iron Maiden | London | 28-Jul-2014 | Wembley Stadium',
  'Metallica | Sofia | 11-Aug-2014 | Lokomotiv Stadium',
  'Helloween | Sofia | 1-Nov-2014 | Vassil Levski Stadium',
  'Iron Maiden | Sofia | 20-June-2015 | Vassil Levski Stadium',
  'Helloween | Sofia | 30-July-2015 | Vassil Levski Stadium',
  'Iron Maiden | Sofia | 26-Sep-2014 | Lokomotiv Stadium',
  'Helloween | London | 28-Jul-2014 | Wembley Stadium',
  'Twisted Sister | London | 30-Sep-2014 | Wembley Stadium',
  'Metallica | London | 03-Oct-2014 | Olympic Stadium',
  'Iron Maiden | Sofia | 11-Apr-2016 | Lokomotiv Stadium',
  'Iron Maiden | Buenos Aires | 03-Mar-2014 | River Plate Stadium']);
