function solve (input) {
  let targetLength = Number(input.pop());
  let line = input.join(' ').split(' ');

  let currentLength = 1;

  for (let i = 0; i < line.length - 1; i++) {
    if (line[i] === line[i + 1]) {
      currentLength++;

      if (currentLength === targetLength) {
        for (let j = i + 1; j > i + 1 - targetLength; j--) {
          line[j] = false;
        }

        currentLength = 1;
      }
    } else {
      currentLength = 1;
    }
  }

  let result = [];
  let index = -1;

  for (let row = 0; row < input.length; row++) {
    let numbers = input[row].split(' ');
    let resultNumbers = [];

    for (let col = 0; col < numbers.length; col++) {
      if (line[++index] !== false) {
        resultNumbers.push(line[index]);
      }
    }

    result.push(resultNumbers);
  }

  for (let line of result) {
    console.log(line.length !== 0 ? line.join(' ') : '(empty)');
  }
}

solve(['3 3 3 2 5 9 9 9 9 1 2',
  '1 1 1 1 1 2 5 8 1 1 7',
  '7 7 1 2 3 5 7 4 4 1 2',
  '2']);
