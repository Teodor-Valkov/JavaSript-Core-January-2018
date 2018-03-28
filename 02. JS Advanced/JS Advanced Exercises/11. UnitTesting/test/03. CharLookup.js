function lookupChar (word, index) {
  if (typeof (word) !== 'string' || !Number.isInteger(index)) {
    return undefined;
  }

  if (index < 0 || word.length <= index) {
    return 'Incorrect index';
  }

  return word.charAt(index);
}

let expect = require('chai').expect;

describe('lookupChar', function () {
  it('with a non-string first parameter, should return undefined', function () {
    expect(lookupChar(13, 0)).to.equal(undefined);
  });

  it('with a non-string second parameter, should return undefined', function () {
    expect(lookupChar('pesho', 'gosho')).to.equal(undefined);
  });

  it('with a floating point number second parameter, should return undefined', function () {
    expect(lookupChar('pesho', 3.12)).to.equal(undefined);
  });

  it('with an incorrect index value, should return incorrect index', function () {
    expect(lookupChar('gosho', 13)).to.equal('Incorrect index');
  });

  it('with a negative index value, should return incorrect index', function () {
    expect(lookupChar('stamat', -1)).to.equal('Incorrect index');
  });

  it('with an index value equal to string length, should return incorrect index', function () {
    expect(lookupChar('pesho', 5)).to.equal('Incorrect index');
  });

  it('with correct parameters, should return correct value', function () {
    expect(lookupChar('pesho', 0)).to.equal('p');
  });

  it('with correct parameters should return correct value', function () {
    expect(lookupChar('stamat', 3)).to.equal('m');
  });
});
