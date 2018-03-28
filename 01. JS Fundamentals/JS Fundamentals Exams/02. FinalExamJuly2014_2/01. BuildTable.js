function solve (input) {
  let startNumber = Number(input[0]);
  let endNumber = Number(input[1]);
  let fibonacciNumbers = findFibonacciNumbers(endNumber);

  console.log('<table>');
  console.log('<tr><th>Num</th><th>Square</th><th>Fib</th></tr>');

  for (let number = startNumber; number <= endNumber; number++) {
    let squareNumber = number * number;
    let isFibonacci = fibonacciNumbers[number] ? 'yes' : 'no';

    printRow(number, squareNumber, isFibonacci);
  }

  console.log('</table>');

  function findFibonacciNumbers (maxNumber) {
    let fibonacciNumbers = {
      1: true
    };

    let firstNumber = 1;
    let secondNumber = 1;

    while (true) {
      let thirdNumber = firstNumber + secondNumber;

      if (thirdNumber > maxNumber) {
        return fibonacciNumbers;
      }

      fibonacciNumbers[thirdNumber] = true;
      firstNumber = secondNumber;
      secondNumber = thirdNumber;
    }
  }

  function printRow (number, squareNumber, isFibonacci) {
    let row = '<tr>';
    row += '<td>' + number + '</td>';
    row += '<td>' + squareNumber + '</td>';
    row += '<td>' + isFibonacci + '</td>';
    row += '</tr>';

    console.log(row);
  }
}

solve([2, 6]);
