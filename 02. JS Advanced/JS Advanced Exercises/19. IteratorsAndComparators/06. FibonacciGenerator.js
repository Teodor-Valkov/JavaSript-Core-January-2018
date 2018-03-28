function * fibonacciGenerator () {
  let firstNumber = 1;
  let secondNumber = 1;

  while (true) {
    let oldFirstNumber = firstNumber;
    let oldSecondNumber = secondNumber;

    firstNumber = secondNumber;
    secondNumber = oldFirstNumber + oldSecondNumber;

    yield oldFirstNumber;
  }
}

let count = 0;
let fib = fibonacciGenerator();

for (let number of fib) {
  if (count > 10) {
    break;
  }

  count++;
  console.log(number);
}

// [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
