// Task 1 - Hello JavaScript
//
function helloJavaScript (name) {
  console.log(`Hello, ${name}, I am JavaScript!`);
}

helloJavaScript('Pesho');

// Task 2 - Area and Perimeter
//
function areaAndPerimeter (x, y) {
  let area = x * y;
  let perimeter = x * 2 + y * 2;

  console.log(area);
  console.log(perimeter);
}

areaAndPerimeter(1, 3);

// Task 3 - Distance over Time
//
function distanceOverTime ([firstSpeed, secondSpeed, timeInSeconds]) {
  let distance1 = (firstSpeed / 3.6) * timeInSeconds;
  let distance2 = (secondSpeed / 3.6) * timeInSeconds;

  console.log(Math.abs(distance1 - distance2));
}

distanceOverTime([0, 60, 3600]);

// Task 4 - Distance in 3D
//
function distanceIn3D ([firstX, firstY, firstZ, secondX, secondY, secondZ]) {
  let deltaX = firstX - secondX;
  let deltaY = firstY - secondY;
  let deltaZ = firstZ - secondZ;

  let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));

  console.log(distance);
}

distanceIn3D([3.5, 0, 1, 0, 2, -1]);

// Task 5 - Grads to Degrees
//
function gradsToDegrees (grads) {
  grads = grads % 400;
  let degrees = grads * 0.9;

  if (degrees < 0) {
    degrees += 360;
  }

  console.log(degrees);
}

gradsToDegrees(850);

// Task 6 - Compound Interest
//
function compoundInterest ([sum, interestRate, frequency, years]) {
  interestRate = interestRate / 100;
  frequency = 12 / frequency;

  let compoundInterest = sum * Math.pow(1 + interestRate / frequency, frequency * years);
  console.log(compoundInterest.toFixed(2));
}

compoundInterest([100000, 5, 12, 25]);

// Task 7 - Rounding
//
function rounding ([number, precision]) {
  if (precision > 15) {
    precision = 15;
  }

  console.log(Number(number.toFixed(precision)));
  // console.log(+number.toFixed(precision));
}

rounding([3.1415926535897932384626433832795, 2]);

// Task 8 - Imperial Units
//
function imperialUnits (inches) {
  // let feet = Math.floor(inches / 12);
  let feet = parseInt(inches / 12);
  inches = inches % 12;

  console.log(`${feet}'-${inches}"`);
}

imperialUnits(55);

// Task 9 - Now Playing
//
function nowPlaying ([track, artist, duration]) {
  console.log(`Now Playing: ${artist} - ${track} [${duration}]`);
}

nowPlaying(['Number One', 'Nelly', '4:09']);

// Task 10 - Compose Tag
//
function composeTag ([fileLocaton, alternateText]) {
  console.log(`<img src="${fileLocaton}" alt="${alternateText}">`);
}

composeTag(['smiley.gif', 'Smiley Face']);

// Task 11 - Binary to Decimal
//
function binaryToDecimal (binaryNumber) {
  // First way
  console.log(Number('0b' + binaryNumber));

  // Second way
  console.log(parseInt(binaryNumber, 2));
}

binaryToDecimal('00001001');

// Task 12 - Assign Properties
//
function assignProperties ([firstProperty, firstValue, secondProperty, secondValue, thirdProperty, thirdValue]) {
  let object = {};
  object[firstProperty] = firstValue;
  object[secondProperty] = secondValue;
  object[thirdProperty] = thirdValue;

  console.log(object);
}

assignProperties(['name', 'Pesho', 'age', '23', 'gender', 'male']);

// Task 13 - Last Month
//
function lastMonth ([day, month, year]) {
  let date = new Date(year, month - 1, 0);
  let days = date.getDate();

  console.log(days);
}

lastMonth([17, 3, 2002]);

// Task 14 - Biggest of Three Numbers
//
function biggestOfThreeNumbers ([firstNumber, secondNumber, thirdNumber]) {
  console.log(Math.max(firstNumber, secondNumber, thirdNumber));
}

biggestOfThreeNumbers([5, -2, 7]);

