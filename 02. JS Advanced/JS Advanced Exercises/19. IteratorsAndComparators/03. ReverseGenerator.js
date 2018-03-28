function * reverseArrayGenerator (numbers) {
  for (let i = numbers.length - 1; i >= 0; i--) {
    yield numbers[i];
  }
}

let numbers = [10, 20, 30];

for (let number of reverseArrayGenerator(numbers)) {
  console.log(number);
}
