class SortedList {
  constructor () {
    this.size = 0;
    this.numbers = [];
  }

  get (index) {
    if (index >= 0 && index < this.numbers.length) {
      return this.numbers[index];
    }
  }

  add (element) {
    this.numbers.push(Number(element));
    this.sort();
    this.size++;
  }

  remove (index) {
    if (index >= 0 && index < this.numbers.length) {
      this.numbers.splice(index, 1);
      this.sort();
      this.size--;
    }
  }

  sort () {
    return this.numbers.sort((a, b) => a - b);
  }

  toString () {
    return this.numbers.join(' ');
  }
}

let list = new SortedList();
console.log(list.size);

list.add(-5);
list.add(-4);
list.add(-3);
console.log(list.size);
console.log(list.toString());

list.remove(1);
console.log(list.get(0));
console.log(list.get(1));
console.log(list.toString());
