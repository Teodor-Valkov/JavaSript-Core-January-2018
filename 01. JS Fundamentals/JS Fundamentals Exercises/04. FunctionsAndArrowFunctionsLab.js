// Task 1 - Triangle of Stars
//
function triangleOfStars (number) {
  for (let i = 1; i <= number; i++) {
    printStars(i);
  }

  for (let i = number - 1; i >= 1; i--) {
    printStars(i);
  }

  function printStars (count) {
    console.log('*'.repeat(count));
  }
}

triangleOfStars(5);

// Task 2 - Square of Stars
//
function squareOfStars (number = 5) {
  for (let i = 0; i < number; i++) {
    console.log('*'.repeat(number).split('').join(' '));
  }
}

squareOfStars(10);

// Task 3 - Palindrome
//
function palindrome (input) {
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== input[input.length - i - 1]) {
      console.log(false);
    }
  }

  console.log(true);

  // console.log(input.split('').reverse().join('') === input);
}

palindrome('abba');

// Task 4 - Day of the Week
//
function dayOfTheWeek (day) {
  switch (day) {
    case 'Monday':
      console.log(1);
      return;
    case 'Tuesday':
      console.log(2);
      return;
    case 'Wednesday':
      console.log(3);
      return;
    case 'Thursday':
      console.log(4);
      return;
    case 'Friday':
      console.log(5);
      return;
    case 'Saturday':
      console.log(6);
      return;
    case 'Sunday':
      console.log(7);
      return;
    default:
      console.log('error');
  }
}

dayOfTheWeek('Friday');

// Task 5 - Functional Calculator
//
function functionalCalculator (firstNumber, secondNumber, sign) {
  let add = (a, b) => a + b;
  let subtract = (a, b) => a - b;
  let multiply = (a, b) => a * b;
  let divide = (a, b) => a / b;

  let calc = (firstNumber, secondNumber, func) => func(firstNumber, secondNumber);

  switch (sign) {
    case '+':
      console.log(calc(firstNumber, secondNumber, add));
      return;
    case '-':
      console.log(calc(firstNumber, secondNumber, subtract));
      return;
    case '*':
      console.log(calc(firstNumber, secondNumber, multiply));
      return;
    case '/':
      console.log(calc(firstNumber, secondNumber, divide));
  }
}

functionalCalculator('2', '4', '+');

// Task 6 - Aggregate Elements
//
function aggregateElements (input) {
  aggregate(input, 0, (a, b) => a + b);
  aggregate(input, 0, (a, b) => a + 1 / b);
  aggregate(input, '', (a, b) => a + b);

  function aggregate (input, initialValue, func) {
    let value = initialValue;

    for (let i = 0; i < input.length; i++) {
      value = func(value, input[i]);
    }

    console.log(value);
  }
}

aggregateElements([1, 2, 3]);

// Task 7 - Words Uppercase
//
function wordsUppercase (input) {
  let inputUppercase = input.toUpperCase();
  let words = extractWords();

  words = words.filter(w => w !== '');
  // words = words.filter(Boolean);

  console.log(words.join(', '));

  function extractWords () {
    return inputUppercase.split(/\W+/);
  }
}

wordsUppercase('Hi, how are you?');
