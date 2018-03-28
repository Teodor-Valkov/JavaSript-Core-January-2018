let fib = (function () {
  let firstNumber = 1;
  let secondNumber = 1;

  return () => {
    let oldFirstNumber = firstNumber;
    let oldSecondNumber = secondNumber;

    firstNumber = secondNumber;
    secondNumber = oldFirstNumber + oldSecondNumber;

    return oldFirstNumber;
  };
})();

console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
console.log(fib());
