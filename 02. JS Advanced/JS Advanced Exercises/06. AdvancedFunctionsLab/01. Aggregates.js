function solve (numbers) {
  function reduce (numbers, func) {
    let result = numbers[0];

    for (let number of numbers.slice(1)) {
      result = func(result, number);
    }

    return result;
  }

  console.log(`Sum = ${reduce(numbers, (a, b) => a + b)}`);
  console.log(`Min = ${reduce(numbers, (a, b) => Math.min(a, b))}`);
  console.log(`Max = ${reduce(numbers, (a, b) => Math.max(a, b))}`);
  console.log(`Product = ${reduce(numbers, (a, b) => a * b)}`);
  console.log(`Join = ${reduce(numbers, (a, b) => '' + a + b)}`);
}

solve([5, -3, 20, 7, 0.5]);
