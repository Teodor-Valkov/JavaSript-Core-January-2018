function solve (input) {
  let cars = new Map();
  
  let processor = {
    create: function ([name, inherits, parent]) {
      parent = parent ? cars.get(parent) : null;
      let car = Object.create(parent);
      cars.set(name, car);
    },
    set: function ([name, key, value]) {
      let car = cars.get(name);
      car[key] = value;
    },
    print: function ([name]) {
      let car = cars.get(name);
      let properties = [];

      for (let property in car) {
        properties.push(`${property}:${car[property]}`);
      }

      console.log(properties.join(', '));
    }
  };

  for (let line of input) {
    let tokens = line.split(' ');
    let command = tokens.shift();

    processor[command](tokens);
  }
}

solve(['create c1',
  'create c2 inherit c1',
  'set c1 color red',
  'set c2 model new',
  'print c1',
  'print c2']);
