function solve (input) {
  let processor = (function () {
    let list = [];

    return {
      add: item => list.push(item),
      remove: item => (list = list.filter(el => el !== item)),
      print: () => console.log(list)
    };
  })();

  for (let line of input) {
    let tokens = line.split(' ');
    let command = tokens[0];
    let item = tokens[1];

    processor[command](item);
  }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
