// Task 1 - Print Letters
//
function printLetters (input) {
  for (let index in input) {
    console.log(`str[${index}] -> ${input[index]}`);
  }
}

printLetters('Hello, World!');

// Task 2 - Concatenate Reversed
//
function concatenateReversed (input) {
  input = input.join('');
  input = Array.from(input).reverse().join('');

  console.log(input);
}

concatenateReversed(['I', 'am', 'student']);

// Task 3 - Count Occurrences
//
function countOccurrences (word, text) {
  let count = 0;
  let index = text.indexOf(word);

  while (index !== -1) {
    count++;
    index = text.indexOf(word, index + 1);
  }

  console.log(count);
}

countOccurrences('the', 'The quick brown fox jumps over the lay dog.');

// Task 4 - Extract Text
//
function extractText (input) {
  let result = [];

  let start = input.indexOf('(');
  let end = input.indexOf(')', start);

  while (start !== -1 && end !== -1) {
    let word = input.substring(start + 1, end);

    start = input.indexOf('(', end);
    end = input.indexOf(')', start);

    result.push(word);
  }

  console.log(result.join(', '));
}

extractText('Rakiya (Bulgarian brandy) is self-made liquor (alcoholic drink)');

// Task 5 - Aggregate Table
//
function aggregateTable (input) {
  let towns = [];
  let total = 0;

  for (let line of input) {
    let tokens = line.split('|').filter(token => token !== '');
    let town = tokens[0].trim();
    let income = Number(tokens[1].trim());

    total += income;
    towns.push(town);
  }

  console.log(towns.join(', '));
  console.log(total);
}

aggregateTable(['| Sofia           | 300', '| Veliko Tarnovo  | 500', '| Yambol          | 275']);

// Task 6 - Restaurant Bill
//
function restaurantBill (input) {
  let products = input.filter((line, index) => index % 2 === 0);
  let sum = input.filter((line, index) => index % 2 === 1).map(Number).reduce((a, b) => a + b);

  console.log(`You purchased ${products.join(', ')} for a total sum of ${sum}`);
}

restaurantBill(['Beer Zagorka', '2.65', 'Tripe soup', '7.80', 'Lasagna', '5.69']);

// Task 7 - Usernames
//
function usernames (input) {
  let users = [];

  for (let email of input) {
    let tokens = email.split('@');
    let username = tokens[0] + '.';
    let domain = tokens[1].split('.');
    let letters = '';

    for (let word of domain) {
      letters += word[0];
    }

    username += letters;
    users.push(username);
  }

  console.log(users.join(', '));
}

usernames(['peshoo@gmail.com', 'todor_43@mail.dir.bg', 'foo@bar.com']);

// Task 8 - Censorship
//
function censorship (text, forbiddenWords) {
  for (let word of forbiddenWords) {
    text = text.split(word).join('-'.repeat(word.length));
  }

  console.log(text);
}

censorship('roses are red, violets are blue', [', violets are', 'red']);

// Task 8 - Censorship
//
function censorship2 (text, forbiddenWords) {
  for (let word of forbiddenWords) {
    while (text.includes(word)) {
      text = text.replace(word, '-'.repeat(word.length));
    }
  }

  console.log(text);
}

censorship2('roses are red, violets are blue', [', violets are', 'red']);

// Task 9 - Escaping
//
function escaping (input) {
  let forbidden = ['&', '<', '>', '"', '\''];
  let allowed = ['&amp;', '&lt;', '&gt;', '&quot;', '&#39;'];

  let html = '<ul>\n';

  for (let line of input) {
    html += '  <li>';

    for (let index in forbidden) {
      line = line.split(forbidden[index]).join(allowed[index]);
    }

    html += line + '</li>\n';
  }

  html += '</ul>';

  console.log(html);
}

escaping(['<div style="color: red;">Hello, Red!</div>', '<table><tr><td>Cell 1</td><td>Cell 2</td><tr>']);

// Task 9 - Escaping
//
function escaping2 (input) {
  let html = '<ul>\n';

  for (let line of input) {
    let replaced = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    html += '  <li>' + replaced + '</li>\n';
  }

  html += '</ul>';
  console.log(html);
}

escaping2(['<div style="color: red;">Hello, Red!</div>', '<table><tr><td>Cell 1</td><td>Cell 2</td><tr>']);

