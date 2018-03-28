function parseData (recipes) {
  class Candy {
    constructor (topping, filling, spice) {
      this.topping = topping;
      this.filling = filling;
      this.spice = spice;
    }

    get topping () {
      return this._topping;
    }
    set topping (value) {
      let validToppings = ['milk chocolate', 'white chocolate', 'dark chocolate'];

      if (!validToppings.includes(value)) {
        throw new TypeError('Invalid topping.');
      }

      this._topping = value;
    }

    get filling () {
      return this._filling;
    }
    set filling (value) {
      if (value === null) {
        this._filling = value;
      } else {
        let validFillings = ['hazelnut', 'caramel', 'strawberry', 'blueberry', 'yogurt', 'fudge'];
        let tokens = value.split(',');

        if (tokens.length > 3 || tokens.some(token => !validFillings.includes(token))) {
          throw new TypeError('Invalid filling');
        }
      }

      this._filling = value;
    }

    get spice () {
      return this._spice;
    }
    set spice (value) {
      let invalidSpices = ['poison', 'asbestos'];

      if (invalidSpices.includes(value)) {
        throw new TypeError('Invalid spice');
      }

      this._spice = value;
    }
  }

  let candys = [];

  for (let recipe of recipes) {
    try {
      let tokens = recipe.split(':');

      if (tokens.length !== 3) {
        throw new Error('Invalid input.');
      }

      for (let i = 0; i < tokens.length; i++) {
        if (tokens[i] === '') {
          tokens[i] = null;
        }
      }

      let candy = new Candy(tokens[0], tokens[1], tokens[2]);
      candys.push(candy);
    } catch (error) {
    }
  }

  return candys;
}
