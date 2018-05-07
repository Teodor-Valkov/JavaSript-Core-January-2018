// let makeList = require('../02. AddLeftRightClearInList');

function makeList() {
  let data = [];

  return {
    addLeft: function (item) {
      data.unshift(item);
    },
    addRight: function (item) {
      data.push(item);
    },
    clear: function () {
      data = [];
    },
    toString: function () {
      return data.join(', ');
    }
  };
}

let assert = require('chai').assert;

describe('Add, Left, Right, Clear In List Tests', function () {
  let myList = {};
  beforeEach(function () {
    myList = makeList();
  });

  it('should contain all properties', function () {
    assert.exists(myList.addLeft);
    assert.exists(myList.addRight);
    assert.isTrue(myList.hasOwnProperty('clear'));
    assert.isTrue(myList.hasOwnProperty('toString'));
  });

  it('should be empty data', function () {
    assert.equal(myList.toString(), '');
  });

  describe('addLeft()', function () {
    it('should add one item on the left', function () {
      myList.addLeft('string');
      assert.equal(myList.toString(), 'string');
    });

    it('should add several items on the left', function () {
      myList.addLeft('string');
      myList.addLeft(5);
      myList.addLeft({
        name: 'name'
      });
      assert.equal(myList.toString(), '[object Object], 5, string');
    });
  });

  describe('addRight()', function () {
    it('should add one item on the right', function () {
      myList.addRight('string');
      assert.equal(myList.toString(), 'string');
    });

    it('should add several items on the right', function () {
      myList.addRight('string');
      myList.addRight(5);
      myList.addRight({
        name: 'name'
      });
      assert.equal(myList.toString(), 'string, 5, [object Object]');
    });
  });

  describe('addLeft() and addRight()', function () {
    it('should add several items on the left and on the right', function () {
      myList.addRight('right');
      myList.addLeft('left');
      myList.addRight(5);
      myList.addLeft(10);
      myList.addRight({
        name: 'right'
      });
      myList.addLeft({
        name: 'left'
      });
      assert.equal(myList.toString(), '[object Object], 10, left, right, 5, [object Object]');
    });
  });

  describe('clear()', function () {
    it('should clear all items', function () {
      myList.addLeft('right');
      myList.addLeft('left');
      myList.addLeft(5);
      myList.addLeft(10);
      myList.addLeft({
        name: 'right'
      });
      myList.addLeft({
        name: 'left'
      });
      myList.clear();
      assert.equal(myList.toString(), '');
    });
  });
});
