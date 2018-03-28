function solve (input) {
  let min = new Date('1900, 1, 1');
  let breakPoint = new Date('1973, 5, 25');
  let max = new Date('2015, 1, 1');

  let dates = [];
  let hasHater = false;
  let hasFan = false;

  for (let line in input) {
    let dateAsString = input[line];
    let dateParts = dateAsString.split('.');
    let date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);

    if (date > min && date < max) {
      if (date < breakPoint) {
        hasHater = true;
      }

      if (date >= breakPoint) {
        hasFan = true;
      }

      dates.push(date);
    }
  }

  dates.sort((a, b) => {
    return a.getTime() - b.getTime();
  });

  if (hasFan) {
    printResult(dates[dates.length - 1], 'fan');
  }

  if (hasHater) {
    printResult(dates[0], 'hater');
  }

  if (!dates.length) {
    console.log('No result');
  }

  function printResult (date, type) {
    console.log('The biggest ' + type + ' of ewoks was born on ' + date.toDateString());
  }
}

solve(['22.03.2014',
  '17.05.1933',
  '10.10.1954']);
