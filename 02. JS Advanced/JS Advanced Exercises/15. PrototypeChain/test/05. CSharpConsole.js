class Console {
  static get placeholder () {
    return /{\d+}/g;
  }

  static writeLine () {
    let message = arguments[0];

    if (arguments.length === 1) {
      if (typeof (message) === 'object') {
        message = JSON.stringify(message);
        return message;
      } else if (typeof (message) === 'string') {
        return message;
      }
    } else {
      if (typeof (message) !== 'string') {
        throw new TypeError('No string format given!');
      } else {
        let placeholders = message.match(this.placeholder).sort(function (a, b) {
          a = Number(a.substring(1, a.length - 1));
          b = Number(b.substring(1, b.length - 1));
          return a - b;
        });

        if (placeholders.length !== (arguments.length - 1)) {
          throw new RangeError('Incorrect amount of parameters given!');
        } else {
          for (let i = 0; i < placeholders.length; i++) {
            let number = Number(placeholders[i].substring(1, placeholders[i].length - 1));

            if (number !== i) {
              throw new RangeError('Incorrect placeholders given!');
            } else {
              message = message.replace(placeholders[i], arguments[i + 1]);
            }
          }

          return message;
        }
      }
    }
  }
}

let assert = require('chai').assert;

describe('CSharpConsole', function () {
  describe('Passing only one argument', function () {
    it('should return the same string for given single string argument', function () {
      assert.equal(Console.writeLine('string'), 'string');
    });

    it('should return JSON string for given object argument', function () {
      let object = {
        name: 'Name',
        age: 25
      };
      assert.equal(Console.writeLine(object), JSON.stringify(object));
    });
  });

  describe('Pasing arguments which throw errors', function () {
    it('should throw error for no arguments given', function () {
      assert.throws(() => Console.writeLine(), TypeError);
    });

    it('should throw error for first argument not a string', function () {
      assert.throws(() => Console.writeLine(10, 'string'), TypeError);
    });

    it('should throw error if placeholders are less than arguments', function () {
      assert.throws(() => Console.writeLine('{0} {1}', 'zero', 'one', 'two'), RangeError);
    });

    it('should throw error if placeholders are more than arguments', function () {
      assert.throws(() => Console.writeLine('{0} {1} {2}', 'zero', 'one'), RangeError);
    });

    it('should throw error if placeholder is already changed', function () {
      assert.throws(() => Console.writeLine('{0} {0}', 'zero', 'one'), RangeError);
    });

    it('should throw error if placehoder are not in valid order', function () {
      assert.throws(() => Console.writeLine('Not valid {10}', 'ten'), RangeError);
    });
  });

  describe('Passing valid arguments', function () {
    it('should successfully replace placeholders with valid arguments', function () {
      assert.equal(Console.writeLine('{0} {1}', 'zero', 'one'), 'zero one');
    });
  });
});
