function solve () {
  let list = (function () {
    let numbers = [];

    return {
      get: function (index) {
        if (index >= 0 && index < numbers.length) {
          return numbers[index];
        }
      },
      add: function (element) {
        numbers.push(Number(element));
        numbers = this.sort();
        this.size++;
      },
      remove: function (index) {
        if (index >= 0 && index < numbers.length) {
          numbers.splice(index, 1);
          numbers = this.sort();
          this.size--;
        }
      },
      size: 0,
      sort: () => numbers.sort((a, b) => a - b),
      toString: () => numbers.join(' ')
    };
  })();

  return list;
}

let list = solve();
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
