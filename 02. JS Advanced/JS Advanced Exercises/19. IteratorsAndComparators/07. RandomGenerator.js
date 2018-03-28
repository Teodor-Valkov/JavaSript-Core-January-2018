function * randomGenerator (number) {
  number = Math.pow(number, 2) % (4871 * 7919);

  while (true) {
    yield number % 100;
    number = Math.pow(number, 2) % (4871 * 7919);
  }
}

let random = randomGenerator(100);

for (let i = 0; i < 10; i++) {
  console.log(random.next().value);
}

// [0, 2, 29, 89, 34, 76, 47, 83, 30, 40];