// Task 15 - Point in Rectangle
//
function pointInRectangle ([x, y, xMin, xMax, yMin, yMax]) {
  if (x >= xMin && x <= xMax && y >= yMin && y <= yMax) {
    console.log('inside');
  } else {
    console.log('outside');
  }
}

pointInRectangle([8, -1, 2, 12, -3, 3]);

// Task 16 - Odd Numbers from One to N
//
function oddNumbersFromOneToN (number) {
  for (let i = 1; i <= number; i += 2) {
    console.log(i);
  }
}

oddNumbersFromOneToN(7);

// Task 17 - Triangle of Dollars
//
function triangleOfDollars (number) {
  for (let i = 1; i <= number; i++) {
    console.log('$'.repeat(i));
  }
}

triangleOfDollars(7);

// Task 18 - Movie Prices
//
function moviePrices ([title, day]) {
  title = title.toLowerCase();
  day = day.toLowerCase();

  let price = '';

  if (title === 'the godfather') {
    switch (day) {
      case 'monday':
        price = 12;
        break;
      case 'tuesday':
        price = 10;
        break;
      case 'wednesday':
        price = 15;
        break;
      case 'thursday':
        price = 12.50;
        break;
      case 'friday':
        price = 15;
        break;
      case 'saturday':
        price = 25;
        break;
      case 'sunday':
        price = 30;
        break;
      default:
        price = 'error';
    }
  } else if (title === "schindler's list") {
    switch (day) {
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
        price = 8.50;
        break;
      case 'saturday':
      case 'sunday':
        price = 15;
        break;
      default:
        price = 'error';
    }
  } else if (title === 'casablanca') {
    switch (day) {
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
        price = 8;
        break;
      case 'saturday':
      case 'sunday':
        price = 10;
        break;
      default:
        price = 'error';
    }
  } else if (title === 'the wizard of oz') {
    switch (day) {
      case 'monday':
      case 'tuesday':
      case 'wednesday':
      case 'thursday':
      case 'friday':
        price = 10;
        break;
      case 'saturday':
      case 'sunday':
        price = 15;
        break;
      default:
        price = 'error';
    }
  }

  console.log(price);
}

moviePrices(['Schindler\'s List', 'Thursday']);

// Task 19 - Quadratic Equation
//
function quadraticEquation (a, b, c) {
  let discriminant = Math.pow(b, 2) - 4 * a * c;

  if (discriminant > 0) {
    let x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    let x2 = (-b - Math.sqrt(discriminant)) / (2 * a);

    console.log(Math.min(x1, x2));
    console.log(Math.max(x1, x2));
  } else if (discriminant === 0) {
    let x = -b / (2 * a);

    console.log(x);
  } else if (discriminant < 0) {
    console.log('No');
  }
}

quadraticEquation(6, 11, -35);

// Task 20 - Multiplication Table
//
function multiplicationTable (number) {
  let table = '<table border="1">\n';

  for (let row = 0; row <= number; row++) {
    table += '<tr>\n';

    for (let col = 0; col <= number; col++) {
      if (row === 0) {
        if (col === 0) {
          table += '<th>x</th>';
        } else {
          table += '<th>' + (col) + '</th>';
        }
      } else {
        if (col === 0) {
          table += '<th>' + (row) + '</th>';
        } else {
          table += '<td>' + (row * col) + '</td>';
        }
      }
    }

    table += '</tr>\n';
  }

  table += '</table>';
  console.log(table);
}

multiplicationTable(5);

// Task 20 - Multiplication Table
//
function multiplicationTable2 (number) {
  let table = '<table border="1">\n';
  table += '<tr><th>x</th>';

  for (let row = 1; row <= number; row++) {
    table += `<th>${row}</th>`;
  }

  table += '<tr>\n';

  for (let row = 1; row <= number; row++) {
    table += `\t<tr><th>${row}</th>`;

    for (let col = 1; col <= number; col++) {
      table += `<td>${row * col}</td>`;
    }

    table += '</tr>\n';
  }

  table += '</table>';
  console.log(table);
}

