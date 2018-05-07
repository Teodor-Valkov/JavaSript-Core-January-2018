// let createList = require('../02. AddSwapShiftInList');

function createList () {
  let data = [];
  return {
    add: function (item) {
      data.push(item);
    },
    shiftLeft: function () {
      if (data.length > 1) {
        let first = data.shift();
        data.push(first);
      }
    },
    shiftRight: function () {
      if (data.length > 1) {
        let last = data.pop();
        data.unshift(last);
      }
    },
    swap: function (index1, index2) {
      if (!Number.isInteger(index1) || index1 < 0 || index1 >= data.length || !Number.isInteger(index2) || index2 < 0 || index2 >= data.length || index1 === index2) {
        return false;
      }
      let temp = data[index1];
      data[index1] = data[index2];
      data[index2] = temp;
      return true;
    },
    toString: function () {
      return data.join(', ');
    }
  };
}

let assert = require('chai').assert;

describe('Add, Swap, Shift In List Tests', function () {
  let data;
  beforeEach('Initialize data', function () {
    data = createList();
  });

  it('should be an empty data', function () {
    assert.equal(data.toString(), '');
  });

  it('should have all functions', function () {
    assert.isTrue(data.hasOwnProperty('add'));
    assert.isTrue(data.hasOwnProperty('shiftLeft'));
    assert.isTrue(data.hasOwnProperty('shiftRight'));
    assert.isTrue(data.hasOwnProperty('swap'));
    assert.isTrue(data.hasOwnProperty('toString'));
  });

  describe('add()', function () {
    it('should work correctly', function () {
      data.add('string');
      data.add(1);
      data.add({name: 'name'});
      assert.equal(data.toString(), 'string, 1, [object Object]');
    });
  });

  describe('shiftLeft()', function () {
    it('should do nothing with data equal to 1', function () {
      data.add(1);
      data.shiftLeft();
      assert.equal(data.toString(), '1');
    });

    it('should work correctly with data more than 1', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      data.shiftLeft();
      assert.equal(data.toString(), '2, 3, 1');
    });
  });

  describe('shiftRight()', function () {
    it('should do nothing with data equal to 1', function () {
      data.add(1);
      data.shiftRight();
      assert.equal(data.toString(), '1');
    });

    it('should work correctly with data more than 1', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      data.shiftRight();
      assert.equal(data.toString(), '3, 1, 2');
    });
  });

  describe('swap()', function () {
    it('should return false for index1 equal to string', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap('string', 2));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index1 equal to floating point number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(3.14, 2));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index1 equal to negative number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(-1, 2));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index1 equal to data length number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(3, 2));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index2 equal to string', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(1, 'string'));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index2 equal to floating point number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(1, 3.14));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index2 equal to negative number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(1, -1));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index2 equal to data length number', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(2, 3));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should return false for index1 equal to index2', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isFalse(data.swap(1, 1));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should work correctly with swapping back and forward', function () {
      data.add(1);
      data.add(2);
      data.add(3);
      assert.isTrue(data.swap(0, 2));
      assert.isTrue(data.swap(2, 0));
      assert.equal(data.toString(), '1, 2, 3');
    });

    it('should work correctly with swaping back and forward mix', function () {
      data.add(1);
      data.add(2);
      data.swap(0, 1);
      data.add(3);
      data.add(4);
      data.shiftLeft();
      data.swap(2, 3);
      data.swap(1, 0);
      data.shiftRight();
      data.shiftRight();
      assert.equal(data.toString(), '2, 4, 3, 1');
    });
  });
});
