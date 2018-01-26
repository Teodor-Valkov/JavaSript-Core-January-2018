// Task 1 - Sum Three Numbers
//
function sumThreeNumbers (firstNumber, secondNumber, thirdNumber) {
  let sum = firstNumber + secondNumber + thirdNumber;
  console.log(sum);
}

sumThreeNumbers(2, 3, 4);

// Task 2 - Sum And Vat
//
function sumAndVat (input) {
  let numbers = input.map(token => {
    return Number(token);
  });

  let sum = numbers.reduce((a, b) => {
    return a + b;
  });

  let vat = sum / 5;
  let total = sum + vat;

  console.log(`sum = ${sum}`);
  console.log(`VAT = ${vat}`);
  console.log(`total = ${total}`);
}

sumAndVat([1.20, 2.60, 3.50]);

// Task 3 - Letter Occurences In String
//
function letterOccurencesInString (word, symbol) {
  let count = 0;

  for (const letter of word) {
    if (symbol === letter) {
      count++;
    }
  }

  console.log(count);
}

letterOccurencesInString('hello', 'l');

// Task 4 - Filter By Age
//
function filterByAge (minumumAge, firstName, firstAge, secondName, secondAge) {
  let firstPerson = {
    name: firstName,
    age: firstAge
  };

  let secondPerson = {
    name: secondName,
    age: secondAge
  };

  let people = [];
  people.push(firstPerson, secondPerson);

  people = people.filter(person => {
    return person.age >= minumumAge;
  });

  people.forEach(person => {
    console.log(person);
  });
}

filterByAge(12, 'Ivan', 15, 'Asen', 9);

// Task 5 - String Of Numbers From One To N
//
function stringOfNumbersFromOneToN (numberAsString) {
  let number = Number(numberAsString);

  let result = '';

  for (let i = 1; i <= number; i++) {
    result += i;
  }

  console.log(result);
}

stringOfNumbersFromOneToN('11');

// Task 6 - Figure Area
//
function figureArea (firstWidth, firstHeight, secondWidth, secondHeight) {
  let area = firstWidth * firstHeight + secondWidth * secondHeight;
  let smallArea = Math.min(firstWidth, secondWidth) * Math.min(firstHeight, secondHeight);

  console.log(area - smallArea);
}

figureArea(2, 4, 5, 3);

// Task 7 - Next Day
//
function nextDay (year, month, day) {
  let today = new Date(year, month - 1, day);
  let tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000);

  console.log(tomorrow.getFullYear() + '-' + (tomorrow.getMonth() + 1) + '-' + tomorrow.getDate());
}

nextDay(2016, 9, 30);

// Task 8 - Distance Between Points
//
function distanceBetweenPoints (firstX, firstY, secondX, secondY) {
  let pointA = {
    x: firstX,
    y: firstY
  };

  let pointB = {
    x: secondX,
    y: secondY
  };

  let distanceX = Math.pow(pointA.x - pointB.x, 2);
  let distanceY = Math.pow(pointA.y - pointB.y, 2);
  let totalDistance = Math.sqrt(distanceX + distanceY);

  console.log(totalDistance);
}

distanceBetweenPoints(2, 4, 5, 0);
