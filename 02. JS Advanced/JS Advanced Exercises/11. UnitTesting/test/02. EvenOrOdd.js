function isOddOrEven (string) {
  if (typeof (string) !== 'string') {
    return undefined;
  }
  if (string.length % 2 === 0) {
    return 'even';
  }

  return 'odd';
}

let expect = require('chai').expect;
let assert = require('chai').assert;

describe('isOddOrEven', function () {
  it('with a number parameter, should return undefined', function () {
    expect(isOddOrEven(13)).to.equal(undefined);
  });

  it('with an object parameter, should return undefined', function () {
    expect(isOddOrEven({name: 'pesho'})).to.equal(undefined);
  });

  it('with an even length string, should return "even"', function () {
    assert.equal(isOddOrEven('roar'), 'even');
  });

  it('with an odd length string, should return "odd"', function () {
    expect(isOddOrEven('pesho')).to.equal('odd');
  });

  it('with multiple consecutive checks, should return correct values', function () {
    expect(isOddOrEven('cat')).to.equal('odd');
    expect(isOddOrEven('alabala')).to.equal('odd');
    expect(isOddOrEven('is it even')).to.equal('even');
  });
});
