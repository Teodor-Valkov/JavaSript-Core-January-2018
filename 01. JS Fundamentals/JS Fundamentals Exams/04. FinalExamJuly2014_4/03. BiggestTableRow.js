function solve (input) {
  let biggestSum = -Infinity;
  let biggestSumAsString = '';

  for (let i = 2; i < input.length - 1; i++) {
    let numbers = input[i].match(/-?[.\d]+/g);
    let sum = 0;

    if (numbers !== undefined) {
      for (let j = 0; j < numbers.length; j++) {
        sum += Number(numbers[j]);
      }

      if (sum > biggestSum) {
        biggestSum = sum;
        biggestSumAsString = sum + ' =';

        for (let k = 0; k < numbers.length; k++) {
          biggestSumAsString += ' ' + numbers[k] + ' +';
        }
      }
    }
  }

  if (biggestSumAsString === '') {
    console.log('no data');
  } else {
    console.log(biggestSumAsString.slice(0, biggestSumAsString.length - 2));
  }
}

solve(['<table>',
  '<tr><th>Town</th><th>Store1</th><th>Store2</th><th>Store3</th></tr>',
  '<tr><td>Sofia</td><td>26.2</td><td>8.20</td><td>-</td></tr>',
  '<tr><td>Varna</td><td>11.2</td><td>18.00</td><td>36.10</td></tr>',
  '<tr><td>Plovdiv</td><td>17.2</td><td>12.3</td><td>6.4</td></tr>',
  '<tr><td>Bourgas</td><td>-</td><td>24.3</td><td>-</td></tr>',
  '</table>']);
