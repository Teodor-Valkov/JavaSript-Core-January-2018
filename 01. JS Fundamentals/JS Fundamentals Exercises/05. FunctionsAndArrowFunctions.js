// Task 1 - Inside Volume
//
function insideVolume (input) {
  for (let i = 0; i < input.length; i += 3) {
    let x = input[i];
    let y = input[i + 1];
    let z = input[i + 2];

    if (isInside(x, y, z)) {
      console.log('inside');
    } else {
      console.log('outside');
    }
  }

  function isInside (x, y, z) {
    let x1 = 10;
    let x2 = 50;
    let y1 = 20;
    let y2 = 80;
    let z1 = 15;
    let z2 = 50;

    if (x >= x1 && x <= x2 && y >= y1 && y <= y2 && z >= z1 && z <= z2) {
      return true;
    }

    return false;
  }
}

insideVolume([13.1, 50, 31.5, 50, 80, 50, -5, 18, 43]);

// Task 2 - Road Radar
//
function roadRadar ([speed, area]) {
  let limit = getLimit(area);

  let infraction = getInfraction(speed, limit);

  if (infraction) {
    console.log(infraction);
  }

  function getLimit (area) {
    switch (area) {
      case 'city':
        return 50;
      case 'residential':
        return 20;
      case 'interstate':
        return 90;
      case 'motorway':
        return 130;
    }
  }

  function getInfraction (speed, limit) {
    let overspeed = speed - limit;

    if (overspeed <= 0) {
      return false;
    } else if (overspeed > 0 && overspeed <= 20) {
      return 'speeding';
    } else if (overspeed > 20 && overspeed <= 40) {
      return 'excessive speeding';
    } else {
      return 'reckless driving';
    }
  }
}

roadRadar([200, 'motorway']);

// Task 3 - Template Format
//
function templateFormat (input) {
  let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
  result += '<quiz>\n';

  for (let i = 0; i < input.length; i += 2) {
    addQuestion(input[i]);
    addAnswer(input[i + 1]);
  }

  result += '</quiz>';
  console.log(result);

  function addQuestion (questionAsString) {
    result += `  <question>\n\t${questionAsString}\n  </question>\n`;
  }

  function addAnswer (answerAsString) {
    result += `  <answer>\n\t${answerAsString}\n  </answer>\n`;
  }
}

templateFormat(['Dry ice is a frozen form of which gas?', 'Carbon Dioxide', 'What is the brightest star in the night sky?', 'Sirius']);

// Task 4 - Cooking by Numbers
//
function cookingByNumbers (input) {
  let number = Number(input[0]);

  let chop = x => x / 2;
  let dice = x => Math.sqrt(x);
  let spice = x => x + 1;
  let bake = x => x * 3;
  let fillet = x => x * 0.8;

  for (let i = 1; i <= 5; i++) {
    switch (input[i]) {
      case 'chop':
        number = chop(number);
        break;
      case 'dice':
        number = dice(number);
        break;
      case 'spice':
        number = spice(number);
        break;
      case 'bake':
        number = bake(number);
        break;
      case 'fillet':
        number = fillet(number);
        break;
      default:
        console.log('Invalid operation');
        break;
    }

    console.log(number);
  }
}

cookingByNumbers([9, 'dice', 'spice', 'chop', 'bake', 'fillet']);

// Task 4 - Cooking Numbers
//
function cookingByNumbers2 (input) {
  let number = Number(input[0]);

  let calculate = (number, operation) => operation(number);

  let chop = x => x / 2;
  let dice = x => Math.sqrt(x);
  let spice = x => x + 1;
  let bake = x => x * 3;
  let fillet = x => x * 0.8;

  for (let i = 1; i <= 5; i++) {
    switch (input[i]) {
      case 'chop':
        number = calculate(number, chop);
        break;
      case 'dice':
        number = calculate(number, dice);
        break;
      case 'spice':
        number = calculate(number, spice);
        break;
      case 'bake':
        number = calculate(number, bake);
        break;
      case 'fillet':
        number = calculate(number, fillet);
        break;
      default:
        console.log('Invalid operation');
        break;
    }

    console.log(number);
  }
}

cookingByNumbers2([9, 'dice', 'spice', 'chop', 'bake', 'fillet']);

// Task 5 - Modify Average
//
function modifyAverage (number) {
  let average = getAverage(number);
  let update = x => x + '9';

  while (average <= 5) {
    number = update(number);
    average = getAverage(number);
  }

  console.log(number);

  function getAverage (number) {
    let sum = 0;
    let numberAsString = String(number);

    for (let digit of numberAsString) {
      sum += Number(digit);
    }

    return sum / numberAsString.length;
  }
}

modifyAverage(101);

