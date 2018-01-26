// Task 1 - Multiply Numbers
//
function multiplyNumbers (firstNumber, secondNumber) {
  let product = firstNumber * secondNumber;

  console.log(product);
}

multiplyNumbers(3, 2);

// Task 2 - Boxes And Bottles
//
function boxesAndBottles (bottles, capacity) {
  let boxes = Math.ceil(bottles / capacity);

  console.log(boxes);
}

boxesAndBottles(20, 5);

// Task 3 - Leap Year
//
function leapYear (year) {
  let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  console.log(isLeapYear ? 'yes' : 'no');
}

leapYear(1999);

// Task 4 - Circle Area
//
function circleArea (radius) {
  let area = Math.PI * radius * radius;
  console.log(area);

  let roundedArea = area.toFixed(2);
  console.log(roundedArea);
}

circleArea(5);

// Task 5 - Triangle Area
//
function triangleArea (firstSide, secondSide, thirdSide) {
  let halfPerimeter = (firstSide + secondSide + thirdSide) / 2;
  let area = Math.sqrt(halfPerimeter * (halfPerimeter - firstSide) * (halfPerimeter - secondSide) * (halfPerimeter - thirdSide));

  console.log(area);
}

triangleArea(2, 3.5, 4);

// Task 6 - Cone Volume And Area
//
function coneVolumeAndArea (radius, height) {
  let volume = Math.PI * radius * radius * height * (1 / 3);
  let area = Math.PI * radius * (radius + Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2)));

  console.log('volume = ' + volume);
  console.log('area = ' + area);
}

coneVolumeAndArea(3, 5);

// Task 7 - Odd Or Even
//
function oddOrEven (number) {
  if (number % 2 === 0) {
    console.log('even');
  } else if (number % 2 === 1 || number % 2 === -1) {
    console.log('odd');
  } else {
    console.log('invalid');
  }
}

oddOrEven(5);

// Task 8 - Fruit Or Vegetable
//
function fruitOrVegetable (input) {
  if (input === 'banana' || input === 'kiwi' || input === 'cherry' || input === 'peach' || input === 'grapes' || input === 'lemon' || input === 'apple') {
    console.log('fruit');
  } else if (input === 'tomato' || input === 'cucumber' || input === 'onion' || input === 'parsley' || input === 'garlic' || input === 'pepper') {
    console.log('vegetable');
  } else {
    console.log('unknown');
  }
}

fruitOrVegetable('banana');

// Task 9 - Colorful Numbers
//
function colorfulNumbers (number) {
  console.log('<ul>');

  for (let i = 1; i <= number; i++) {
    let color = i % 2 === 0 ? 'blue' : 'green';

    console.log(`<li><span style='color:${color}'>${i}</span></li>`);
  }

  console.log('</ul>');
}

colorfulNumbers(10);

// Task 10 - Chess Board
//
function chessBoard (number) {
  console.log('<div class="chessboard">');

  for (let i = 1; i <= number; i++) {
    console.log('<div>');

    for (let j = 0; j < number; j++) {
      if (i % 2 === 0) {
        if (j % 2 === 0) {
          console.log(`<span class="white"></span>`);
        } else {
          console.log(`<span class="black"></span>`);
        }
      } else {
        if (j % 2 === 0) {
          console.log(`<span class="black"></span>`);
        } else {
          console.log(`<span class="white"></span>`);
        }
      }
    }

    console.log('</div>');
  }

  console.log('</div>');
}

chessBoard(3);

// Task 11 - Binary Logarithm
//
function binaryLogarithm (numbers) {
  for (let i = 0; i < numbers.length; i++) {
    console.log(Math.log2(numbers[i]));
  }
}

binaryLogarithm(2);

// Task 12 - Prime Number Checker
//
function primeNumberChecker (number) {
  let prime = true;

  for (let divider = 2; divider <= Math.sqrt(number); divider++) {
    if (number % divider === 0) {
      prime = false;
      break;
    }
  }

  console.log(prime && (number > 1));
}

primeNumberChecker(7);