multiplicationTable2(5);

// Task 21 - Figure of Four Squares
//
function figureOfFourSquares (number) {
  let length = number % 2 === 0 ? number - 1 : number;

  for (let i = 1; i <= length; i++) {
    if (i === 1 || i === length || (length + 1) / i === 2) {
      console.log('+' + '-'.repeat(number - 2) + '+' + '-'.repeat(number - 2) + '+');
    } else {
      console.log('|' + ' '.repeat(number - 2) + '|' + ' '.repeat(number - 2) + '|');
    }
  }
}

figureOfFourSquares(7);

// Task 22 - Monthly Calendar
//
function monthlyCalendar ([day, month, year]) {
  month -= 1;
  let dayOfWeek = new Date(year, month, 1).getDay();
  let daysOfLastMonth = 0;
  let previousMonthDays = 0;

  let html = '<table>\n';
  html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n';
  html += '<tr>';

  if (dayOfWeek !== 0) {
    let daysInLastMonth = new Date(year, month, 0).getDate();
    daysOfLastMonth = dayOfWeek;

    for (let i = 1; i <= daysOfLastMonth; i++) {
      html += `<td class="prev-month">${daysInLastMonth - daysOfLastMonth + i}</td>`;
      previousMonthDays++;
    }
  }

  let currentMonthDays = 1;

  for (let i = previousMonthDays; i < 7; i++) {
    if (currentMonthDays === day) {
      html += `<td class="today">${currentMonthDays}</td>`;
    } else {
      html += `<td>${currentMonthDays}</td>`;
    }

    currentMonthDays++;
  }

  html += '</tr>\n';

  let counter = 0;

  for (let i = currentMonthDays; i <= new Date(year, month + 1, 0).getDate(); i++) {
    if (counter % 7 === 0) {
      html += '<tr>';
    }

    if (currentMonthDays === day) {
      html += `<td class="today">${currentMonthDays}</td>`;
    } else {
      html += `<td>${currentMonthDays}</td>`;
    }

    counter++;

    if (counter % 7 === 0) {
      html += '</tr>\n';
    }

    currentMonthDays++;
  }

  let nextMonthDays = 1;

  for (let i = (daysOfLastMonth + currentMonthDays - 1) % 7; i < 7; i++) {
    if (i === 0) {
      html += '</table>\n';
      console.log(html);
      return;
    }

    html += `<td class="next-month">${nextMonthDays}</td>`;
    nextMonthDays++;
  }

  html += '</tr>\n';
  html += '</table>\n';
  console.log(html);
}

monthlyCalendar([24, 12, 2012]);

// Task 22 - Monthly Calendar
//
function monthlyCalendar2 ([day, month, year]) {
  let html = '<table>\n';
  html += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n';

  let currentDay = new Date(year, month - 1, 1);
  if (currentDay.getDay() !== 0) {
    currentDay = new Date(year, month - 2, new Date(year, month - 1, 0).getDate() - currentDay.getDay() + 1);
  }

  let nextMonth = new Date(year, month, 1).getMonth();
  let previousMonth = new Date(year, month - 2, 1).getMonth();

  while (currentDay.getMonth() !== nextMonth || currentDay.getDay() !== 0) {
    if (currentDay.getDay() === 0) {
      html += '<tr>';
    }

    if (currentDay.getMonth() === previousMonth) {
      html += `<td class="prev-month">${currentDay.getDate()}</td>`;
    } else if (currentDay.getMonth() === nextMonth) {
      html += `<td class="next-month">${currentDay.getDate()}</td>`;
    } else if (currentDay.getDate() === day && currentDay.getMonth() === month - 1) {
      html += `<td class="today">${currentDay.getDate()}</td>`;
    } else {
      html += `<td>${currentDay.getDate()}</td>`;
    }

    if (currentDay.getDay() === 6) {
      html += '</tr>\n';
    }

    currentDay.setDate(currentDay.getDate() + 1);
  }

  html += '</table>';
  console.log(html);
}

monthlyCalendar2([24, 12, 2012]);
