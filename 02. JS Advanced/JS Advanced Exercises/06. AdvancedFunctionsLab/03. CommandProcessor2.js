function solve (input) {
  let processor = (function () {
    let result = '';

    return {
      append: word => (result += word),
      removeStart: count => (result = result.slice(Number(count))),
      removeEnd: count => (result = result.slice(0, result.length - Number(count))),
      print: () => (console.log(result))
    };
  }());

  for (let line of input) {
    let tokens = line.split(' ');
    let command = tokens[0];
    let value = tokens[1];

    processor[command](value);
  }
}

solve(['append hello',
  'append again',
  'removeStart 3',
  'removeEnd 4',
  'print']);
