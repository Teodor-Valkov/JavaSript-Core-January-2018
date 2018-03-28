function * lookAndSayGenerator (number) {
  number = number.toString();

  while (true) {
    if (number.length === 1) {
      number = '' + 1 + number[0];
      yield number;
    } else {
      let previous = number[0];
      number = number.substr(1);

      let newNumber = '';
      let counter = 1;

      while (number) {
        let current = number.charAt(0);

        if (current === previous) {
          counter++;
        } else {
          newNumber += '' + counter + previous;
          counter = 1;
        }

        if (number.length === 1) {
          newNumber += counter + current;
        }

        number = number.substr(1);
        previous = current;
      }

      number = newNumber;
      yield number;
    }
  }
}

let lookSequence = lookAndSayGenerator(1);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);
console.log(lookSequence.next().value);

// [11, 21, 1211, 111221, 312211];
