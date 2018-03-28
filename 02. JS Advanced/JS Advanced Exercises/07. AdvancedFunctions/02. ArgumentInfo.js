function solve (input) {
  let typesObject = {};

  for (let argument of arguments) {
    if (!typesObject.hasOwnProperty(typeof (argument))) {
      typesObject[typeof (argument)] = 0;
    }

    typesObject[typeof (argument)]++;
    console.log(`${typeof (argument)}: ${argument}`);
  }

  // First solution with ordering Object
  //
  let types = Object.keys(typesObject);
  let typesSorted = types.sort((a, b) => typesObject[b] - typesObject[a]);

  for (let type of typesSorted) {
    console.log(`${type} = ${typesObject[type]}`);
  }

  // Second solution with ordering Array
  //
  // let typesArray = [];

  // for (let type in typesObject) {
  //  typesArray.push([type, typesObject[type]]);
  // }

  // typesArray.sort((a, b) => b[1] - a[1]);

  // for (let type of typesArray) {
  //  console.log(`${type[0]} = ${type[1]}`);
  // }
}

solve('cat', 42, function () { console.log('Hello world!'); });
