// let SortedList = require('../02. SortedList').SortedList;

class SortedList {
  constructor () {
    this.list = [];
  }

  add (element) {
    this.list.push(element);
    this.sort();
  }

  remove (index) {
    this.vrfyRange(index);
    this.list.splice(index, 1);
  }

  get (index) {
    this.vrfyRange(index);
    return this.list[index];
  }

  vrfyRange (index) {
    if (this.list.length === 0) {
      throw new Error('Collection is empty.');
    }

    if (index < 0 || index >= this.list.length) {
      throw new Error('Index was outside the bounds of the collection.');
    }
  }

  sort () {
    this.list.sort((a, b) => a - b);
  }

  get size () {
    return this.list.length;
  }
}

let assert = require('chai').assert;

describe('SortedList', function () {
  let list;
  beforeEach('Initialize list', function () {
    list = new SortedList();
  });

  describe('Initialize new list', function () {
    it('should contain all properties', function () {
      assert.isTrue(list.hasOwnProperty('list'));
    });

    it('should have all functions', function () {
      assert.equal(SortedList.prototype.hasOwnProperty('add'), true);
      assert.equal(typeof list.add, 'function');

      assert.equal(SortedList.prototype.hasOwnProperty('remove'), true);
      assert.equal(typeof list.remove, 'function');

      assert.equal(SortedList.prototype.hasOwnProperty('get'), true);
      assert.equal(typeof list.get, 'function');

      assert.equal(SortedList.prototype.hasOwnProperty('vrfyRange'), true);
      assert.equal(typeof list.vrfyRange, 'function');

      assert.equal(SortedList.prototype.hasOwnProperty('sort'), true);
      assert.equal(typeof list.sort, 'function');
    });

    it('should have all getters', function () {
      assert.equal(SortedList.prototype.hasOwnProperty('size'), true);
      assert.notEqual(typeof list.size, 'function');
    });

    it('should be an empty list', function () {
      assert.isTrue(list.list instanceof Array);
      assert.equal(list.size, 0);
    });
  });

  describe('Add(index) with valid data should work correctly', function () {
    it('should return 1 for add(1)', function () {
      list.add(1);
      assert.equal(list.size, 1);
    });

    it('should return 3 for add(10), add(5), add(1)', function () {
      list.add(10);
      list.add(5);
      list.add(1);
      assert.equal(list.size, 3);
    });
  });

  describe('remove(index) with valid data should work correctly', function () {
    it('should remove the number on given index', function () {
      list.add(1);
      list.add(2);
      list.add(3);
      list.remove(1);
      assert.equal(list.size, 2);
    });
  });

  describe('get(index) with valid data should work correctly', function () {
    it('should return the number on given index', function () {
      list.add(1);
      list.add(2);
      list.add(3);
      assert.equal(list.get(1), 2);
    });
  });

  describe('vrfyRange(index) with invalid data should return Error', function () {
    it('should return Error for an empty list', function () {
      assert.throws(() => list.vrfyRange(1), Error, 'Collection is empty.');
    });

    it('should return Error for negative index', function () {
      list.add(1);
      assert.throws(() => list.vrfyRange(-1), Error, 'Index was outside the bounds of the collection.');
    });

    it('should return Error for larger than list length index', function () {
      list.add(1);
      assert.throws(() => list.vrfyRange(1), Error, 'Index was outside the bounds of the collection.');
    });

    it('should return nothing for valid index', function () {
      list.add(1);
      assert.doesNotThrow(() => list.vrfyRange(0), Error);
    });
  });

  describe('sort() with valid data should work correctly', function () {
    it('should return 1, 5, 10', function () {
      list.add(10);
      list.add(5);
      list.add(1);
      assert.equal(list.get(0), 1);
      assert.equal(list.get(1), 5);
      assert.equal(list.get(2), 10);
    });
  });

  describe('size() with valid data should work correctly', function () {
    it('should return 3', function () {
      list.add(1);
      list.add(2);
      list.add(3);
      assert.equal(list.size, 3);
    });
  });
});
