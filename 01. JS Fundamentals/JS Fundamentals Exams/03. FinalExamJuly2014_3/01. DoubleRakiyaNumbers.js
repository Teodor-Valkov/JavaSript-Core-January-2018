function solve (input) {
  let startNumber = Number(input[0]);
  let endNumber = Number(input[1]);

  console.log('<ul>');

  for (let number = startNumber; number <= endNumber; number++) {
    if (isDoubleRakiyaNumber(number)) {
      console.log('<li>' +
                '<span class=\'rakiya\'>' + number + '</span>' +
                '<a href="view.php?id=' + number + '>View</a>' +
                '</li>');
    } else {
      console.log('<li><span class=\'num\'>' + number + '</span></li>');
    }
  }

  console.log('</ul>');

  function isDoubleRakiyaNumber (number) {
    let numberAsString = String(number);
    let existingPairs = {};

    for (let i = 1; i < numberAsString.length; i++) {
      let pair = numberAsString.substr(i - 1, 2);

      if (existingPairs[pair]) {
        if (i - existingPairs[pair] > 1) {
          return true;
        }
      } else {
        existingPairs[pair] = i;
      }
    }

    return false;
  }
}

solve([11210, 11215]);
