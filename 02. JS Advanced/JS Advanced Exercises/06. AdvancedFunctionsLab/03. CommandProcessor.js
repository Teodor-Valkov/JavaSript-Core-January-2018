function solve (input) {
  let processor = (function () {
    let result = '';

    return function (line) {
      let tokens = line.split(' ');

      switch (tokens[0]) {
        case 'append':
          result += tokens[1];
          break;
        case 'removeStart':
          result = result.slice(Number(tokens[1]));
          break;
        case 'removeEnd':
          result = result.slice(0, result.length - Number(tokens[1]));
          break;
        case 'print':
          console.log(result);
          break;
        default:
          console.log('Invalid input');
          break;
      }
    };
  })();

  for (let line of input) {
    processor(line);
  }
}

solve(['append hello',
  'append again',
  'removeStart 3',
  'removeEnd 4',
  'print']);
