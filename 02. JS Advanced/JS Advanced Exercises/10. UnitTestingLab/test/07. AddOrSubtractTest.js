let createCalculator = require('../07. AddOrSubtract').createCalculator;
let expect = require('chai').expect;
let assert = require('chai').assert;

describe('createCalculator()', function () {
  let calculator;

  beforeEach(function () {
    calculator = createCalculator();
  });

  it('should return 5 for { add 3; add 2 }', function () {
    calculator.add(3);
    calculator.add(2);
    expect(calculator.get()).to.be.equal(5);
  });

  it('should return -5 for { subtract 3; subtract 2 }', function () {
    calculator.subtract(3);
    calculator.subtract(2);
    expect(calculator.get()).to.be.equal(-5);
  });

  it('should return 4.4 for { add 5.5; subtract 1.1 }', function () {
    calculator.add(5.5);
    calculator.subtract(1.1);
    expect(calculator.get()).to.be.equal(4.4);
  });

  it('should return 2 for { add 10; subtract "7"; add "-2"; subtract -1 }', function () {
    calculator.add(10);
    calculator.subtract('7');
    calculator.add('-2');
    calculator.subtract(-1);
    expect(calculator.get()).to.be.equal(2);
  });

  it('should return NaN for { add "hello" }', function () {
    calculator.add('hello');
    assert.isNaN(calculator.get());
  });

  it('should return NaN for { subtract "hello" }', function () {
    calculator.subtract('hello');
    assert.isNaN(calculator.get());
  });
});
