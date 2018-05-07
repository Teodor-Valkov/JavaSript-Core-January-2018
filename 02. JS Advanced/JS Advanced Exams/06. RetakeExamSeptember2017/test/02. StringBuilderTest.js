// let StringBuilder = require('../02. StringBuilder');

class StringBuilder {
  constructor(string) {
    if (string !== undefined) {
      StringBuilder._vrfyParam(string);
      this._stringArray = Array.from(string);
    } else {
      this._stringArray = [];
    }
  }

  append(string) {
    StringBuilder._vrfyParam(string);
    for (let i = 0; i < string.length; i++) {
      this._stringArray.push(string[i]);
    }
  }

  prepend(string) {
    StringBuilder._vrfyParam(string);
    for (let i = string.length - 1; i >= 0; i--) {
      this._stringArray.unshift(string[i]);
    }
  }

  insertAt(string, startIndex) {
    StringBuilder._vrfyParam(string);
    this._stringArray.splice(startIndex, 0, ...string);
  }

  remove(startIndex, length) {
    this._stringArray.splice(startIndex, length);
  }

  static _vrfyParam(param) {
    if (typeof param !== 'string') {
      throw new TypeError('Argument must be string');
    }
  }

  toString() {
    return this._stringArray.join('');
  }
}

let assert = require('chai').assert;

describe('String Builder Tests', function () {
  describe('constructor', function () {
    let stringBuilder;
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder();
    });

    it('should contain all properties', function () {
      assert.isTrue(stringBuilder.hasOwnProperty('_stringArray'));
    });

    it('should contain all functions', function () {
      assert.equal(StringBuilder.prototype.hasOwnProperty('constructor'), true);
      assert.equal(typeof stringBuilder.constructor, 'function');

      assert.equal(StringBuilder.prototype.hasOwnProperty('append'), true);
      assert.equal(typeof stringBuilder.append, 'function');

      assert.equal(StringBuilder.prototype.hasOwnProperty('prepend'), true);
      assert.equal(typeof stringBuilder.prepend, 'function');

      assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('insertAt'), true);
      assert.equal(typeof stringBuilder.insertAt, 'function');

      assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('remove'), true);
      assert.equal(typeof stringBuilder.remove, 'function');

      assert.equal(Object.getPrototypeOf(stringBuilder).hasOwnProperty('toString'), true);
      assert.equal(typeof stringBuilder.toString, 'function');

      assert.isTrue(StringBuilder.hasOwnProperty('_vrfyParam'));
      assert.equal(typeof StringBuilder._vrfyParam, 'function');
    });

    it('should take 1 parameters', function () {
      assert.equal(StringBuilder.length, 1);
    });

    it('instance should be of the same class', function () {
      assert.isTrue(stringBuilder instanceof StringBuilder);
    });

    it('should be empty string', function () {
      assert.isTrue(stringBuilder._stringArray instanceof Array);
      assert.equal(stringBuilder.toString(), '');
    });

    it('should not be empty string', function () {
      stringBuilder = new StringBuilder('string');
      assert.isTrue(stringBuilder._stringArray instanceof Array);
      assert.equal(stringBuilder.toString(), 'string');
    });

    it('should throw error with parameter not string', function () {
      assert.throws(() => new StringBuilder(10), TypeError, 'Argument must be string');
      assert.throws(() => new StringBuilder({
        name: 'name'
      }), TypeError, 'Argument must be string');
    });
  });

  describe('append(string)', function () {
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder('hello');
    });

    it('should append one string', function () {
      stringBuilder.append(', hi');
      assert.equal(stringBuilder.toString(), 'hello, hi');
    });

    it('should append several strings', function () {
      stringBuilder.append(', hi');
      stringBuilder.append(', hola');
      assert.equal(stringBuilder.toString(), 'hello, hi, hola');
    });
  });

  describe('prepend(string)', function () {
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder('hello');
    });

    it('should prepend one string', function () {
      stringBuilder.prepend('hi, ');
      assert.equal(stringBuilder.toString(), 'hi, hello');
    });

    it('should prepend several strings', function () {
      stringBuilder.prepend('hi, ');
      stringBuilder.prepend('hola, ');
      assert.equal(stringBuilder.toString(), 'hola, hi, hello');
    });
  });

  describe('insertAt(string, startIndex)', function () {
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder('hello, hello');
    });

    it('should insert one string', function () {
      stringBuilder.insertAt('hi, ', 7);
      assert.equal(stringBuilder.toString(), 'hello, hi, hello');
    });

    it('should insert several strings', function () {
      stringBuilder.insertAt('hi, ', 7);
      stringBuilder.insertAt('hola, ', 11);
      assert.equal(stringBuilder.toString(), 'hello, hi, hola, hello');
    });
  });

  describe('remove(startIndex, length)', function () {
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder('hello, hello');
    });

    it('should remove one string', function () {
      stringBuilder.remove(5, 7);
      assert.equal(stringBuilder.toString(), 'hello');
    });

    it('should remove several strings', function () {
      stringBuilder.remove(1, 6);
      stringBuilder.remove(2, 4);
      assert.equal(stringBuilder.toString(), 'hh');
    });
  });

  describe('_vrfyParam(param)', function () {
    it('should throw error', function () {
      assert.throws(() => StringBuilder._vrfyParam(), TypeError, 'Argument must be string');
      assert.throws(() => StringBuilder._vrfyParam(1), TypeError, 'Argument must be string');
      assert.throws(() => StringBuilder._vrfyParam({
        name: 'name'
      }), TypeError, 'Argument must be string');
    });

    it('should does not throw error', function () {
      assert.doesNotThrow(() => StringBuilder._vrfyParam('string'), TypeError);
    });
  });

  describe('toString()', function () {
    beforeEach('initialize class', function () {
      stringBuilder = new StringBuilder();
    });

    it('should be empty', function () {
      assert.equal(stringBuilder.toString(), '');
    });

    it('should not be empty', function () {
      stringBuilder = new StringBuilder('hello');
      assert.equal(stringBuilder.toString(), 'hello');
    });
  });
});