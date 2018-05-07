class Sumator {
  constructor () {
    this.data = [];
  }

  add (item) {
    this.data.push(item);
  }

  sumNums () {
    let sum = 0;

    for (let item of this.data) {
      if (typeof (item) === 'number') {
        sum += item;
      }
    }

    return sum;
  }

  removeByFilter (filterFunc) {
    this.data = this.data.filter(item => !filterFunc(item));
  }

  toString () {
    if (this.data.length > 0) {
      return this.data.join(', ');
    }

    return '(empty)';
  }
}

module.exports = Sumator;
