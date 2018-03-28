(function solve () {
  String.prototype.ensureStart = function (str) {
    if (this.toString().startsWith(str)) {
      return this.toString();
    }

    return str + this.toString();
  };

  String.prototype.ensureEnd = function (str) {
    if (this.toString().endsWith(str)) {
      return this.toString();
    }

    return this.toString() + str;
  };

  String.prototype.isEmpty = function () {
    return this.toString().localeCompare('') === 0;
  };

  String.prototype.truncate = function (number) {
    if (number <= 3) {
      return '.'.repeat(number);
    } else if (this.toString().length <= number) {
      return this.toString();
    } else if (this.toString().length > number) {
      let lastIndex = this.toString().substr(0, number - 2).lastIndexOf(' ');

      if (lastIndex !== -1) {
        return this.toString().substr(0, lastIndex) + '...';
      }

      return this.toString().substr(0, number - 3) + '...';
    }
  };

  String.format = function (str, ...params) {
    for (let i = 0; i < params.length; i++) {
      let index = str.indexOf(`{${i}}`);

      while (index !== -1) {
        str = str.replace(`{${i}}`, params[i]);
        index = str.indexOf(`{${i}}`);
      }
    }

    return str;
  };
})();

let str = 'my string';
str = str.ensureStart('my');
str = str.ensureStart('hello ');
console.log(str);
str = str.ensureEnd('string');
str = str.ensureEnd('.nice');
console.log(str);
console.log(str.isEmpty());
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}', 'dog');
console.log(str);
