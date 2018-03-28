function solve (keyword, input) {
  let regexCoordinates = /(north|east)\D*(\d{2})[^,]*?,\D*?(\d{6})/gi;
  let regexMessage = new RegExp(`${keyword}(.*?)${keyword}`, 'g');

  let north = '';
  let east = '';

  let coordinate = regexCoordinates.exec(input);

  while (coordinate) {
    if (coordinate[1].toLowerCase() === 'north') {
      north = coordinate[2] + '.' + coordinate[3];
    }

    if (coordinate[1].toLowerCase() === 'east') {
      east = coordinate[2] + '.' + coordinate[3];
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
