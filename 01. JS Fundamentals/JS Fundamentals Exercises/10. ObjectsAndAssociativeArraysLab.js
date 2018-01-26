// Task 1 - Towns to JSON
//
function townsToJson (input) {
  let towns = [];

  for (let line of input.splice(1)) {
    let tokens = line.split(/\s*\|\s*/g).filter(token => token !== '');
    let town = {
      Town: tokens[0],
      Latitude: Number(tokens[1]),
      Longitude: Number(tokens[2])
    };

    towns.push(town);
  }

  console.log(JSON.stringify(towns));
}

townsToJson(['| Town | Latitude | Longitude |',
  '| Veliko Turnovo | 43.0757 | 25.6172 |',
  '| Monatevideo | 34.50 | 56.11 |']);

// Task 2 - Score to HTML
//
function scoreToHtml (input) {
  let students = JSON.parse(input);

  let html = '<table>\n';
  html += '  <tr><th>name</th><th>score</th></tr>\n';

  for (let student of students) {
    let name = student.name;
    let score = student.score;

    name = name
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

    html += `  <tr><td>${name}</td><td>${score}</td></tr>\n`;
  }

  html += '</table>';
  console.log(html);
}

scoreToHtml('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');

// Task 2 - Score to HTML
//
function scoreToHtml2 (input) {
  let students = JSON.parse(input);

  let html = '<table>\n';
  html += '  <tr><th>name</th><th>score</th></tr>\n';

  for (let student of students) {
    html += `  <tr><td>${htmlEscape(student.name)}</td><td>${student.score}</td></tr>\n`;
  }

  html += '</table>';
  console.log(html);

  function htmlEscape (name) {
    let escapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return name.replace(/[&<>"']/g, match => escapes[match]);
  }
}

scoreToHtml2('[{"name":"Pesho & Kiro","score":479},{"name":"Gosho, Maria & Viki","score":205}]');

// Task 3 - From JSON to HTML Table
//
function fromJsonToHtmlTable (input) {
  let students = JSON.parse(input);

  let html = '<table>\n';
  html += '  <tr>';

  let studentsKeys = Object.keys(students[0]);

  for (let key of studentsKeys) {
    html += `<th>${key}</th>`;
  }

  html += '</tr>\n';

  for (let student of students) {
    html += '  <tr>';

    let studentKeys = Object.keys(student);

    for (let key of studentKeys) {
      html += `<td>${htmlEscape(String(student[key]))}</td>`;
    }

    html += '</tr>\n';
  }

  html += '</table>';

  console.log(html);

  function htmlEscape (name) {
    let escapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return name.replace(/[&<>"']/g, match => escapes[match]);
  }
}

fromJsonToHtmlTable('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"}, {"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]');

// Task 3 - From JSON to HTML Table
//
function fromJsonToHtmlTable2 (input) {
  let students = JSON.parse(input);

  let html = '<table>\n';
  html += '  <tr>';

  Object.keys(students[0]).forEach(key => (html += `<th>${key}</th>`));

  html += '</tr>\n';

  for (let student of students) {
    html += '  <tr>';

    Object.keys(student).forEach(key => (html += `<td>${htmlEscape(String(student[key]))}</td>`));

    html += '</tr>\n';
  }

  html += '</table>';

  console.log(html);

  function htmlEscape (name) {
    let escapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };

    return name.replace(/[&<>"']/g, match => escapes[match]);
  }
}

fromJsonToHtmlTable2('[{"Name":"Pesho <div>-a","Age":20,"City":"Sofia"}, {"Name":"Gosho","Age":18,"City":"Plovdiv"},{"Name":"Angel","Age":18,"City":"Veliko Tarnovo"}]');

// Task 4 - Sum by Town
//
function sumByTown (input) {
  let statistics = {};

  for (let i = 0; i < input.length - 1; i += 2) {
    let town = input[i];
    let income = Number(input[i + 1]);

    if (!statistics[town]) {
      statistics[town] = 0;
    }

    statistics[town] += income;
  }

  console.log(JSON.stringify(statistics));
}

sumByTown(['Sofia', 20, 'Varna', 3, 'sofia', 5, 'varna', 4]);

// Task 5 - Count Words in Text
//
function countWordsInText (input) {
  let text = input.join('\n');
  let words = text.split(/\W+/g).filter(word => word !== '');

  let statistics = {};

  for (let word of words) {
    if (!statistics[word]) {
      statistics[word] = 0;
    }

    statistics[word]++;
  }

  console.log(JSON.stringify(statistics));
}

countWordsInText(['JS devs use Node.js for server-side JS.-- JS for devs']);

// Task 6 - Count Words With Maps
//
function countWordsWithMaps (input) {
  let text = input.join('\n').toLowerCase();
  let words = text.split(/\W+/g).filter(word => word !== '');

  let statistics = new Map();

  for (let word of words) {
    if (!statistics.has(word)) {
      statistics.set(word, 0);
    }

    statistics.set(word, statistics.get(word) + 1);
  }

  let wordsSorted = Array.from(statistics.keys()).sort();

  for (let word of wordsSorted) {
    console.log(`'${word}' -> ${statistics.get(word)} times`);
  }
}

countWordsWithMaps(['JS devs use Node.js for server-side JS. JS devs use JS. -- JS for devs --']);

// Task 7 - Populations in Towns
//
function populationsInTowns (input) {
  let towns = new Map();

  for (let line of input) {
    let tokens = line.split(' <-> ');
    let name = tokens[0];
    let population = Number(tokens[1]);

    if (!towns.has(name)) {
      towns.set(name, 0);
    }

    towns.set(name, towns.get(name) + population);
  }

  for (let [town, population] of towns) {
    console.log(`${town} : ${population}`);
  }

  // towns.forEach((value, key) => console.log(`${key} : ${value}`));
}

populationsInTowns(['Istanbul <-> 100000',
  'Honk Kong <-> 2100004',
  'Jerusalem <-> 2352344',
  'Mexico City <-> 23401925',
  'Istanbul <-> 1000']);

// Task 7 - Populations in Towns
//
function populationsInTowns2 (input) {
  let towns = [];

  for (let line of input) {
    let tokens = line.split(' <-> ');
    let name = tokens[0];
    let population = Number(tokens[1]);

    let townToAdd = {
      name: name,
      population: population
    };

    let townFound = towns.find(t => t.name === townToAdd.name);

    if (townFound === undefined) {
      towns.push(townToAdd);
    } else {
      townFound.population += population;
    }
  }

  for (let town of towns) {
    console.log(`${town.name} : ${town.population}`);
  }

  // towns.forEach(town => console.log(`${town.name} : ${town.populationsInTowns}`));
}

populationsInTowns2(['Istanbul <-> 100000',
  'Honk Kong <-> 2100004',
  'Jerusalem <-> 2352344',
  'Mexico City <-> 23401925',
  'Istanbul <-> 1000']);

// Task 8 - City Markets
//
function cityMarkets (input) {
  let towns = new Map();

  for (let line of input) {
    let townTokens = line.split(' -> ').filter(token => token !== '');
    let town = townTokens[0].trim();
    let product = townTokens[1].trim();

    let priceTokens = townTokens[2].split(':');
    let amountOfSales = Number(priceTokens[0].trim());
    let pricePerProduct = Number(priceTokens[1].trim());
    let income = amountOfSales * pricePerProduct;
    // let income = townTokens[2].split(' : ').map(Number).reduce((a, b) => a * b);

    if (!towns.has(town)) {
      towns.set(town, new Map());
    }

    if (!towns.get(town).has(product)) {
      towns.get(town).set(product, 0);
    }

    towns.get(town).set(product, towns.get(town).get(product) + income);
  }

  for (let [town, products] of towns) {
    console.log(`Town - ${town}`);

    for (let [product, income] of products) {
      console.log(`$$$${product} : ${income}`);
    }
  }
}

cityMarkets(['Sofia -> Laptops HP -> 200 : 2000',
  'Sofia -> Raspberry -> 200000 : 1500',
  'Sofia -> Audi Q7 -> 200 : 100000',
  'Montana -> Portokals -> 200000 : 1',
  'Montana -> Qgodas -> 20000 : 0.2',
  'Montana -> Chereshas -> 1000 : 0.3']);

// Task 9 - Lowest Prices in Cities
//
function lowestPricesInCities (input) {
  let products = new Map();

  for (let line of input) {
    let tokens = line.split(' | ');
    let town = tokens[0];
    let product = tokens[1];
    let price = Number(tokens[2]);

    if (!products.has(product)) {
      products.set(product, new Map());
    }

    products.get(product).set(town, price);
  }

  for (let [product, information] of products) {
    let lowestPrice = Number.MAX_SAFE_INTEGER;
    let lowestTown = '';

    for (let [town, price] of information) {
      if (price < lowestPrice) {
        lowestPrice = price;
        lowestTown = town;
      }
    }

    console.log(`${product} -> ${lowestPrice} (${lowestTown})`);
  }
}

lowestPricesInCities(['Sample Town | Sample Product | 1000',
  'Sample Town | Orange | 2',
  'Sample Town | Peach | 1',
  'Sofia | Orange | 3',
  'Sofia | Peach | 2',
  'New York | Sample Product | 1000.1',
  'New York | Burger | 10']);

// Task 10 - Extract Unique Words
//
function extractUniqueWords (input) {
  let unique = new Set();

  for (let line of input) {
    let words = line.toLowerCase().split(/\W+/g).filter(word => word !== '');

    for (let word of words) {
      unique.add(word);
    }
  }

  console.log(Array.from(unique).join(', '));
}

extractUniqueWords(['Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  'Vestibulum volutpat lacinia blandit.',
  'Pellentesque dignissim odio in hendrerit lacinia.',
  'Vivamus placerat porttitor purus nec hendrerit.',
  'Aliquam erat volutpat. Donec ac augue ligula.',
  'Praesent venenatis sapien vitae libero ornare, nec pulvinar velit finibus.',
  'Proin dui neque, rutrum vel dolor ut, placerat blandit sapien.',
  'Pellentesque at est arcu.',
  'Nullam eget orci laoreet, feugiat nisi vitae, egestas libero.',
  'Pellentesque pulvinar aliquet felis.',
  'Interdum et malesuada fames ac ante ipsum primis in faucibus.',
  'Etiam sit amet nisl ex.',
  'Sed lacinia pretium metus quis fermentum.',
  'Praesent a ante suscipit, efficitur risus cursus, scelerisque risus.']);
