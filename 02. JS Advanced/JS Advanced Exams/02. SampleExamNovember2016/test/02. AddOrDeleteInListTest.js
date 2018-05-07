// let list = require('../02. AddOrDeleteInList').list;

let list = function () {
  let data = [];
  return {
    add: function (item) {
      data.push(item);
    },
    delete: function (index) {
      if (Number.isInteger(index) && index >= 0 && index < data.length) {
        return data.splice(index, 1)[0];
      } else {
        return undefined;
      }
    },
    toString: function () {
      return data.join(', ');
    }
  };
};

let assert = require('chai').assert;

describe('AddOrDeleteInList', function () {
  // let myList;
  // beforeEach(function () {
  //   myList = (function () {
  //     let data = [];
  //     return {
  //       add: function (item) {
  //         data.push(item);
  //       },
  //       delete: function (index) {
  //         if (Number.isInteger(index) && index >= 0 && index < data.length) {
  //           return data.splice(index, 1)[0];
  //         } else {
  //           return undefined;
  //         }
  //       },
  //       toString: function () {
  //         return data.join(', ');
  //       }
  //     };
  //   })();
  // });

  let myList;
  beforeEach(function () {
    myList = (function () {
      return list;
    })();
  });

  it('Should return empty list', function () {
    assert.equal(myList.toString(), '');
  });

  describe('add() with valid data should return valid results', function () {
    it('Should add 1 and return 1', function () {
      myList.add(1);
      assert.equal(myList.toString(), '1');
    });

    it('Should add 1, 2, 3 and return "1, 2, 3"', function () {
      myList.add(1);
      myList.add(2);
      myList.add(3);
      assert.equal(myList.toString(), '1, 2, 3');
    });
  });

  describe('delete() with invalid data should return "undefined"', function () {
    it('Should return undefined for deleting empty', function () {
      assert.isUndefined(myList.delete());
    });

    it('Should return undefined for deleting string', function () {
      assert.isUndefined(myList.delete('string'));
    });

    it('Should return undefined for deleting floating point number', function () {
      assert.isUndefined(myList.delete(3.14));
    });

    it('Should return undefined for deleting negative number', function () {
      myList.add(1);
      assert.isUndefined(myList.delete(-1));
    });

    it('Should return undefined for deleting larger than list length number', function () {
      myList.add(1);
      assert.isUndefined(myList.delete(1));
    });
  });

  describe('delete() with valid data should return valid results', function () {
    it('Should add 1, 2, 3, delete 2 and return removed item equal to 2', function () {
      myList.add(1);
      myList.add(2);
      myList.add(3);
      assert.equal(myList.delete(1), 2);
    });

    it('Should add 1, 2, 3, delete 2 and return list equal to "1, 3"', function () {
      myList.add(1);
      myList.add(2);
      myList.add(3);
      myList.delete(1);
      assert.equal(myList.toString(), '1, 3');
    });
  });
});
