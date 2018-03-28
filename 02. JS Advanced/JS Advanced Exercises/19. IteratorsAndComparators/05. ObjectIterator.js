function objectIterator (object) {
  let keys = Array.from(Object.keys(object)).sort();
  let index = keys.length - 1;

  return {
    next: function () {
      if (index >= 0) {
        return {
          value: keys[index--],
          done: false
        };
      } else {
        return {
          done: true
        };
      }
    }
  };
}

let numbers = [10, 20, 30];
let iterator = objectIterator(numbers);

while (true) {
  let item = iterator.next();

  if (item.done) {
    break;
  }

  console.log(item.value);
}
