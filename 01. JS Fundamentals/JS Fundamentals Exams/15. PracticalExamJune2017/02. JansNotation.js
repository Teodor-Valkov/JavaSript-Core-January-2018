function solve (input) {
  let result = [];

  let instructions = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
  };

  for (let line of input) {
    let operation = instructions[line];

    if (operation === undefined) {
      result.push(line);
      continue;
    }

    let [secondNumber, firstNumber] = [result.pop(), result.pop()];

    if (firstNumber === undefined || secondNumber === undefined) {
      console.log('Error: not enough operands!');
      return;
    }

    result.push(operation(firstNumber, secondNumber));
  }

  console.log(result.length === 1 ? result.pop() : 'Error: too many operands!');
}

solve([3, 4, '+']);
// solve([5, 3, 4, '*', '-']);
// solve([7, 33, 8, '-']);
// solve([15, '/']);
// solve([31, 2, '+', 11, '/']);
// solve([-1, 1, '+', 101, '*', 18, '+', 3, '/']);