// Task 10 - Match All Words
//
function matchAllWords (input) {
  let replaced = input.split(' ').filter(w => w !== '').join('|');
  // let replaced = input.split(/\W+/g).filter(Boolean).join('|');

  console.log(replaced);
}

matchAllWords('A Regular Expression needs to have the global flag in order to match all occurrences in the text');

// Task 11 - Simple Email Validation
//
function simpleEmailValidation (input) {
  let regex = /^[A-Za-z0-9]+@[a-z]+\.[a-z]+$/g;

  if (regex.test(input)) {
    console.log('Valid');
  } else {
    console.log('Invalid');
  }
}

simpleEmailValidation('invalid@emai1.bg');

// Task 12 - Expression Split
//
function expressionSplit (input) {
  let regex = /[\s().,;]/g;
  let tokens = input.split(regex).filter(t => t !== '');
  // let tokens = input.split(regex).filter(Boolean);

  for (let token of tokens) {
    console.log(token);
  }
}

expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');

// Task 13 - Match the Dates
//
function matchTheDates (input) {
  let regex = /\b(\d{1,2})-([A-Z]{1}[a-z]{2})-(\d{4}\b)/g;
  let dates = [];

  for (let sentence of input) {
    let match = regex.exec(sentence);

    while (match) {
      let date = `${match[0]} (Day: ${match[1]}, Month: ${match[2]}, Year: ${match[3]})`;
      dates.push(date);

      match = regex.exec(sentence);
    }
  }

  console.log(dates.join('\n'));
}

matchTheDates(['1-Jan-1999 is a valid date.', 'So is 01-July-2000.', 'I am an awful liar, by the way – Ivo, 28-Sep-2016.']);

// Task 14 - Parse Employee Data
//
function parseEmployeeData (input) {
  let regex = /^([A-Z][A-Za-z]*) - ([1-9][0-9]*) - ([A-Za-z0-9- ]+)$/;

  for (let line of input) {
    let match = regex.exec(line);

    if (match) {
      console.log(`Name: ${match[1]}`);
      console.log(`Position: ${match[3]}`);
      console.log(`Salary: ${match[2]}`);
    }
  }
}

parseEmployeeData(['Jonathan - 2000 - Manager', 'Peter- 1000- Chuck', 'George - 1000 - Team Leader']);

// Task 15 - Form Filler
//
function formFiller (username, email, phone, input) {
  let result = [];

  for (let line of input) {
    line = line.replace(/<![A-Za-z]+!>/g, username);
    line = line.replace(/<@[A-Za-z]+@>/g, email);
    line = line.replace(/<\+[A-Za-z0-9]+\+>/g, phone);

    result.push(line);
  }

  console.log(result.join('\n'));
}

formFiller('Pesho', 'pesho@softuni.bg', '90-60-90',
  ['Hello, <!username!>!',
    'Welcome to your Personal profile.',
    'Here you can modify your profile freely.',
    'Your current username is: <!fdsfs!>. Would you like to change that? (Y/N)',
    'Your current email is: <@DasEmail@>. Would you like to change that? (Y/N)',
    'Your current phone number is: <+number+>. Would you like to change that? (Y/N)']);

// Task 16 - Match Multiplication
//
function matchMultiplication (input) {
  // input = input.replace(/(-?\d+)\s*\*\s*(-?\d+(\.\d+)?)/g, (match, num1, num2) => Number(num1) * Number(num2));

  let pattern = /(-?\d+)\s*\*\s*(-?\d+\.?\d*)/g;

  let match = pattern.exec(input);

  while (match) {
    input = input.replace(match[0], Number(match[1] * Number(match[2])));
    match = pattern.exec(input);
  }

  console.log(input);
}

matchMultiplication('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).');

// Task 16 - Match Multiplication
//
function matchMultiplication2 (input) {
  input = input.replace(/\b(-?\d+)\s*\*\s*(-?\d+\.?\d*)\b/g, (match, firstNumber, secondNumber) => Number(firstNumber) * Number(secondNumber));

  console.log(input);
}

matchMultiplication2('My bill: 2*2.50 (beer); 2* 1.20 (kepab); -2  * 0.5 (deposit).');
