function solve () {
  class Melon {
    constructor (weight, melonSort) {
      if (new.target === Melon) {
        throw new Error('Abstract class cannot be instantiated directly');
      }

      this.weight = Number(weight);
      this.melonSort = melonSort;
      this.element = '';
      this._elementIndex = weight * melonSort.length;
    }

    get elementIndex () {
      return this._elementIndex;
    }

    toString () {
      let result = '';

      result += `Element: ${this.element}\n`;
      result += `Sort: ${this.melonSort}\n`;
      result += `Element Index: ${this.elementIndex}`;

      return result;
    }
  }

  class Watermelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Water';
    }
  }

  class Firemelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Fire';
    }
  }

  class Earthmelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Earth';
    }
  }

  class Airmelon extends Melon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Air';
    }
  }

  class Melolemonmelon extends Watermelon {
    constructor (weight, melonSort) {
      super(weight, melonSort);
      this.element = 'Water';
      this.elements = ['Fire', 'Earth', 'Air', 'Water'];
      this.index = 0;
    }

    morph () {
      this.element = this.elements[this.index++ % this.elements.length];
    }
  }

  return { Melon, Watermelon, Firemelon, Earthmelon, Airmelon, Melolemonmelon };
}

let result = solve();

// let error = new result.Melon(100, 'Test');

let watermelon = new result.Watermelon(10, 'Test');
console.log(watermelon.toString());

let lemonmelon = new result.Melolemonmelon(15, 'Test');
lemonmelon.morph();
lemonmelon.morph();
lemonmelon.morph();
console.log(lemonmelon.toString());
