// let Summator = require('../02. SumatorClass');

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

let assert = require('chai').assert;

describe('Sumator Class Tests', function () {
  let sumator;
  beforeEach('initialize sumator', function () {
    sumator = new Sumator();
  });

  it('should contain all properties', function () {
    assert.isTrue(sumator.hasOwnProperty('data'));
  });

  it('should contain all functions', function () {
    assert.equal(Sumator.prototype.hasOwnProperty('add'), true);
    assert.equal(typeof sumator.add, 'function');

    assert.equal(Sumator.prototype.hasOwnProperty('sumNums'), true);
    assert.equal(typeof sumator.sumNums, 'function');

    assert.isTrue(Sumator.prototype.hasOwnProperty('removeByFilter'));
    assert.equal(typeof sumator.removeByFilter, 'function');

    assert.isTrue(Sumator.prototype.hasOwnProperty('toString'));
    assert.equal(typeof sumator.toString, 'function');
  });

  it('should be empty data', function () {
    assert.isTrue(sumator.data instanceof Array);
    assert.equal(sumator.toString(), '(empty)');
  });

  describe('add()', function () {
    it('should add one item', function () {
      sumator.add('string');
      assert.equal(sumator.toString(), 'string');
    });

    it('should add several items', function () {
      sumator.add('string');
      sumator.add(5);
      sumator.add({
        name: 'name'
      });
      assert.equal(sumator.toString(), 'string, 5, [object Object]');
    });
  });

  describe('sumNums()', function () {
    it('should return 0 with empty data', function () {
      assert.equal(sumator.sumNums(), 0);
    });

    it('should return 11.86 with valid data', function () {
      sumator.add(10);
      sumator.add('string');
      sumator.add(5);
      sumator.add({
        name: 'name'
      });
      sumator.add(-3.14);
      assert.equal(sumator.sumNums(), 11.86);
    });
  });

  describe('removeByFilter()', function () {
    it('should do nothing with empty data', function () {
      sumator.removeByFilter(item => item % 2 === 0);
      assert.equal(sumator.toString(), '(empty)');
    });

    it('should remove even numbers with valid data', function () {
      sumator.add(10);
      sumator.add('string');
      sumator.add(5);
      sumator.add({
        name: 'name'
      });
      sumator.add(-8);
      sumator.removeByFilter(item => item % 2 === 0);
      assert.equal(sumator.toString(), 'string, 5, [object Object]');
    });
  });
});
