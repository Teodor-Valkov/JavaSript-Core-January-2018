function reverseArrayIterator (numbers) {
  let index = numbers.length - 1;

  return {
    next: function () {
      if (index >= 0) {
        return {
          value: numbers[index--],
          done: false };
      }

      return { done: true };
    }
  };
}

let numbers = [10, 20, 30];
let iterator = reverseArrayIterator(numbers);

while (true) {
  let item = iterator.next();

  if (item.done) {
    break;
  }

  console.log(item.value);
}
