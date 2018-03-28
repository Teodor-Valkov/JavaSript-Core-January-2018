(function extend () {
  Array.prototype.last = function () {
    return this[this.length - 1];
  };

  Array.prototype.skip = function (n) {
    return this.slice(n);
  };

  Array.prototype.take = function (n) {
    return this.slice(0, n);
  };

  Array.prototype.sum = function () {
    return this.reduce((a, b) => a + b);
  };

  Array.prototype.average = function () {
    return this.sum() / this.length;
  };
})();

console.log([1, 2, 3, 4].average());
console.log([1, 2, 3, 4].take(2));
console.log([1, 2, 3, 4].skip(2));
console.log([1, 2, 3, 4].last());
console.log([1, 2, 3, 4].sum());
