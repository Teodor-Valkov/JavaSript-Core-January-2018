function reverseArrayIterable (numbers) {
  let index = numbers.length - 1;

  return {
    [Symbol.iterator]: function () {
      return this;
    },
    'next': function () {
      if (index >= 0) {
        return {
          value: numbers[index--],
          done: false
        };
      }

      return { done: true };
    }
  };
}

let numbers = [10, 20, 30];

for (let number of reverseArrayIterable(numbers)) {
  console.log(number);
}
