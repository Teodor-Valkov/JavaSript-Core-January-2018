function solve (input) {
  let result = Number.MIN_SAFE_INTEGER;

  input = input.map(Number);

  for (let i = 0; i < input.length; i++) {
    let number = input[i];

    if (number >= 0 && number <= 9) {
      let product = 1;

      for (let j = i + 1; j <= i + number; j++) {
        let currentNumber = input[j];
        product *= currentNumber;
      }

      if (product > result) {
        result = product;
      }
    }
  }

  console.log(result);
}

solve(['10', '20', '2', '30', '44', '3', '56', '20', '24']);
