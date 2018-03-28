function solve (keyword, input) {
  let regexCoordinates = /(?:north|east)(?:.|\n|\t)*?(?:([0-9]{2})[^,]*?,[^,]*?([0-9]{6}))/gi;
  let regexMessage = new RegExp(`${keyword}((?:.|\n|\t)*?)${keyword}`);
  // let regexCoordinates = /(?:north|east)(?:[\w\W]*?)(?:([0-9]{2})[^,]*?,[^,]*?([0-9]{6}))/gi;
  // let regexMessage = new RegExp(`${keyword}((?:[\\w\\W]*?))${keyword}`);
  // let regexCoordinates = /(?:north|east)(?:[\s\S]*?)(?:([0-9]{2})[^,]*?,[^,]*?([0-9]{6}))/gi;
  // let regexMessage = new RegExp(`${keyword}((?:[\\s\\S]*?))${keyword}`);

  let north = '';
  let east = '';

  let coordinate = regexCoordinates.exec(input);

  while (coordinate) {
    if (coordinate[0].toLowerCase().startsWith('north')) {
      north = coordinate[1] + '.' + coordinate[2];
    }

    if (coordinate[0].toLowerCase().startsWith('east')) {
      east = coordinate[1] + '.' + coordinate[2];
    }

    coordinate = regexCoordinates.exec(input);
  }

  let message = regexMessage.exec(input)[1];

  console.log(`${north} N`);
  console.log(`${east} E`);
  console.log(`Message: ${message}`);
}

solve('&amp', '(&ampThe only time to eat diet food is while you\'re waiting for the steak to cook&amp(east)(23),(234567)\tNORTH\n 48,(((543678');
// solve('4ds', 'eaSt 19,432567noRt north east 53,123456north 43,3213454dsNot all those who wander are lost.4dsnorth 47,874532');
// solve('<>', 'o u%&lu43t&^ftgv><nortH4276hrv756dcc,  jytbu64574655k <>ThE sanDwich is iN the refrIGErator<>yl i75evEAsTer23,lfwe 987324tlblu6b');