// Task 6 - Validity Checker
//
function validityChecker ([firstX, firstY, secondX, secondY]) {
  checkValidity(firstX, firstY, 0, 0);
  checkValidity(secondX, secondY, 0, 0);
  checkValidity(firstX, firstY, secondX, secondY);

  function checkValidity (firstX, firstY, secondX, secondY) {
    let deltaX = firstX - secondX;
    let deltaY = firstY - secondY;

    let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

    if (distance % 1 === 0) {
      console.log(`{${firstX}, ${firstY}} to {${secondX}, ${secondY}} is valid`);
    } else {
      console.log(`{${firstX}, ${firstY}} to {${secondX}, ${secondY}} is invalid`);
    }
  }
}

validityChecker([3, 0, 0, 4]);

// Task 7 - Treasure Locator
//
function treasureLocator (input) {
  let checkTokelau = (x, y) => x >= 8 && x <= 9 && y >= 0 && y <= 1;
  let checkTuvalu = (x, y) => x >= 1 && x <= 3 && y >= 1 && y <= 3;
  let checkSamoa = (x, y) => x >= 5 && x <= 7 && y >= 3 && y <= 6;
  let checkTonga = (x, y) => x >= 0 && x <= 2 && y >= 6 && y <= 8;
  let checkCook = (x, y) => x >= 4 && x <= 9 && y >= 7 && y <= 8;

  for (let i = 0; i < input.length; i = i + 2) {
    let x = input[i];
    let y = input[i + 1];

    if (checkTokelau(x, y)) {
      console.log('Tokelau');
    } else if (checkTuvalu(x, y)) {
      console.log('Tuvalu');
    } else if (checkSamoa(x, y)) {
      console.log('Samoa');
    } else if (checkTonga(x, y)) {
      console.log('Tonga');
    } else if (checkCook(x, y)) {
      console.log('Cook');
    } else {
      console.log('On the bottom of the ocean');
    }
  }
}

treasureLocator([4, 2, 1.5, 6.5, 1, 3]);

// Task 8 - Trip Length
//
function tripLength ([firstX, firstY, secondX, secondY, thirdX, thirdY]) {
  let A = {
    x: firstX,
    y: firstY
  };

  let B = {
    x: secondX,
    y: secondY
  };

  let C = {
    x: thirdX,
    y: thirdY
  };

  let distance123 = calculate(A.x, A.y, B.x, B.y) + calculate(B.x, B.y, C.x, C.y);
  let distance132 = calculate(A.x, A.y, C.x, C.y) + calculate(C.x, C.y, B.x, B.y);
  let distance213 = calculate(B.x, B.y, A.x, A.y) + calculate(A.x, A.y, C.x, C.y);

  let shortestDistance = Math.min(distance123, distance132, distance213);

  if (shortestDistance === distance123) {
    console.log(`1->2->3: ${shortestDistance}`);
  } else if (shortestDistance === distance132) {
    console.log(`1->3->2: ${shortestDistance}`);
  } else if (shortestDistance === distance213) {
    console.log(`2->1->3: ${shortestDistance}`);
  }

  function calculate (firstX, firstY, secondX, secondY) {
    let deltaX = firstX - secondX;
    let deltaY = firstY - secondY;

    let distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
    return distance;
  }
}

tripLength([0, 0, 2, 0, 4, 0]);

// Task 9 - Radio Crystals
//
function radioCrystals (input) {
  let cut = x => x / 4;
  let lap = x => x * 0.8;
  let grind = x => x - 20;
  let etch = x => x - 2;
  let xray = number => number + 1;
  let wash = number => Math.floor(number);

  let targetMicrons = input[0];

  for (let i = 1; i < input.length; i++) {
    let microns = input[i];

    console.log(`Processing chunk ${microns} microns`);

    microns = executeOperation(targetMicrons, microns, 'Cut', cut);
    microns = executeOperation(targetMicrons, microns, 'Lap', lap);
    microns = executeOperation(targetMicrons, microns, 'Grind', grind);
    microns = executeOperation(targetMicrons, microns, 'Etch', etch);

    if (microns === targetMicrons - 1) {
      microns = xray(microns);
      console.log('X-ray x1');
    }

    console.log(`Finished crystal ${microns} microns`);
  }

  function executeOperation (targetMicrons, microns, name, operation) {
    let counter = 0;

    while (operation(microns) >= targetMicrons || microns - targetMicrons === 1) {
      microns = operation(microns);
      counter++;
    }

    if (counter > 0) {
      microns = wash(microns);
      console.log(`${name} x${counter}`);
      console.log('Transporting and washing');
    }

    return microns;
  }
}

radioCrystals([1000, 4000, 8100]);

// Task 10 - DNA Helix
//
function dnaHelix (number) {
  let text = 'ATCGTTAGGG';
  let length = text.length;
  let index = 0;

  for (let row = 0; row < number; row++) {
    if (row % 4 === 0) {
      console.log(`**${text[index % length]}${text[index % length + 1]}**`);
    } else if (row % 4 === 2) {
      console.log(`${text[index % length]}----${text[index % length + 1]}`);
    } else {
      console.log(`*${text[index % length]}--${text[index % length + 1]}*`);
    }

    index += 2;
  }
}

dnaHelix(10);
