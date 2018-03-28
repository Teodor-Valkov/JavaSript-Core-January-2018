function solve (cards) {
  class Card {
    constructor (face, suit) {
      this.face = face;
      this.suit = suit;
    }

    get face () {
      return this._face;
    }
    set face (value) {
      const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      if (!validFaces.includes(value)) {
        throw new Error('Invalid card face: ' + value);
      }

      this._face = value;
    }

    get suit () {
      return this._suit;
    }
    set suit (value) {
      const validSuits = ['C', 'D', 'H', 'S'];
      if (!validSuits.includes(value)) {
        throw new Error('Invalid card suit: ' + value);
      }

      this._suit = value;
    }

    toString () {
      let suitToChar = {
        'C': '\u2663',
        'D': '\u2666',
        'H': '\u2665',
        'S': '\u2660'
      };

      return this.face + suitToChar[this.suit];
    }
  }

  let deck = [];

  for (let line of cards) {
    try {
      let face = line.substring(0, line.length - 1);
      let suit = line[line.length - 1];
      let card = new Card(face, suit);
      deck.push(card);
    } catch (error) {
      console.log('Invalid card: ' + line);
      return;
    }
  }

  console.log(deck.join(' '));
}

solve(['AS', '10D', 'KH', '2C']);
solve(['5S', '3D', 'QD', '1C']);
