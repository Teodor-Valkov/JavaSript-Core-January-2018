class Stringer {
  constructor (string, length) {
    this.innerString = string;
    this.innerLength = length;
  }

  increase (length) {
    this.innerLength += length;

    if (this.innerLength < 0) {
      this.innerLength = 0;
    }
  }

  decrease (length) {
    this.innerLength -= length;

    if (this.innerLength < 0) {
      this.innerLength = 0;
    }
  }

  toString () {
    if (this.innerLength === 0) {
      return '...';
    }

    if (this.innerString.length > this.innerLength) {
      return this.innerString.substr(0, this.innerLength) + '...';
    }

    return this.innerString;
  }
}

let word = new Stringer('Test', 5);
console.log(word.toString()); // Test

word.decrease(3);
console.log(word.toString()); // Te...

word.decrease(5);
console.log(word.toString()); // ...

word.increase(4);
console.log(word.toString()); // Test
