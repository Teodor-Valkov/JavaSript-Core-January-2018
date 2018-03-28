let solve = function () {
  let microelements = {
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    flavour: 0
  };

  let recipes = {
    apple: {
      carbohydrate: 1,
      flavour: 2
    },
    coke: {
      carbohydrate: 10,
      flavour: 20
    },
    burger: {
      carbohydrate: 5,
      fat: 7,
      flavour: 3
    },
    omelet: {
      protein: 5,
      fat: 1,
      flavour: 1
    },
    cheverme: {
      protein: 10,
      carbohydrate: 10,
      fat: 10,
      flavour: 10
    }
  };

  return function (input) {
    let tokens = input.split(' ');
    let command = tokens[0];
    let type = tokens[1];
    let quantity = Number(tokens[2]);

    switch (command) {
      case 'restock':
        return restock(type, quantity);
      case 'prepare':
        return prepare(type, quantity);
      case 'report':
        return report();
      default:
        return 'Invalid input';
    }

    function restock (type, quantity) {
      microelements[type] += quantity;
      return 'Success';
    }

    function prepare (type, quantity) {
      let microelementsNeeded = recipes[type];

      for (let microelement in microelementsNeeded) {
        if (microelements[microelement] < microelementsNeeded[microelement] * quantity) {
          return `Error: not enough ${microelement} in stock`;
        }
      }

      for (let microelement in microelementsNeeded) {
        microelements[microelement] -= microelementsNeeded[microelement] * quantity;
      }
      return 'Success';
    }

    function report () {
      return `protein=${microelements['protein']} carbohydrate=${microelements['carbohydrate']} fat=${microelements['fat']} flavour=${microelements['flavour']}`;
    }
  };
};

console.log(solve('prepare cheverme 1'));
console.log(solve('restock protein 10'));
console.log(solve('prepare cheverme 1'));
console.log(solve('restock carbohydrate 10'));
console.log(solve('prepare cheverme 1'));
console.log(solve('restock fat 10'));
console.log(solve('prepare cheverme 1'));
console.log(solve('restock flavour 10'));
console.log(solve('prepare cheverme 1'));
console.log(solve('report'));
