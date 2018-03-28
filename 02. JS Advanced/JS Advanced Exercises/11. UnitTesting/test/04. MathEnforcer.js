let mathEnforcer = {
  addFive: function (number) {
    if (typeof (number) !== 'number') {
      return undefined;
    }

    return number + 5;
  },
  subtractTen: function (number) {
    if (typeof (number) !== 'number') {
      return undefined;
    }

    return number - 10;
  },
  sum: function (firstNumber, secondNumber) {
    if (typeof (firstNumber) !== 'number' || typeof (secondNumber) !== 'number') {
      return undefined;
    }

    return firstNumber + secondNumber;
  }
};

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('mathEnforcer', function () {
  describe('addFive', function () {
    it('should return undefined for non-number parameter', function () {
      expect(mathEnforcer.addFive('5')).to.be.equal(undefined);
    });

    it('should return correct result for positive integer parameter', function () {
      expect(mathEnforcer.addFive(10)).to.be.equal(15);
    });

    it('should return correct result for negative integer parameter', function () {
      expect(mathEnforcer.addFive(-10)).to.be.equal(-5);
    });

    it('should return correct result for floating point parameter', function () {
      expect(mathEnforcer.addFive(3.14)).to.be.closeTo(8.14, 0.01);
    });
  });

  describe('subtractTen', function () {
    it('should return undefined for non-number parameter', function () {
      assert.isUndefined(mathEnforcer.subtractTen('5'));
    });

    it('should return correct result for positive integer parameter', function () {
      assert.equal(mathEnforcer.subtractTen(15), 5);
    });

    it('should return correct result for negative integer parameter', function () {
      assert.equal(mathEnforcer.subtractTen(-15), -25);
    });

    it('should return correct result for floating point parameter', function () {
      assert.closeTo(mathEnforcer.subtractTen(3.14), -6.86, 0.01);
    });
  });

  describe('sum', function () {
    it('should return undefined for non-number first parameter', function () {
      assert.isUndefined(mathEnforcer.sum('5', 5));
    });

    it('should return undefined for non-number second parameter', function () {
      assert.isUndefined(mathEnforcer.sum(5, '5'));
    });

    it('should return correct result for integer parameters', function () {
      assert.equal(mathEnforcer.sum(5, -3), 2);
    });

    it('should return correct result for floating point parameters', function () {
      assert.closeTo(mathEnforcer.sum(2.7, 3.4), 6.1, 0.01);
    });
  });
});
