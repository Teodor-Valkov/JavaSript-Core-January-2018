function solve (face, suit) {
  class Card {
    constructor (face, suit) {
      this.face = face;
      this.suit = suit;
    }

    get face () {
      return this._face;
    }
    set face (newFace) {
      const validFaces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

      if (!validFaces.includes(newFace)) {
        throw new Error('Invalid card suit: ' + newFace);
      }

      this._face = newFace;
    }

    get suit () {
      return this._suit;
    }
    set suit (newSuit) {
      const validSuits = ['C', 'D', 'H', 'S'];

      if (!validSuits.includes(newSuit)) {
        throw new Error('Invalid card suit: ' + newSuit);
      }

      this._suit = newSuit;
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

  let card = new Card(face, suit);
  return card.toString();
}

console.log(solve('A', 'S'));
console.log(solve('J', 'D'));
console.log(solve('1', 'S'));
