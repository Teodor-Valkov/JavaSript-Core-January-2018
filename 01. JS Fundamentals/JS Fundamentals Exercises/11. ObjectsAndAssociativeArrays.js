// Task 1 - Heroic Inventory
//
function heroicInventory (input) {
  let heroes = [];

  for (let line of input) {
    let tokens = line.split(' / ');
    let name = tokens[0];
    let level = Number(tokens[1]);
    let items = tokens.length > 2 ? tokens[2].split(', ') : [];

    let hero = {
      name: name,
      level: level,
      items: items
    };

    heroes.push(hero);
  }

  console.log(JSON.stringify(heroes));
}

heroicInventory(['Isacc / 25 / Apple, GravityGun',
  'Derek / 12 / BarrelVest, DestructionSword',
  'Hes / 1 / Desolator, Sentinel, Antara']);

// Task 2 - JSON Table
//
function jsonTable (input) {
  let html = '<table>\n';

  for (let line of input) {
    let employee = JSON.parse(line);

    html += '    <tr>\n';
    html += `        <td>${htmlEscape(employee.name)}</td>\n`;
    html += `        <td>${htmlEscape(employee.position)}</td>\n`;
    html += `        <td>${employee.salary}</td>\n`;
    html += '    <tr>\n';
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

jsonTable(['{"name":"Pesho","position":"Promenliva","salary":100000}',
  '{"name":"Teo","position":"Lecturer","salary":1000}',
  '{"name":"Georgi","position":"Lecturer","salary":1000}']);

// Task 3 - Cappy Juice
//
function cappyJuice (input) {
  let juices = new Map();
  let bottles = new Map();

  for (let line of input) {
    let tokens = line.split(' => ');
    let name = tokens[0];
    let quantity = Number(tokens[1]);

    if (!juices.has(name)) {
      juices.set(name, 0);
    }

    juices.set(name, juices.get(name) + quantity);

    if (juices.get(name) >= 1000) {
      let bottle = Math.floor(juices.get(name) / 1000);
      juices.set(name, juices.get(name) - bottle * 1000);

      if (!bottles.has(name)) {
        bottles.set(name, 0);
      }

      bottles.set(name, bottles.get(name) + bottle);
    }
  }

  for (let [name, bottle] of bottles) {
    console.log(`${name} => ${bottle}`);
  }
}

cappyJuice(['Kiwi => 234',
  'Pear => 2345',
  'Watermelon => 3456',
  'Kiwi => 4567',
  'Pear => 5678',
  'Watermelon => 6789']);

// Task 3 - Cappy Juice
//
function cappyJuice2 (input) {
  let juices = {};
  let bottles = {};

  for (let line of input) {
    let tokens = line.split(' => ');
    let name = tokens[0];
    let quantity = Number(tokens[1]);

    if (!juices.hasOwnProperty(name)) {
      juices[name] = 0;
    }

    juices[name] += quantity;

    if (juices[name] >= 1000) {
      bottles[name] = Math.floor(juices[name] / 1000);
    }
  }

  for (let name in bottles) {
    console.log(`${name} => ${bottles[name]}`);
  }
}

cappyJuice2(['Kiwi => 234',
  'Pear => 2345',
  'Watermelon => 3456',
  'Kiwi => 4567',
  'Pear => 5678',
  'Watermelon => 6789']);

// Task 4 - Store Catalogue
//
function storeCatalogue (input) {
  let store = new Map();

  for (let line of input) {
    let tokens = line.split(' : ');
    let product = tokens[0];
    let letter = product[0];
    let price = Number(tokens[1]);

    if (!store.has(letter)) {
      store.set(letter, new Map());
    }

    store.get(letter).set(product, price);
  }

  let lettersSorted = Array.from(store.keys()).sort();

  for (let letter of lettersSorted) {
    console.log(letter);

    let productsSorted = Array.from(store.get(letter).keys()).sort();

    for (let product of productsSorted) {
      console.log(`  ${product}: ${store.get(letter).get(product)}`);
    }
  }
}

storeCatalogue(['Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10']);

// Task 4 - Store Catalogue
//
function storeCatalogue2 (input) {
  let store = new Map();
  let letters = new Set();

  for (let line of input) {
    let tokens = line.split(' : ');
    let product = tokens[0];
    let price = Number(tokens[1]);

    store.set(product, price);
  }

  for (let product of store.keys()) {
    let letter = product[0];
    letters.add(letter);
  }

  let lettersSorted = Array.from(letters).sort();

  for (let letter of lettersSorted) {
    console.log(letter);

    let productsSorted = Array.from(store.keys()).sort();

    for (let product of productsSorted) {
      if (product.startsWith(letter)) {
        console.log(`  ${product}: ${store.get(product)}`);
      }
    }
  }
}

storeCatalogue2(['Appricot : 20.4',
  'Fridge : 1500',
  'TV : 1499',
  'Deodorant : 10',
  'Boiler : 300',
  'Apple : 1.25',
  'Anti-Bug Spray : 15',
  'T-Shirt : 10']);

// Task 5 - Auto Engineering Company
//
function autoEngineeringCompany (input) {
  let cars = new Map();

  for (let line of input) {
    let tokens = line.split(/\s*\|\s*/g);
    let brand = tokens[0];
    let model = tokens[1];
    let quantity = Number(tokens[2]);

    if (!cars.has(brand)) {
      cars.set(brand, new Map());
    }

    if (!cars.get(brand).has(model)) {
      cars.get(brand).set(model, 0);
    }

    cars.get(brand).set(model, cars.get(brand).get(model) + quantity);
  }

  for (let [brand, information] of cars) {
    console.log(brand);

    for (let [model, quantity] of information) {
      console.log(`###${model} -> ${quantity}`);
    }
  }
}

autoEngineeringCompany(['Audi | Q7 | 1000',
  'Audi | Q6 | 100',
  'BMW | X5 | 1000',
  'BMW | X6 | 100',
  'Citroen | C4 | 123',
  'Volga | GAZ-24 | 1000000',
  'Lada | Niva | 1000000',
  'Lada | Jigula | 1000000',
  'Citroen | C4 | 22',
  'Citroen | C5 | 10']);

// Task 6 - System Components
//
function systemComponents (input) {
  let system = new Map();

  for (let line of input) {
    let tokens = line.split(/\s*\|\s*/g);
    let name = tokens[0];
    let component = tokens[1];
    let subcomponent = tokens[2];

    if (!system.has(name)) {
      system.set(name, new Map());
    }

    if (!system.get(name).has(component)) {
      system.get(name).set(component, []);
    }

    system.get(name).get(component).push(subcomponent);
  }

  let names = Array.from(system.keys());
  let namesSorted = names.sort((a, b) => sortNames(system, a, b));

  for (let name of namesSorted) {
    console.log(name);

    let components = Array.from(system.get(name).keys());
    let componentsSorted = components.sort((a, b) => sortComponents(system, name, a, b));

    for (let component of componentsSorted) {
      console.log(`|||${component}`);

      for (let subcomponent of system.get(name).get(component)) {
        console.log(`||||||${subcomponent}`);
      }
    }
  }

  function sortNames (system, a, b) {
    if (system.get(a).size === system.get(b).size) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    }

    return system.get(b).size - system.get(a).size;
  }

  function sortComponents (system, name, a, b) {
    return system.get(name).get(b).length - system.get(name).get(a).length;
  }
}

systemComponents(['SULS | Main Site | Home Page',
  'SULS | Main Site | Login Page',
  'SULS | Main Site | Register Page',
  'SULS | Judge Site | Login Page',
  'SULS | Judge Site | Submittion Page',
  'Lambda | CoreA | A23',
  'SULS | Digital Site | Login Page',
  'Lambda | CoreB | B24',
  'Lambda | CoreA | A24',
  'Lambda | CoreA | A25',
  'Lambda | CoreC | C4',
  'Indice | Session | Default Storage',
  'Indice | Session | Default Security']);

// Task 7 - Usernames
//
function usernames (input) {
  let unique = new Set();

  for (let line of input) {
    unique.add(line);
  }

  let names = Array.from(unique);
  let namesSorted = names.sort((a, b) => sortNames(a, b));

  for (let name of namesSorted) {
    console.log(name);
  }

  function sortNames (a, b) {
    if (a.length === b.length) {
      return a.localeCompare(b);
    }

    return a.length - b.length;
  }
}

usernames(['Denise', 'Ignatius', 'Iris', 'Isacc', 'Indie', 'Dean', 'Donatello', 'Enfuego', 'Benjamin', 'Biser', 'Bounty', 'Renard', 'Rot']);

// Task 8 - Unique Sequences
//
function uniqueSequences (input) {
  let unique = [];

  for (let line of input) {
    let numbers = JSON.parse(line).map(Number).sort((a, b) => b - a);
    unique.push(numbers);
  }

  for (let i = 0; i < unique.length; i++) {
    for (let j = i + 1; j < unique.length; j++) {
      let currentRow = unique[i];
      let nextRow = unique[j];

      let areEqual = checkIfEqual(currentRow, nextRow);

      if (areEqual) {
        unique.splice(j, 1);
        j--;
      }
    }
  }

  let uniqueSorted = unique.sort((a, b) => a.length - b.length);

  for (let unique of uniqueSorted) {
    console.log(`[${unique.join(', ')}]`);
  }

  function checkIfEqual (currentRow, nextRow) {
    if (currentRow.length === nextRow.length) {
      for (let i = 0; i < currentRow.length; i++) {
        if (currentRow[i] !== nextRow[i]) {
          return false;
        }
      }

      return true;
    }

    return false;
  }
}

uniqueSequences(['[7.14, 7.180, 7.339, 80.099]',
  '[7.339, 80.0990, 7.140000, 7.18]',
  '[7.339, 7.180, 7.14, 80.099]']);

function uniqueSequences2 (input) {
  let unique = new Set();

  for (let line of input) {
    let numbers = JSON.parse(line).map(Number).sort((a, b) => b - a).join(', ');
    unique.add(numbers);
  }

  let uniqueSorted = Array.from(unique).sort((a, b) => a.split(', ').length - b.split(', ').length);

  for (let unique of uniqueSorted) {
    console.log(`[${unique}]`);
  }
}

uniqueSequences2(['[-3, -2, -1, 0, 1, 2, 3, 4]',
  '[10, 1, -17, 0, 2, 13]',
  '[4, -3, 3, -2, 2, -1, 1, 0]']);
