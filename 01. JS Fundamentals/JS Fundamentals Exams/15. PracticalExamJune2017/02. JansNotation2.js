function solve (input) {
  let result = [];

  for (let line of input) {
    if (Number.isInteger(line)) {
      result.push(line);
      continue;
    }

    if (result.length < 2) {
      console.log('Error: not enough operands!');
      return;
    }

    let secondNumber = result.pop();
    let firstNumber = result.pop();

    switch (line) {
      case '+':
        result.push(firstNumber + secondNumber);
        break;
      case '-':
        result.push(firstNumber - secondNumber);
        break;
      case '*':
        result.push(firstNumber * secondNumber);
        break;
      case '/':
        result.push(firstNumber / secondNumber);
        break;
      default:
        console.log('Invalid input.');
        break;
    }
  }

  console.log(result.length === 1 ? result.pop() : 'Error: too many operands!');
}

solve([3, 4, '+']);
// solve([5, 3, 4, '*', '-']);
// solve([7, 33, 8, '-']);
// solve([15, '/']);
// solve([31, 2, '+', 11, '/']);
// solve([-1, 1, '+', 101, '*', 18, '+', 3, '/']);
